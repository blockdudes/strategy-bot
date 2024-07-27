// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./interface/IERC20.sol";
contract MultichainReceiver {
    address owner;
    event DepositRequest(address indexed sender, address indexed token, uint256 amount, uint32 strategyId);
    event WithdrawRequest(address indexed sender, uint32 strategyId);
    event Withdrawal(address indexed sender, address indexed token, uint256 amount, uint32 strategyId);

    struct WithdrawalData {
        address user;
        address token;
        uint256 amount;
        uint32 strategyId;
    }
    constructor(){
        owner = msg.sender;
    }
    modifier onlyOwner(){
        if(msg.sender != owner) revert("Only owner can execute withdrawals");
        _;
    }

    function deposit(address token, uint256 amount, uint32 strategyId) external {
        if(strategyId == 0) revert("Invalid strategyId");
        if(token == address(0)) revert("Invalid token address");
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        emit DepositRequest(msg.sender, token, amount, strategyId);
    }

    function withdraw(uint32 strategyId) external {
        if(strategyId == 0) revert("Invalid strategyId");
        emit WithdrawRequest(msg.sender, strategyId);
    }
   
    function executeWithdrawals(WithdrawalData[] memory withdrawals) external onlyOwner {
        for(uint256 i = 0; i < withdrawals.length; i++){
            WithdrawalData memory withdrawal = withdrawals[i]; 
            IERC20(withdrawal.token).transfer(withdrawal.user, withdrawal.amount);
            emit Withdrawal(withdrawal.user, withdrawal.token, withdrawal.amount, withdrawal.strategyId);
        }
    }
}
