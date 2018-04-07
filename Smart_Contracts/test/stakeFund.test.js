const assertRevert = require('./helpers/assertRevert')
const emptyContract = require('./helpers/emptyContract')
const StakeFund = artifacts.require("./StakeFund.sol")

require('chai')
  .use(require('chai-as-promised'))
  .should()

  contract("StakeFund", accounts => {
    const _coinbase = accounts[0]
    const _owner1 = accounts[1]
    const _owner2 = accounts[2]
    const _owner3 = accounts[3]
    const _attacker = accounts[4]
    const _newOwner = accounts[5]
    const _withdrawalAccount = accounts[6]
    const _threshold = 2

    beforeEach(async () => {
        // Also testing the `payable` constructor here as it should be easy to intialise
        // your fund with an existing balance, thereby saving tx fees.
        stakeFund = await StakeFund.new([_owner1, _owner2, _owner3], _threshold, { from: _coinbase, value: web3.toWei(1, 'ether') })
    })

    describe('Setup', () => {
        it('should deploy the contract correctly and set addresses as expected', async () => {
            // When calling public getters for arrays, we need to pass in the index of the address
            // in the array we want to test for
            const owner1 = await stakeFund.ownerAddresses(0)
            owner1.should.be.equal(_owner1)
            const owner2 = await stakeFund.ownerAddresses(1)
            owner2.should.be.equal(_owner2)
            const owner3 = await stakeFund.ownerAddresses(2)
            owner3.should.be.equal(_owner3)
            // The threshold comes back as an object and we need to access only 1 part of it
            const thresholdObject = await stakeFund.threshold()
            const threshold = thresholdObject.c[0]
            threshold.should.be.equal(_threshold)
            const balanceObject = await web3.fromWei(web3.eth.getBalance(stakeFund.address))
            // The balance comes back as an object and we need to access only 1 part of it
            const balance = balanceObject.toString()
            balance.should.be.equal('1')
        })
    })

    describe('Contribute', () => {
        it('should allow anyone to contribute to the fund', async () => {
            await stakeFund.contribute({from: _coinbase, value: web3.toWei(1, 'ether')})
            const balanceObject = await web3.fromWei(web3.eth.getBalance(stakeFund.address))
            const balance = balanceObject.toString()
            // Should be 2 because of initial 1 ETH contribution from beforeEach loop
            balance.should.be.equal('2')
        })
    })

    describe('Propose new address', () => {
        it('should allow any one of the owners to propose a new address', async () => {
            await stakeFund.proposeNewAddress(_owner1, _newOwner, {from: _owner1})
            const proposedAddressArray = await stakeFund.proposedNewAddress.call(_owner1)
            const oldAddress = proposedAddressArray[0]
            const proposedNewAddress = proposedAddressArray[1]
            oldAddress.should.be.equal(_owner1)
            proposedNewAddress.should.be.equal(_newOwner)
        })

        it('should not allow anyone who is not an owner to propose a new address', async () => {
            await assertRevert(stakeFund.proposeNewAddress(_owner1, _newOwner, {from: _attacker}))
        })
    })

    describe('Change address', () => {
        it('should transfer ownership if owners that agree on new address passes threshold', async () => {
            await stakeFund.proposeNewAddress(_owner1, _newOwner, {from: _owner1})
            await stakeFund.proposeNewAddress(_owner1, _newOwner, {from: _owner2})
            await stakeFund.changeOwnerAddress({from: _owner3})
            // Using 0 index as we are changing out _owner1. Change index as needed.
            const changedOwner = await stakeFund.ownerAddresses(0)
            changedOwner.should.be.equal(_newOwner)
        })

        it('should not transfer ownership if threshold not reached', async () => {
            await stakeFund.proposeNewAddress(_owner1, _newOwner, {from: _owner1})
            await assertRevert(stakeFund.changeOwnerAddress({from: _owner3}))
            const changedOwner = await stakeFund.ownerAddresses(0)
            // Ownership should not have changed
            changedOwner.should.be.equal(_owner1)
        })

        it('should not transfer ownership if not called by an owner', async () => {
            await stakeFund.proposeNewAddress(_owner1, _newOwner, {from: _owner1})
            await stakeFund.proposeNewAddress(_owner1, _newOwner, {from: _owner2})
            await assertRevert(stakeFund.changeOwnerAddress({from: _attacker}))
            const changedOwner = await stakeFund.ownerAddresses(0)
            changedOwner.should.be.equal(_owner1)
        })

        it('should not transfer ownership if owners do not agree on new address', async () => {
            await stakeFund.proposeNewAddress(_owner1, _newOwner, {from: _owner1})
            await stakeFund.proposeNewAddress(_owner1, _attacker, {from: _owner2})
            await assertRevert(stakeFund.changeOwnerAddress({from: _owner3}))
            const changedOwner = await stakeFund.ownerAddresses(0)
            changedOwner.should.be.equal(_owner1)
        })

        it('should transfer ownership if threshold of owners do agree on new address, even if one does not', async () => {
            await stakeFund.proposeNewAddress(_owner1, _newOwner, {from: _owner1})
            await stakeFund.proposeNewAddress(_owner1, _attacker, {from: _owner2})
            await stakeFund.proposeNewAddress(_owner1, _newOwner, {from: _owner3})
            await stakeFund.changeOwnerAddress({from: _owner3})
            const changedOwner = await stakeFund.ownerAddresses(0)
            changedOwner.should.be.equal(_newOwner)
        })
    })

    describe('Propose withdrawal', () => {
        const _amount = web3.toWei(0.5, "ether")
        
        it('should let any one of the owners propose a withdrawal', async () => {
            await stakeFund.proposeWithdrawFunds(_amount, _withdrawalAccount, {from: _owner1})
            const proposedWithdrawArray = await stakeFund.proposedNewWithdraw.call(_owner1)
            const amount = proposedWithdrawArray[0].toString()
            const recipient = proposedWithdrawArray[1]
            amount.should.be.equal(_amount)
            recipient.should.be.equal(_withdrawalAccount)
        })

        it('should not let owners propose a withdrawal that exceeds the balance held by the contract', async () => {
            const _amountBig = web3.toWei(2, "ether")
            await assertRevert(stakeFund.proposeWithdrawFunds(_amountBig, _withdrawalAccount, {from: _owner1}))
        })

        it('should not allow anyone who is not an owner to propose a withdrawal', async () => {
            await assertRevert(stakeFund.proposeWithdrawFunds(_amount, _withdrawalAccount, {from: _attacker}))
        })
    })

    describe('Withdraw', () => {
        const _amount = web3.toWei(0.5, "ether")
        const _amountFloat = 0.5
        
        it('should allow any one of the owners to execute withdraw if the threshold has been reached', async () => {
            const oldBalanceObject = await web3.fromWei(web3.eth.getBalance(_withdrawalAccount))
            const oldBalance = parseFloat(oldBalanceObject.toString())
            await stakeFund.proposeWithdrawFunds(_amount, _withdrawalAccount, {from: _owner1})
            await stakeFund.proposeWithdrawFunds(_amount, _withdrawalAccount, {from: _owner2})
            await stakeFund.withdraw({from: _owner3})
            const newBalanceObject = await web3.fromWei(web3.eth.getBalance(_withdrawalAccount))
            const newBalance = parseFloat(newBalanceObject.toString())
            newBalance.should.be.equal(oldBalance + _amountFloat)
        })

        it('should not execute a withdrawal if threshold not reached', async () => {
            await stakeFund.proposeWithdrawFunds(_amount, _withdrawalAccount, {from: _owner1})
            await assertRevert(stakeFund.withdraw({from: _owner3}))
        })

        it('should not execute a withdrawal if not called by an owner', async () => {
            await stakeFund.proposeWithdrawFunds(_amount, _withdrawalAccount, {from: _owner1})
            await stakeFund.proposeWithdrawFunds(_amount, _withdrawalAccount, {from: _owner2})
            await assertRevert(stakeFund.withdraw({from: _attacker}))
        })

        it('should not execute a withdrawal if owners differ on amount', async () => {
            const _diffAmount = web3.toWei(0.6, "ether")
            await stakeFund.proposeWithdrawFunds(_amount, _withdrawalAccount, {from: _owner1})
            await stakeFund.proposeWithdrawFunds(_diffAmount, _withdrawalAccount, {from: _owner2})
            await assertRevert(stakeFund.withdraw({from: _owner3}))
        })

        it('should not execute a withdrawal if owners differ on new address', async () => {
            await stakeFund.proposeWithdrawFunds(_amount, _withdrawalAccount, {from: _owner1})
            await stakeFund.proposeWithdrawFunds(_amount, _attacker, {from: _owner2})
            await assertRevert(stakeFund.withdraw({from: _owner3}))
        })

        it('should execute a withdrawal if threshold of owners do agree on new address, even if one does not', async () => {
            const oldBalanceObject = await web3.fromWei(web3.eth.getBalance(_withdrawalAccount))
            const oldBalance = parseFloat(oldBalanceObject.toString())
            await stakeFund.proposeWithdrawFunds(_amount, _withdrawalAccount, {from: _owner1})
            await stakeFund.proposeWithdrawFunds(_amount, _attacker, {from: _owner2})
            await stakeFund.proposeWithdrawFunds(_amount, _withdrawalAccount, {from: _owner3})
            await stakeFund.withdraw({from: _owner3})
            const newBalanceObject = await web3.fromWei(web3.eth.getBalance(_withdrawalAccount))
            const newBalance = parseFloat(newBalanceObject.toString())
            newBalance.should.be.equal(oldBalance + _amountFloat)
        })
    })

    describe('Right to be forgotten', () => {
        it('should selfdestruct if balance is 0 and called by owner', async () => {
            const balanceObject = await web3.fromWei(web3.eth.getBalance(stakeFund.address))
            const balance = balanceObject.toString()
            await stakeFund.proposeWithdrawFunds(web3.toWei(balance, "ether"), _withdrawalAccount, {from: _owner1})
            await stakeFund.proposeWithdrawFunds(web3.toWei(balance, "ether"), _withdrawalAccount, {from: _owner2})
            await stakeFund.withdraw({from: _owner3})
            const newBalanceObject = await web3.fromWei(web3.eth.getBalance(stakeFund.address))
            const newBalance = newBalanceObject.toString()
            newBalance.should.equal('0')
            await stakeFund.forgetMe({from: _owner1})
            await emptyContract(stakeFund.ownerAddresses(0))
        })

        it('should not selfdestruct if balance is 0 but not called by owner', async () => {
            const balanceObject = await web3.fromWei(web3.eth.getBalance(stakeFund.address))
            const balance = balanceObject.toString()
            await stakeFund.proposeWithdrawFunds(web3.toWei(balance, "ether"), _withdrawalAccount, {from: _owner1})
            await stakeFund.proposeWithdrawFunds(web3.toWei(balance, "ether"), _withdrawalAccount, {from: _owner2})
            await stakeFund.withdraw({from: _owner3})
            const newBalanceObject = await web3.fromWei(web3.eth.getBalance(stakeFund.address))
            const newBalance = newBalanceObject.toString()
            newBalance.should.equal('0')
            await assertRevert(stakeFund.forgetMe({from: _attacker})) 
        })

        it('should not selfdestruct if balance is not 0', async () => {
            await assertRevert(stakeFund.forgetMe({from: _owner1})) 
        })
    })
  })