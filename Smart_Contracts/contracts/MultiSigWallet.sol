pragma solidity ^0.4.21;

contract StakeFund {
    address[] public ownerAddresses;
    uint16 public recoveryThreshold;
    uint16 public transferThreshold;
    
    struct replacementAddress {
        address oldAddress;
        address newAddress;
    }
    
    mapping(address => replacementAddress) public proposedNewAddress;
    
    struct newWithdraw {
        uint ammount;
        address recipient;
    }
    
    mapping(address => newWithdraw) public proposedNewWithdraw;
    
    function StakeFund(address[] _ownerAddresses, uint16 _recoveryThreshold, uint16 _transferThreshold) payable public {
        ownerAddresses = _ownerAddresses;
        recoveryThreshold = _recoveryThreshold;
        transferThreshold = _transferThreshold;
    }
    
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
    
    function proposeNewAddress(address _oldAddress, address _newAddress) external isOwner {
        proposedNewAddress[msg.sender].oldAddress = _oldAddress;
        proposedNewAddress[msg.sender].newAddress = _newAddress;
    }
    
    function transferOwnerAddress() external isOwner returns(bool) {
        for(uint i = 0; i < ownerAddresses.length - 1; i++) {
            uint foundCount = 0;
            for(uint j = i; j<ownerAddresses.length; j++) {
                if(proposedNewAddress[ownerAddresses[i]].oldAddress == proposedNewAddress[ownerAddresses[j]].oldAddress &&
                proposedNewAddress[ownerAddresses[i]].newAddress == proposedNewAddress[ownerAddresses[j]].newAddress) {
                    foundCount++;
                    if(foundCount >= recoveryThreshold) {
                        // if the old address is 0x0 then add a new address to the array(add a new multisig address)
                        if (proposedNewAddress[ownerAddresses[i]].oldAddress==0x0) {
                                    ownerAddresses.push(proposedNewAddress[ownerAddresses[i]].newAddress);
                                    return true;
                                }
                        
                        for (uint k = 0 ; k < ownerAddresses.length; k ++) {
                            if(ownerAddresses[k] == proposedNewAddress[ownerAddresses[i]].oldAddress) {
                                // if the new address is 0x0, then remove the old address from the array
                                if (proposedNewAddress[ownerAddresses[i]].newAddress==0x0) {
                                    delete ownerAddresses[k];
                                    ownerAddresses[k] = ownerAddresses[ownerAddresses.length-1]; //ensure that the array does not have a blank spot
                                    address[] newOwnerAddresses;
                                    // need to remove the last element in the array as it will be 0x0. Cant have this as only owned addresses should be in this array
                                    for (uint l = 0; l < ownerAddresses.length-1;l++){
                                        newOwnerAddresses.push(ownerAddresses[l]);
                                    }
                                    
                                    ownerAddresses = newOwnerAddresses;
                                    return true;
                                }
                                // if the neither the new or old address is 0x0 then swap out the old with the new
                                else{
                                    ownerAddresses[k] = proposedNewAddress[ownerAddresses[i]].newAddress;
                                    return true;
                                }
                            }
                        }
                    }
                }                
            }
        }
        return false;
    }
    
    function proposeWithdrawFunds(uint _ammount, address _recipient) external isOwner {
        proposedNewWithdraw[msg.sender].ammount = _ammount;
        proposedNewWithdraw[msg.sender].recipient = _recipient;
    }
    
    function withdraw() external isOwner returns(bool) {
        for(uint i = 0; i < ownerAddresses.length - 1; i++) {
            uint foundCount = 0;
            for(uint j = i; j<ownerAddresses.length; j++) {
                if(proposedNewWithdraw[ownerAddresses[i]].ammount == proposedNewWithdraw[ownerAddresses[j]].ammount &&
                proposedNewWithdraw[ownerAddresses[i]].recipient == proposedNewWithdraw[ownerAddresses[j]].recipient) {
                    foundCount++;
                    if(foundCount >= transferThreshold) {
                        proposedNewWithdraw[ownerAddresses[i]].recipient.transfer(proposedNewWithdraw[ownerAddresses[i]].ammount);
                        return true;
                    }
                }                
            }
        }
        return false;
    }
}
