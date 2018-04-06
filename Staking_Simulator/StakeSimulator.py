from web3 import Web3, HTTPProvider
from solc import compile_source, compile_files
from web3.contract import ConciseContract

from prompt_toolkit import prompt
from prompt_toolkit.contrib.completers import WordCompleter
from prompt_toolkit.history import InMemoryHistory
from prompt_toolkit.auto_suggest import AutoSuggestFromHistory



import sys
import sha3
import time

web3 = Web3(HTTPProvider('http://localhost:8545'))


def compile_contract(contract_file, contract_name):
    contract_sol = compile_source(contract_file)  # Compiled source code
    interface = contract_sol['<stdin>:' + contract_name]
    return interface


def deploy_contract(interface, gas=4100000, initial_balance = 10, arguments=None):
    # Instantiate and deploy contract
    contract = web3.eth.contract(abi=interface['abi'], bytecode=interface['bin'])

    # Get transaction hash from deployed contract
    tx_hash = contract.deploy(transaction={'from': web3.eth.accounts[0], 'gas': gas, 'value':web3.toWei(str(initial_balance), 'ether')}, args=arguments)

    # Get tx receipt to get contract address
    tx_receipt = web3.eth.getTransactionReceipt(tx_hash)
    contract_address = tx_receipt['contractAddress']

    # Contract instance in concise mode
    contract_instance = web3.eth.contract(abi=interface['abi'], address=contract_address,
                                          ContractFactoryClass=ConciseContract)

    return (contract_instance, contract_address)


#global stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address


def deployStakeSimulator():
    with open('StakeSimulator.sol', 'r') as myfile:
        stakeSimulator_file = myfile.read()

    stakeSimulator_interface = compile_contract(stakeSimulator_file, 'StakeSimulator')
    (stakeSimulator_contract, stakeSimulator_address) = deploy_contract(stakeSimulator_interface, gas=6000000)
    print('Search Contract Address: ', stakeSimulator_address)
    return (stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address)


command_completer = WordCompleter(
    ['deploy',
     'print stake contract address',
     'list staking addresses',
     'add new address to stake list',
     'remove address from stake list',
     'time to next drop',
     'perform staking drop action'])

history = InMemoryHistory()

while 1:
    userInput = prompt('> ',
                       completer=command_completer,
                       history=history,
                       auto_suggest=AutoSuggestFromHistory()
                       )
    if userInput == 'deploy':
        (stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address) = deployStakeSimulator()

    if userInput == 'print stake contract address':
        if stakeSimulator_address == '':
            print('No contract deployed.')
        else:
            print(stakeSimulator_address)

    if 'add new address to stake list' in userInput:
        address = userInput[30:]
        stakeSimulator_contract.addRecipiant(address, transact={'from':web3.eth.coinbase})

    if userInput == 'list staking addresses':
        print(stakeSimulator_contract.getRecipients())

    if userInput == 'perform staking drop action':
        print(stakeSimulator_contract.drop(transact={'from':web3.eth.coinbase}))




