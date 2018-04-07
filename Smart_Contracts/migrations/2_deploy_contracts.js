var StakePension = artifacts.require("./StakePension.sol");
var StakeFund = artifacts.require("./StakeFund.sol");

module.exports = function(deployer, network, accounts) {
    // const _owner = accounts[4]
    // const _recovery1 = accounts[5]
    // const _recovery2 = accounts[6] 
    // const _recovery3 = accounts[7]
    // const _manager = accounts[8]
    // deployer.deploy(StakePension, [_recovery1, _recovery2, _recovery3], _threshold, _manager);

    const _coinbase = accounts[0]
    const _owner1 = accounts[1]
    const _owner2 = accounts[2]
    const _owner3 = accounts[3]
    const _threshold = 2
    deployer.deploy(StakeFund, [_owner1, _owner2, _owner3], _threshold)
}