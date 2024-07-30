pragma solidity ^0.8.13;
import "./IERC20.sol";

interface IWCore is IERC20 {
    function deposit() external payable;
    function withdraw(uint256) external;
}