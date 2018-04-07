var StakePension = artifacts.require("./StakePension.sol");

module.exports = function(deployer, network, accounts) {
    const _owner = accounts[0]
    const _recovery1 = accounts[1]
    const _recovery2 = accounts[2] 
    const _recovery3 = accounts[3]
    const _manager = accounts[4]
    deployer.deploy(StakePension, [_recovery1, _recovery2, _recovery3], 2, _manager);
}