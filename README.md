# LunaBound [![BCH compliance](https://bettercodehub.com/edge/badge/Blockchaingers/LunaBound?branch=master)](https://bettercodehub.com/)

## Repository Structure

You can find each part of our solution in a separate directory:

1. *Dapp*: A fully functional web-based DApp that can be found at http://dapp.lunabound.space. This is the open source part of the project and is a simple tool that allows anyone with an Ethereum account to create a multisig staking contract with built-in key recovery.  
Currently it works both on local simulations and on Ropsten. You can find an example contract deployed [here](https://ropsten.etherscan.io/address/0x4022c7ce08dcfa6b24afd0b33d2f90226bee22fa).

2. *Smart_Contracts*: Stores both smart contracts and their full test suites. Further information about how to run those tests and verify that the contracts behave as expected can be found in the README in that directory.

3. *StakeFunds_Site*: A directory that hosts all the code for the simple website hosted here: http://lunabound.space/

4. *Staking_Simulator*: This directory hosts a smart contract that simulates staking conditions and a python script that initiates the staking simulation process that is then executed by the smart contract. Further details about how to run that locally are provided in the README in that directory.

## Product Description

![Introduction](https://github.com/Blockchaingers/LunaBound/img/slide1.png "Introduction")
![Returns](https://github.com/Blockchaingers/LunaBound/img/slide2.png "Returns")
![Proof of Stake](https://github.com/Blockchaingers/LunaBound/img/slide3.png "Proof of Stake")
![Challenge](https://github.com/Blockchaingers/LunaBound/img/slide4.png "Challenge")
![Solution](https://github.com/Blockchaingers/LunaBound/img/slide5.png "Solution")
![StakeFund](https://github.com/Blockchaingers/LunaBound/img/slide6.png "StakeFund")