// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


import "./BaseModuleContract.sol";
import "../interface/IEarnerCore.sol";
import "../interface/IWCore.sol";
import "../interface/IERC20.sol";

contract CoreStaker is BaseModuleContract {
    address public owner;

    constructor() BaseModuleContract() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert("Only owner");
        }
        _;
    }

    function changeOwner(address _newOwner) external onlyOwner {
        owner = _newOwner;
    }
    function stake(uint256 amount) external onlyDelegateCall returns (uint256) {
        // 0xd82c24274ebbfe438788d684dc6034c3c67664a4
        address validator = 0xd82c24274EBbfe438788D684dC6034c3C67664A4;
        // 0xc2b71e7572476a0db1939fadd7553dfe6b96374
        IEarnerCore coreStaker = IEarnerCore(
            0xC2b71E7572476A0Db1939FAdd755d3dFE6b96374
        );
        // 0x48c55da8e7d2107ccd8386233090b21f42a58beb
        IERC20 stCore = IERC20(0x48C55da8E7D2107CcD8386233090b21f42A58bEB);
        //0xba5e6cc16c4502d19bd01b8e0f99223c4c741cd8
        IWCore wCore = IWCore(0xba5e6Cc16c4502D19bD01B8E0F99223C4C741cd8);
        uint256 coreBalanceBefore = address(this).balance;
        wCore.withdraw(amount);
        uint256 coreBalanceAfter = address(this).balance;
        uint256 coreAmount = coreBalanceAfter - coreBalanceBefore;

        uint256 stCoreBalanceBefore = stCore.balanceOf(address(this));
        coreStaker.mint{value: coreAmount}(validator);
        uint256 stCoreBalanceAfter = stCore.balanceOf(address(this));
        uint256 stCoreAmount = stCoreBalanceAfter - stCoreBalanceBefore;
        return stCoreAmount;
    }
}