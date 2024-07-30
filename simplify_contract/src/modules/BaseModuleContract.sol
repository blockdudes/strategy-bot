abstract contract BaseModuleContract {
    address public OUR_CONTRACT_ADDERSS;
    constructor(){
        OUR_CONTRACT_ADDERSS = address(this);
    }
    modifier onlyDelegateCall(){
        if(address(this) == OUR_CONTRACT_ADDERSS){
            revert("Only delegate call allowed");
        }
        _;
    }
}