// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./interface/IERC20.sol";

interface IStrategy {
    function deposit(address token, uint256 amount) external;
    function withdraw(address[] memory tokens, uint256[] memory amounts) external;
}
contract StrategyHub {
    address owner;
    StrategyData[] public strategies;

    mapping(address => uint256[]) public balances;
    struct StrategyData {
        uint32 strategyId;
        address[] tokens;
        address depositToken;
        address strategyContract;
    }

    struct TokenAmount{
        address token;
        uint256 amount;
    }
    event StrategyDeployed(StrategyData strategy);

    event Deposit(address indexed user, address indexed token, uint256 amount, uint32 indexed strategyId, TokenAmount[] delta);
    event Withdraw(address indexed user, address indexed token, uint256 amount, uint32 indexed strategyId);

    constructor(){
        owner = msg.sender;
    }
    modifier onlyOwner(){
        if(msg.sender != owner) revert("Only owner can execute withdrawals");
        _;
    }

    function deployStrategy(bytes memory bytecode, address[] memory tokens, address depositToken) external  {
        address strategyAddr;
        assembly {
            // create(value, offset, size)
            strategyAddr := create(0, add(bytecode, 0x20), 0x13)
        }
        require(strategyAddr != address(0));

        StrategyData memory strategy = StrategyData({
            strategyId: uint32(strategies.length),
            tokens: tokens,
            depositToken: depositToken,
            strategyContract: strategyAddr
        });
        strategies.push(strategy);

        emit StrategyDeployed(strategy);
    }

    function deposit(address user, uint32 strategyId, uint256 amount) external onlyOwner {
        StrategyData memory strategy = strategies[strategyId];

        address strategyContractAddress = strategy.strategyContract;
        address[] memory strategyTokens = strategy.tokens;
        address depositToken = strategy.depositToken;

        uint256 strategyTokensLength = strategyTokens.length;

        uint256[] memory balanceBefore = new uint256[](strategyTokensLength);
        for(uint256 i = 0; i < strategyTokensLength; i++){
            balanceBefore[i] = IERC20(strategyTokens[i]).balanceOf(address(this));
        }

        IERC20(depositToken).transferFrom(msg.sender, address(this), amount);

        (bool success, ) = strategyContractAddress.delegatecall(abi.encodeWithSignature("deposit(address,uint256)", depositToken, amount));
        if(!success) revert("Deposit failed");

       uint256[] memory balanceAfter = new uint256[](strategyTokensLength);
        for(uint256 i = 0; i < strategyTokensLength; i++){
            balanceAfter[i] = IERC20(strategyTokens[i]).balanceOf(address(this));
        }

      
        TokenAmount[] memory delta = new TokenAmount[](strategyTokensLength);
        uint256[] memory userBalance = balances[user];
        for(uint256 i = 0; i < strategyTokensLength; i++){
            uint256 balanceDelta = balanceAfter[i] - balanceBefore[i];
            userBalance[i] += balanceDelta;
            delta[i] = TokenAmount(strategyTokens[i], balanceDelta);
        }
        balances[user] = userBalance;
        emit Deposit(user, depositToken, amount, strategyId, delta);
    }

    function withdraw(address user, uint32 strategyId) external onlyOwner {
        StrategyData memory strategy = strategies[strategyId];

        address depositToken = strategy.depositToken;
        address strategyContractAddress = strategy.strategyContract;

        uint256 balanceBefore = IERC20(depositToken).balanceOf(address(this));

        uint256[] memory userBalance = balances[user];

        (bool success, ) = strategyContractAddress.delegatecall(abi.encodeWithSignature("withdraw(address[],uint256[])", strategy.tokens, userBalance));
        if(!success) revert("Withdrawal failed");

        uint256 balanceAfter = IERC20(depositToken).balanceOf(address(this));

        uint256 delta = balanceAfter - balanceBefore;

        if(delta == 0) revert("No balance to withdraw");

        IERC20(depositToken).transfer(msg.sender, delta);
        emit Withdraw(user, depositToken, delta, strategyId);
    }
}