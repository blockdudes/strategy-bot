pragma solidity ^0.8.13;

interface IEarnerCore {
    function mint(address _validator) external payable;
    function redeem(uint256 stCore) external;
    function withdraw() external;
}