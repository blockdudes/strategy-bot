// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./interface/IERC20.sol";
contract Strategy {
    address owner;
    StrategyData[] public strategies;

    
    struct StrategyData {
        uint32 strategyId;
        address[] tokens;
        address depositToken;
    }

    struct TokenAmount{
        address token;
        uint256 amount;
    }

    struct ExecutionStep {
        address executionContract;
        bytes  data;
        uint256 value;
    }

    event Deposit(address indexed user, address indexed token, uint256 amount, uint32 indexed strategyId, TokenAmount[] delta);
    event Withdraw(address indexed user, address indexed token, uint256 amount, uint32 indexed strategyId);

    constructor(){
        owner = msg.sender;
    }
    modifier onlyOwner(){
        if(msg.sender != owner) revert("Only owner can execute withdrawals");
        _;
    }
    function deposit(address user, uint32 strategyId, ExecutionStep[] memory steps, uint256 amount) external onlyOwner {
        StrategyData memory strategy = strategies[strategyId];
        address[] memory strategyTokens = strategy.tokens;
        address depositToken = strategy.depositToken;

        uint256[] memory balanceBefore = new uint256[](strategyTokens.length);
        for(uint256 i = 0; i < strategyTokens.length; i++){
            balanceBefore[i] = IERC20(strategyTokens[i]).balanceOf(address(this));
        }

        IERC20(depositToken).transferFrom(msg.sender, address(this), amount);
       for(uint256 i = 0; i < steps.length; i++){
        ExecutionStep memory step = steps[i];
        (bool success, ) = step.executionContract.call{value: step.value}(step.data);
        if(!success) revert("Execution failed");
       }

       uint256[] memory balanceAfter = new uint256[](strategyTokens.length);
        for(uint256 i = 0; i < strategyTokens.length; i++){
            balanceAfter[i] = IERC20(strategyTokens[i]).balanceOf(address(this));
        }

      
        TokenAmount[] memory delta = new TokenAmount[](strategyTokens.length);
        for(uint256 i = 0; i < strategyTokens.length; i++){
            delta[i] = TokenAmount(strategyTokens[i], balanceAfter[i] - balanceBefore[i]);
        }
        emit Deposit(user, depositToken, amount, strategyId, delta);
    }

    function withdraw(address user, uint32 strategyId, ExecutionStep[] memory steps) external onlyOwner {
        StrategyData memory strategy = strategies[strategyId];
        address depositToken = strategy.depositToken;
        uint256 balanceBefore = IERC20(depositToken).balanceOf(address(this));
        // it will swap back the assets
        for(uint256 i = 0; i < steps.length; i++){
            ExecutionStep memory step = steps[i];
            (bool success, ) = step.executionContract.call{value: step.value}(step.data);
            if(!success) revert("Execution failed");
       }
        uint256 balanceAfter = IERC20(depositToken).balanceOf(address(this));
        uint256 delta = balanceAfter - balanceBefore;
        if(delta == 0) revert("No balance to withdraw");
        IERC20(depositToken).transfer(msg.sender, delta);
        emit Withdraw(user, depositToken, delta, strategyId);
    }
}
