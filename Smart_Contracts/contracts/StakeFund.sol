pragma solidity ^0.4.21;

contract StakeFund {
    address[] public ownerAddresses;
    uint16 public threshold;
    mapping(address => replacementAddress) public proposedNewAddress;
    mapping(address => newWithdraw) public proposedNewWithdraw;
    
    struct replacementAddress {
        address oldAddress;
        address newAddress;
    }
    
    struct newWithdraw {
        uint amount;
        address recipient;
    }

    event NewAddressProposed(address _oldAddress, address _newAddress, address _proposer);
    event OwnerChanged(address _oldAddress, address _newAddress, address _sender);
    event WithdrawalProposed(uint _amount, address _receipient, address _proposer);
    event Transfer(uint _amount, address _receipient, address _sender);
    event NewContribution(address _contributor, uint _amount, address _pensionContract);
    event FundDeleted(address _deleter, address _stakeFund, uint _blockNumber);

    modifier isOwner() {
        bool ownerFound = false;
        for (uint i = 0; i < ownerAddresses.length; i ++) {
            if (msg.sender == ownerAddresses[i]) {
                ownerFound = true;
            }
        }
        require(ownerFound);
        _;
    }
    
    function StakeFund(address[] _ownerAddresses, uint16 _threshold) payable public {
        ownerAddresses = _ownerAddresses;
        threshold = _threshold;
    }
    
    function proposeNewAddress(address _oldAddress, address _newAddress) external isOwner {
        proposedNewAddress[msg.sender].oldAddress = _oldAddress;
        proposedNewAddress[msg.sender].newAddress = _newAddress;
        emit NewAddressProposed(_oldAddress, _newAddress, msg.sender);
    }
    
    function changeOwnerAddress() external isOwner {
        for(uint i = 0; i < ownerAddresses.length - 1; i++) {
            uint foundCount = 0;
            
            for(uint j = i; j < ownerAddresses.length; j++) {
                if(proposedNewAddress[ownerAddresses[i]].oldAddress == proposedNewAddress[ownerAddresses[j]].oldAddress &&
                proposedNewAddress[ownerAddresses[i]].newAddress == proposedNewAddress[ownerAddresses[j]].newAddress) {
                    foundCount++;
                    if(foundCount >= threshold) {
                        // if past the threshold, we change one of the owners to a new address
                        for (uint k = 0 ; k < ownerAddresses.length; k ++) {
                            if(ownerAddresses[k] == proposedNewAddress[ownerAddresses[i]].oldAddress) {
                                ownerAddresses[k] = proposedNewAddress[ownerAddresses[i]].newAddress;
                                emit OwnerChanged(proposedNewAddress[ownerAddresses[i]].oldAddress, proposedNewAddress[ownerAddresses[i]].newAddress, msg.sender);
                            }
                        }
                    }    
                }
            }
        }
    }
    
    function proposeWithdrawFunds(uint _amount, address _recipient) external isOwner {
        require(_amount <= address(this).balance);
        proposedNewWithdraw[msg.sender].amount = _amount;
        proposedNewWithdraw[msg.sender].recipient = _recipient;
        emit WithdrawalProposed(_amount, _recipient, msg.sender);
    }
    
    function withdraw() external isOwner {
        for(uint i = 0; i < ownerAddresses.length - 1; i++) {
            uint foundCount = 0;
            for(uint j = i; j < ownerAddresses.length; j++) {
                if(proposedNewWithdraw[ownerAddresses[i]].amount == proposedNewWithdraw[ownerAddresses[j]].amount &&
                proposedNewWithdraw[ownerAddresses[i]].recipient == proposedNewWithdraw[ownerAddresses[j]].recipient) {
                    foundCount++;
                    if(foundCount >= threshold) {
                        proposedNewWithdraw[ownerAddresses[i]].recipient.transfer(proposedNewWithdraw[ownerAddresses[i]].amount);
                        emit Transfer(proposedNewWithdraw[ownerAddresses[i]].amount, proposedNewWithdraw[ownerAddresses[i]].recipient, msg.sender);
                        proposedNewWithdraw[ownerAddresses[i]] = newWithdraw(0, 0x0);
                    }
                }                
            }
        }
    }

    function contribute() external payable {
        emit NewContribution(msg.sender, msg.value, address(this));
    }

    function forgetMe() external isOwner {
        // We only delete the fund if the balance has already been withdrawn
        // which implies a consensus of sorts.
        require(address(this).balance == 0);
        selfdestruct(0x0);
        emit FundDeleted(msg.sender, address(this), block.number);
    }
}
