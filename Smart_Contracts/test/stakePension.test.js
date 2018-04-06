const assertRevert = require('./helpers/assertRevert')
const BigNumber = web3.BigNumber
const StakePension = artifacts.require("./StakePension.sol")

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

  contract("StakePension", accounts => {
    const _owner = accounts[0] // only owner can request withdrawls and destruct contract (right to be forgotten)
    const _recovery1 = accounts[1] // only recovery addresses can propose new owner address in case of lost keys
    const _recovery2 = accounts[2] 
    const _recovery3 = accounts[3]
    const _manager = accounts[4] // only manager can approve & execute withdrawals
    const _attacker = accounts[5]
    const _withdrawalAccount = accounts[6]
    const _newOwner = accounts[7]
      
    beforeEach(async () => {
        const numberRecoverers = 2
        stakePension = await StakePension.new([_recovery1, _recovery2, _recovery3], numberRecoverers, _manager, { from: _owner })
        await stakePension.contribute({from: _owner, value: web3.toWei(1, 'ether')})
    })

    describe('setup', () => {
        it('should deploy correctly and set required addresses', async () => {
            const owner = await stakePension.owner()
            owner.should.be.equal(_owner)
            const manager = await stakePension.manager()
            manager.should.be.equal(_manager)
            const balanceArray = await web3.fromWei(web3.eth.getBalance(stakePension.address))
            // The balance comes back as an object and we need to access only 1 part of it
            const balance = balanceArray.c[0]
            balance.should.be.equal(1)
            // When calling public getters for arrays, we need to pass in the index of the address
            // in the array we want to test for
            const recovery1 = await stakePension.recoverers(0)
            recovery1.should.be.equal(_recovery1)
            const recovery2 = await stakePension.recoverers(1)
            recovery2.should.be.equal(_recovery2)
            const recovery3 = await stakePension.recoverers(2)
            recovery3.should.be.equal(_recovery3)  
        })
    })

    describe('requests', () => {
        it('should allow the owner to request adhoc withdrawals', async () => {
            const amount = 1
            await stakePension.requestAdhocWithdraw(amount, _withdrawalAccount, {from: _owner})
            const pendingObject = await stakePension.pendingAdhocWithdraw()
            const pendingBalance = pendingObject[0].c[0]
            pendingBalance.should.be.equal(1)
            const pendingAddress = pendingObject[1]
            pendingAddress.should.be.equal(_withdrawalAccount)
        })

        it('should allow the owner to request recurring withdrawals', async () => {
            const amount = 1
            const period = 604800
            // Using 604800 because that is the number of seconds in a week, for unix timestamps
            await stakePension.requestRecurringWithdraw(amount, _withdrawalAccount, period, {from: _owner})
            const pendingObject = await stakePension.pendingRecurringWithdraw()
            const pendingBalance = pendingObject[0].c[0]
            pendingBalance.should.be.equal(1)
            const pendingAddress = pendingObject[1]
            pendingAddress.should.be.equal(_withdrawalAccount)
            const pendingPeriod = pendingObject[2].c[0]
            pendingPeriod.should.be.equal(period)
        })

        it('should not allow anyone other than the owner to request adhoc withdrawals', async () => {
            const amount = 1
            await assertRevert(stakePension.requestAdhocWithdraw(amount, _withdrawalAccount, {from: _attacker}))
        })

        it('should not allow anyone other than the owner to request recurring withdrawals', async () => {
            const amount = 1
            const period = 604800
            await assertRevert(stakePension.requestRecurringWithdraw(amount, _withdrawalAccount, period, {from: _attacker}))
        })
    })

    describe('approve', () => {
        it('should allow the manager to approve a pending adhoc withdrawal', async () => {
            const amount = 1
            await stakePension.requestAdhocWithdraw(amount, _withdrawalAccount, {from: _owner})
            await stakePension.approveAdhocWithdraw({from: _manager})
            const approvedObject = await stakePension.approvedAdhocWithdraw()
            const approvedBalance = approvedObject[0].c[0]
            approvedBalance.should.be.equal(1)
            const approvedAddress = approvedObject[1]
            approvedAddress.should.be.equal(_withdrawalAccount)
        })

        it('should allow the manager to approve a pending recurring withdrawal', async () => {
            const amount = 1
            const period = 604800
            await stakePension.requestRecurringWithdraw(amount, _withdrawalAccount, period, {from: _owner})
            await stakePension.approveRecurringWithdraw({from: _manager})
            const approvedObject = await stakePension.approvedRecurringWithdraw()
            const approvedBalance = approvedObject[0].c[0]
            approvedBalance.should.be.equal(1)
            const approvedAddress = approvedObject[1]
            approvedAddress.should.be.equal(_withdrawalAccount)
            const approvedPeriod = approvedObject[2].c[0]
            approvedPeriod.should.be.equal(period)
        })

        it('should not allow anyone other than the manager to approve adhoc withdrawals', async () => {
            const amount = web3.toWei(1, "ether")
            await stakePension.requestAdhocWithdraw(amount, _withdrawalAccount, {from: _owner})
            await assertRevert(stakePension.approveAdhocWithdraw({from: _attacker}))
        })

        it('should not allow anyone other than the manager to approve recurring withdrawals', async () => {
            const amount = web3.toWei(1, "ether")
            const period = 604800
            await stakePension.requestRecurringWithdraw(amount, _withdrawalAccount, period, {from: _owner})
            await assertRevert(stakePension.approveRecurringWithdraw({from: _attacker}))
        })
    })
    
    describe('execute', () => {
        it('should allow the manager to execute an approved adhoc withdrawal', async () => {
            const balanceBeforeArray = await web3.fromWei(web3.eth.getBalance(_withdrawalAccount))
            const balanceBefore = balanceBeforeArray.c[0]
            const amount = web3.toWei(1, "ether")
            await stakePension.requestAdhocWithdraw(amount, _withdrawalAccount, {from: _owner})
            await stakePension.approveAdhocWithdraw({from: _manager})
            await stakePension.executeAdhocWithdraw({from: _manager})
            const executedObject = await stakePension.approvedAdhocWithdraw()
            // Should transfer 1 ETH to _withdrawal account
            const balanceArray = await web3.fromWei(web3.eth.getBalance(_withdrawalAccount))
            const balance = balanceArray.c[0]
            balance.should.be.equal(balanceBefore + 1)
            // Should set the approved balance back to 0
            const executedBalance = executedObject[0].c[0]
            executedBalance.should.be.equal(0)
            const executedAddress = executedObject[1]
            executedAddress.should.be.equal('0x0000000000000000000000000000000000000000')
        })

        it('should allow the manager to execute an approved recurring withdrawal', async () => {
            const balanceBeforeArray = await web3.fromWei(web3.eth.getBalance(_withdrawalAccount))
            const balanceBefore = balanceBeforeArray.c[0]
            const amount = web3.toWei(1, "ether")
            const period = 604800
            const period2 = 604800*2
            await stakePension.requestRecurringWithdraw(amount, _withdrawalAccount, period, {from: _owner})
            await stakePension.approveRecurringWithdraw({from: _manager})
            await stakePension.executeRecurringWithdraw(period2, {from: _manager})
            const executedObject = await stakePension.approvedRecurringWithdraw()
            // Should transfer 1 ETH to _withdrawal account
            const balanceArray = await web3.fromWei(web3.eth.getBalance(_withdrawalAccount))
            const balance = balanceArray.c[0]
            balance.should.be.equal(balanceBefore + 1)
            // Should set the approved balance back to 0
            const firstWithdraw = executedObject[2].c[0]
            firstWithdraw.should.be.equal(period)
            const lastWithdraw = executedObject[3].c[0]
            lastWithdraw.should.be.equal(period2)
        })

        it('should not allow anyone other than the manager to execute an approved adhoc withdrawal', async () => {
            const amount = web3.toWei(1, "ether")
            await stakePension.requestAdhocWithdraw(amount, _withdrawalAccount, {from: _owner})
            await stakePension.approveAdhocWithdraw({from: _manager})
            await assertRevert(stakePension.executeAdhocWithdraw({from: _attacker}))
        })

        it('should not allow anyone other than the manager to execute an approved recurring withdrawal', async () => {
            const amount = web3.toWei(1, "ether")
            const period = 604800
            const period2 = 604800*2
            await stakePension.requestRecurringWithdraw(amount, _withdrawalAccount, period, {from: _owner})
            await stakePension.approveRecurringWithdraw({from: _manager})
            await assertRevert(stakePension.executeRecurringWithdraw(period2, {from: _attacker}))
        })
    })

    describe("Propose New Owner", () => {
        it('should allow any one of the recoverers to propose a new owner address in the event of lost keys', async () => {
            await stakePension.proposeNewOwner(_newOwner, {from: _recovery1})
            const _proposedNewOwner = await stakePension.proposedNewOwner.call(_recovery1)
            _proposedNewOwner.should.be.equal(_newOwner)
        })

        it('should not allow an account that is not a recoverer to propose a new owner address in the event of lost keys', async () => {
            await assertRevert(stakePension.proposeNewOwner(_newOwner, {from: _attacker}))
        })
    })

    describe("transfer Ownership", () => {
        it('should propose transfer of ownership when a recoverer proposes a new owner address', async () => {
            await stakePension.proposeNewOwner(_newOwner, {from: _recovery1})
            const _proposedNewOwner = await stakePension.proposedNewOwner.call(_recovery1)
            _proposedNewOwner.should.be.equal(_newOwner)
        })

        it('should not allow an account that is not a recoverer to propose a new owner address in the event of lost keys', async () => {
            await assertRevert(stakePension.proposeNewOwner(_newOwner, {from: _attacker}))
        })
    })

    describe('Transfer Ownership', () => {
        it('should transfer ownership when numberRecoverers have all proposed a new owner address', async () => {
            await stakePension.proposeNewOwner(_newOwner, {from: _recovery1})
            await stakePension.proposeNewOwner(_newOwner, {from: _recovery2})
            const _proposedNewOwner1 = await stakePension.proposedNewOwner.call(_recovery1)
            const _proposedNewOwner2 = await stakePension.proposedNewOwner.call(_recovery2)
            _proposedNewOwner1.should.be.equal(_newOwner) 
            _proposedNewOwner2.should.be.equal(_newOwner)
            await stakePension.transferOwner({from: _owner})
            const _Owner = await stakePension.owner()
            _Owner.should.be.equal(_newOwner)
        })

        it('should not transfer ownership when numberRecoverers have proposed different owner address', async () => {
            await stakePension.proposeNewOwner(_newOwner, {from: _recovery1})
            await stakePension.proposeNewOwner(_attacker, {from: _recovery2})
            const _proposedNewOwner1 = await stakePension.proposedNewOwner.call(_recovery1)
            const _proposedNewOwner2 = await stakePension.proposedNewOwner.call(_recovery2)
            _proposedNewOwner1.should.be.equal(_newOwner) 
            _proposedNewOwner2.should.be.equal(_attacker)
            await assertRevert(stakePension.transferOwner({from: _owner}))
            const _Owner = await stakePension.owner()
            _Owner.should.be.equal(_owner)
        })

        it('should not transfer ownership when numberRecoverers has not been fulfilled', async () => {
            await stakePension.proposeNewOwner(_newOwner, {from: _recovery1})
            const _proposedNewOwner1 = await stakePension.proposedNewOwner.call(_recovery1)
            _proposedNewOwner1.should.be.equal(_newOwner) 
            await assertRevert(stakePension.transferOwner({from: _owner}))
            const _Owner = await stakePension.owner()
            _Owner.should.be.equal(_owner)
        })
    })
  })