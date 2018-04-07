pragma solidity ^0.4.21;
contract StakeSimulator
{
    uint256 public scalingFactor = 10;
    address[] public recipients;
    
    function StakeSimulator() public payable{}
    
    function isStaking(address _address) public view returns(bool)
    {
        for(uint i = 0; i < recipients.length; i++)
        {
            if (recipients[i]==_address)
            {
                return true;
            }
        }
        return false;
    }
    
    function addRecipient(address _address) public
    {
        recipients.push(_address);
    }
    
    function removeRecipient(address _address) public
    {
        for(uint i = 0;i < recipients.length; i++)
        {
            if (recipients[i]==_address)
            {
                delete recipients[i];
                break;
            }
        }
    }
    
    function setScalingFactor(uint256 _factor) public
    {
        scalingFactor = _factor;
    }

    function deposit () payable external {}
    
    
    function drop() public payable
    {
        for (uint i = 0; i < recipients.length; i++)
        {
            uint256 transferAmmount = uint256((recipients[i].balance*scalingFactor)/1000);
            recipients[i].transfer(transferAmmount);
        }
    }
}
