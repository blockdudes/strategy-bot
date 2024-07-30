// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "../interface/IRouter.sol";
import "../interface/IERC20.sol";
import "./BaseModuleContract.sol";

contract Swapper is BaseModuleContract {
    // router - 0x87f40ffec16f18053b494a1c417fb1d1ce180bc3
    address public owner;
    address public OUR_CONTRACT_ADDRESS;

    constructor() BaseModuleContract() {
        owner = msg.sender;
    }
    struct OutputToken {
        address token;
        uint256 percentage;
    }
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert("Only owner");
        }
        _;
    }
    function swap(
        address inputToken,
        uint256 inputAmount,
        OutputToken[] memory outputTokens
    ) external onlyDelegateCall returns (uint256[] memory outputAmounts) {
        address routerAddress = 0x87f40ffec16F18053B494a1C417Fb1d1ce180BC3;
        IERC20 inputTokenContract = IERC20(inputToken);
        IRouter router = IRouter(routerAddress);

        inputTokenContract.approve(address(router), inputAmount);
        for (uint256 i = 0; i < outputTokens.length; i++) {
            OutputToken memory outputToken = outputTokens[i];
            uint256 amount = (inputAmount * outputToken.percentage) / 100;
            if (outputToken.token == address(0)) {
                revert("Address not supported");
                //     uint256 nativeBalanceBefore = address(this).balance;
                //     router.swapExactTokensForETH(amount, 0, [inputToken, address(wCore)], address(this), block.timestamp);
                //     uint256 nativeBalanceAfter = address(this).balance;
                //     uint256 receivedNative = nativeBalanceAfter - nativeBalanceBefore;
                //     wCore.deposit{value: receivedNative}();
            }
            address[] memory path = new address[](2);
            path[0] = inputToken;
            path[1] = outputToken.token;
            uint256[] memory amounts = router.swapExactTokensForTokens(
                amount,
                0,
                path,
                address(this),
                block.timestamp
            );
            outputAmounts[i] = amounts[1];
        }
    }
}