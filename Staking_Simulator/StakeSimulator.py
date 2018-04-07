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
    def __init__(self, interval, function, *args, **kwargs):
        self._timer     = None
        self.function   = function
        # self.contract   = contract
        self.interval   = interval
        self.args       = args
        self.kwargs     = kwargs
        self.is_running = False
        self.start()
    def _run(self):
        self.is_running = False
        self.start()
        # drop(self.contract)
        self.function(*self.args, **self.kwargs)
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



possible_commands = ['deploy','print','list','add','remove','stop','start''drop','period','auto']
command_completer = WordCompleter(possible_commands)

history = InMemoryHistory()
# global stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address, dropTimer

# Drop object to be passed to the timer.
def air_drop(contract):
    contract.drop(transact={'from':web3.eth.coinbase})

# A hacky auto-configuration script
def auto_configure(numUsers=1, period=15):
    recipientCounter = 0
    (stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address) = deployStakeSimulator()
    for i in range(numUsers):
        recipientCounter = recipientCounter + 1;
        stakeSimulator_contract.addRecipient(web3.eth.accounts[i], transact={'from':web3.eth.coinbase})
        stakeSimulator_contract.deposit(transact={'from':web3.eth.accounts[i], 'value': web3.toWei(str(random.randrange(85,98)),'ether')})
    dropTimer = RepeatedTimer(period, air_drop ,stakeSimulator_contract)
    return (stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address, dropTimer, recipientCounter)


class StakingSimulator():
    def __init__(self):
        self.stakeSimulator_contract = None
        self.stakeSimulator_address = None
        self.recipientCounter = None
        self.userInput = None
        self.dropTimer = None
        self.params = None

    def deploy(self):
        self.recipientCounter = 0
        (takeSimulator_interface, self.stakeSimulator_contract, self.stakeSimulator_address) = deployStakeSimulator()

    def print(self):
        if self.stakeSimulator_address == '':
            print('No contract deployed.')
        else:
            print(self.stakeSimulator_address)

    def add(self):
        address = self.params
        self.recipientCounter = self.recipientCounter + 1
        self.stakeSimulator_contract.addRecipient(address, transact={'from':web3.eth.coinbase})


    def remove(self):
        self.recipientCounter = self.recipientCounter - 1
        address = self.params
        self.stakeSimulator_contract.removeRecipient(address, transact={'from':web3.eth.coinbase})

    def list(self):
        for i in range(self.recipientCounter):
            print(self.stakeSimulator_contract.recipients(i))

    def drop(self):
        air_drop(self.stakeSimulator_contract)


    def period(self):
        period = self.params
        self.dropTimer = RepeatedTimer(period, air_drop, self.stakeSimulator_contract)
        # self.dropTimer = RepeatedTimer(period, air_drop(), args=(self.stakeSimulator_contract))

    def stop(self):
        self.dropTimer.stop()

    def start(self):
        self.dropTimer.start()

    def auto(self):
        (stakeSimulator_interface, self.stakeSimulator_contract, self.stakeSimulator_address, self.dropTimer, self.recipientCounter) = auto_configure(10)

    def run(self):
        while 1:
            self.userInput = prompt('> ',
               completer=command_completer,
               history=history,
               auto_suggest=AutoSuggestFromHistory()
               )
            if " " in self.userInput:
                self.params = self.userInput.split(' ')[1]
                self.userInput = self.userInput.split(' ')[0]
            if self.userInput in possible_commands:
                command = getattr(self, self.userInput)
                command()



def main():
    staking_sim = StakingSimulator()
    staking_sim.run()

if __name__ == '__main__':
    main()

# while 1:
#     userInput = prompt('> ',
#                        completer=command_completer,
#                        history=history,
#                        auto_suggest=AutoSuggestFromHistory()
#                        )
#     if 'deploy' in userInput:
#         recipientCounter = 0
#         (stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address) = deployStakeSimulator()

#     if 'print' in  userInput:
#         if stakeSimulator_address == '':
#             print('No contract deployed.')
#         else:
#             print(stakeSimulator_address)

#     if 'add' in userInput:
#         address = userInput[37:]
#         recipientCounter = recipientCounter + 1
#         stakeSimulator_contract.addRecipient(address, transact={'from':web3.eth.coinbase})

#     if 'remove' in userInput:
#         recipientCounter = recipientCounter - 1
#         address = userInput[39:]
#         stakeSimulator_contract.removeRecipient(address, transact={'from':web3.eth.coinbase})

#     if 'list' in userInput:
#         for i in range(recipientCounter):
#             print(stakeSimulator_contract.recipients(i))

#     if 'drop' in userInput:
#         drop(stakeSimulator_contract)

#     if 'period' in userInput:
#         period = userInput[38:]
#         dropTimer = RepeatedTimer(period, drop(), args=(stakeSimulator_contract))

#     if 'stop' in userInput:
#         dropTimer.stop()

#     if 'start' in userInput:
#         dropTimer.start()

#     if 'auto' in userInput:
#         (stakeSimulator_interface, stakeSimulator_contract, stakeSimulator_address, dropTimer, recipientCounter) = auto_configure(5)




