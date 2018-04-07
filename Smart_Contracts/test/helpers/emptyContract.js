module.exports = async promise => {
    try {
      await promise
      assert.fail('Expected error not received')
    } catch (error) {
      const emptyContractFound = error.message.search('not a contract address') >= 0
      assert(emptyContractFound, `Expected "empty contract", got ${error} instead`)
    }
  }