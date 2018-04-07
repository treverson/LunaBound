pragma solidity ^0.4.21;

library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        // uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return a / b;
    }

  /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

contract StakeSimulator {
    using SafeMath for uint256;
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
        uint256 percentage = 100;
        for (uint i = 0; i < recipients.length; i++)
        {
            uint256 transferAmmount = uint256((recipients[i].balance*scalingFactor).div(percentage));
            recipients[i].transfer(transferAmmount);
        }
    }
}
