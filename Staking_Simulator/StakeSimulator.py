import sys
import random
from threading import Timer

from web3 import Web3, HTTPProvider
from solc import compile_source, compile_files
from web3.contract import ConciseContract

from prompt_toolkit import prompt
from prompt_toolkit.contrib.completers import WordCompleter
from prompt_toolkit.history import InMemoryHistory
from prompt_toolkit.auto_suggest import AutoSuggestFromHistory

web3 = Web3(HTTPProvider('http://localhost:8545'))


class RepeatedTimer(object):
    def __init__(self, interval, contract, *args, **kwargs):
        self._timer     = None
        #self.function   = function
        self.contract   = contract
        self.interval   = interval
        self.args       = args
        self.kwargs     = kwargs
        self.is_running = False
        self.start()
    def _run(self):
        self.is_running = False
        self.start()
        drop(self.contract)
        # self.function(*self.args, **self.kwargs)
    def start(self):
        if not self.is_running:
            self._timer = Timer(self.interval, self._run)
            self._timer.start()
            self.is_running = True
    def stop(self):
        self._timer.cancel()
        self.is_running = False



def compile_contract(contract_file, contract_name):
    contract_sol = compile_source(contract_file)  # Compiled source code
    interface = contract_sol['<stdin>:' + contract_name]
    return interface


def deploy_contract(interface, gas=4100000, arguments=None):
    # Instantiate and deploy contract
    contract = web3.eth.contract(abi=interface['abi'], bytecode=interface['bin'])

    # Get transaction hash from deployed contract
    tx_hash = contract.deploy(transaction={'from': web3.eth.accounts[0], 'gas': gas}, args=arguments)

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
    ['deploy: deploy the staking contract',
     'print: print stake contract address',
     'list: list staking addresses',
     'add: add new address to staking list',
     'remove: remove address from stake list',
     'stop: stop the automated dropping',
     'start: start the automated dropping'
     'drop: perform staking drop action',
     'period: set the period [s] between stakes',
     'auto: autoconfigure some accounts with staking'])

history = InMemoryHistory()
global stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address, dropTimer

# Drop object to be passed to the timer.
def drop(contract):
    contract.drop(transact={'from':web3.eth.coinbase})

# A hacky auto-configuration script
def auto_configure(numUsers=1, period=15):
    recipientCounter = 0
    (stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address) = deployStakeSimulator()
    for i in range(numUsers):
        recipientCounter = recipientCounter + 1;
        stakeSimulator_contract.addRecipient(web3.eth.accounts[i], transact={'from':web3.eth.coinbase})
    stakeSimulator_contract.deposit(transact={'from':web3.eth.accounts[i], 'value': web3.toWei(str(random.randrange(85,98)),'ether')})
    dropTimer = RepeatedTimer(period, stakeSimulator_contract)
    return (stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address, dropTimer, recipientCounter)



while 1:
    userInput = prompt('> ',
                       completer=command_completer,
                       history=history,
                       auto_suggest=AutoSuggestFromHistory()
                       )
    if 'deploy:' in userInput:
        recipientCounter = 0
        (stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address) = deployStakeSimulator()

    if 'print:' in  userInput:
        if stakeSimulator_address == '':
            print('No contract deployed.')
        else:
            print(stakeSimulator_address)

    if 'add:' in userInput:
        address = userInput[37:]
        recipientCounter = recipientCounter + 1
        stakeSimulator_contract.addRecipient(address, transact={'from':web3.eth.coinbase})

    if 'remove:' in userInput:
        recipientCounter = recipientCounter - 1
        address = userInput[39:]
        stakeSimulator_contract.removeRecipient(address, transact={'from':web3.eth.coinbase})

    if 'list:' in userInput:
        for i in range(recipientCounter):
            print(stakeSimulator_contract.recipients(i))

    if 'drop:' in userInput:
        drop(stakeSimulator_contract)

    if 'period:' in userInput:
        period = userInput[38:]
        dropTimer = RepeatedTimer(period, drop(), args=(stakeSimulator_contract))

    if 'stop:' in userInput:
        dropTimer.stop()

    if 'start:' in userInput:
        dropTimer.start()

    if 'auto:' in userInput:
        (stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address, dropTimer, recipientCounter) = auto_configure(5)




