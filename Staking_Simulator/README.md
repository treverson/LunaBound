# Staking Simulator

Staking simulator is designed as a means of demonstrating what Proof of Stake would look like to external users. It is comprised of 2 aspects: a Solidity Smart Contract which sends ether and a python script which interacts with it.

## Smart Contract
The Smart Contract has arrays which record who needs to recieve ether becuase they are 'staking'. When the drop() function is called, it airdrops funds to the appropriate parties.

## Python Script
The Python script interacts with the smart contract. It adds and removes accounts as well as periodically polling the airdrop function described above. It includes a sexy text base interface.

### Requirements:
* py-solc
* web3.py
* eth-abi
* eth-keyfile
* eth-keys
* eth-tester
* eth-utils