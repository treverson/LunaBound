# Staking Smart Contracts

This directory contains two complete smart contract implementations and test suites. During the Blockchainger Hackathon, we had to re-architecture the initial `StakePension.sol` contract we had written based on feedback from the various judges and jedis.

The smart contract that is actually used in our DApp is therefore the `StakeFund.sol` implementation. However, we have kept `StakePension.sol` in the directory for completeness and because we think there are still interesting ways to use it later on.

In order to run the tests, make sure you have the latest version of `Truffle` installed:

```
npm i -g truffle@4.1.5
```

You can choose which test client to use (i.e. `testrpc`, `Ganache` etc.), but we prefer simply using `Truffle`'s in-built tools:

```
truffle develop

# In the javascript console that this starts
test test/stakeFund.test.js
```

If you would like to test both contracts at the same time, you'll need to uncomment to commented code in `migrations/2_deploy_contracts.js` and follow the same steps, except you can just run `test` in the JS console, rather than specifying a subset of the available suite.