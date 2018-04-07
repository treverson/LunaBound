const ABI_ARRAY = [
    {
        "constant": false,
        "inputs": [],
        "name": "changeOwnerAddress",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "contribute",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "forgetMe",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_contributor",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_pensionContract",
                "type": "address"
            }
        ],
        "name": "NewContribution",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_receipient",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_receipient",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_proposer",
                "type": "address"
            }
        ],
        "name": "WithdrawalProposed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_oldAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_newAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "OwnerChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_oldAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_newAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_proposer",
                "type": "address"
            }
        ],
        "name": "NewAddressProposed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_deleter",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_stakeFund",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_blockNumber",
                "type": "uint256"
            }
        ],
        "name": "FundDeleted",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_oldAddress",
                "type": "address"
            },
            {
                "name": "_newAddress",
                "type": "address"
            }
        ],
        "name": "proposeNewAddress",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256"
            },
            {
                "name": "_recipient",
                "type": "address"
            }
        ],
        "name": "proposeWithdrawFunds",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_ownerAddresses",
                "type": "address[]"
            },
            {
                "name": "_threshold",
                "type": "uint16"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "numberOfOwners",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "ownerAddresses",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "proposedNewAddress",
        "outputs": [
            {
                "name": "oldAddress",
                "type": "address"
            },
            {
                "name": "newAddress",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "proposedNewWithdraw",
        "outputs": [
            {
                "name": "amount",
                "type": "uint256"
            },
            {
                "name": "recipient",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "threshold",
        "outputs": [
            {
                "name": "",
                "type": "uint16"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
const BYTE_CODE = "0x606060405260405162001bc738038062001bc78339810160405280805182019190602001805190602001909190505081600090805190602001906200004692919062000078565b5080600260006101000a81548161ffff021916908361ffff16021790555060008054905060018190555050506200014d565b828054828255906000526020600020908101928215620000f4579160200282015b82811115620000f35782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509160200191906001019062000099565b5b50905062000103919062000107565b5090565b6200014a91905b808211156200014657600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055506001016200010e565b5090565b90565b611a6a806200015d6000396000f3006060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806309b6ce34146100b45780630f310b17146100c9578063327f59571461012c5780633ccfd60b1461014157806342cde4e8146101565780634f02fb79146101875780636f71bd89146101c9578063736da9c31461022157806393fd1844146102a1578063d7bb99ba146102ca578063f205c09a146102d4575b600080fd5b34156100bf57600080fd5b6100c7610380565b005b34156100d457600080fd5b6100ea600480803590602001909190505061044f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561013757600080fd5b61013f61048e565b005b341561014c57600080fd5b610154610ca1565b005b341561016157600080fd5b61016961142b565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561019257600080fd5b6101c7600480803590602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061143f565b005b34156101d457600080fd5b61021f600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611677565b005b341561022c57600080fd5b610258600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506118ef565b604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b34156102ac57600080fd5b6102b4611933565b6040518082815260200191505060405180910390f35b6102d2611939565b005b34156102df57600080fd5b61030b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506119da565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b60008060009150600090505b600080549050811015610419576000818154811015156103a857fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561040c57600191505b808060010191505061038c565b81151561042557600080fd5b60003073ffffffffffffffffffffffffffffffffffffffff163114151561044b57600080fd5b6000ff5b60008181548110151561045e57fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060008060008060009150600090505b60008054905081101561052d576000818154811015156104bc57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561052057600191505b80806001019150506104a0565b81151561053957600080fd5b600095505b600160008054905003861015610c9957600094508593505b600080549050841015610c8c5760036000808681548110151561057557fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660036000808981548110151561062757fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614801561083557506003600080868154811015156106e157fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660036000808981548110151561079357fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b15610c7f578480600101955050600260009054906101000a900461ffff1661ffff1685101515610c7e57600092505b600080549050831015610c7d5760036000808881548110151561088357fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660008481548110151561093257fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610c705760036000808881548110151561098c57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600084815481101515610a2557fe5b906000526020600020900160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f381c0d11398486654573703c51ee8210ce9461764d133f9f0e53b6a539705331600360008089815481101515610aa157fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660036000808a815481101515610b3d57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a15b8280600101935050610864565b5b5b8380600101945050610556565b858060010196505061053e565b505050505050565b6000806000806000809150600090505b600080549050811015610d3e57600081815481101515610ccd57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610d3157600191505b8080600101915050610cb1565b811515610d4a57600080fd5b600094505b60016000805490500385101561142457600093508492505b60008054905083101561141757600460008085815481101515610d8657fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154600460008088815481101515610e0257fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154148015610fda5750600460008085815481101515610e8657fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600460008088815481101515610f3857fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b1561140a578380600101945050600260009054906101000a900461ffff1661ffff16841015156114095760046000808781548110151561101657fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004600080898154811015156110cb57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549081150290604051600060405180830381858888f19350505050151561115a57600080fd5b7f0a429aba3d89849a2db0153e4534d95c46a1d83c8109d73893f55ebc44010ff460046000808881548110151561118d57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015460046000808981548110151561120957fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633604051808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a1604080519081016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525060046000808881548110151561134e57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050505b5b8280600101935050610d67565b8480600101955050610d4f565b5050505050565b600260009054906101000a900461ffff1681565b60008060009150600090505b6000805490508110156114d85760008181548110151561146757fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156114cb57600191505b808060010191505061144b565b8115156114e457600080fd5b3073ffffffffffffffffffffffffffffffffffffffff1631841115151561150a57600080fd5b83600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555082600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fb49f0586bb66203abb694290db03134b3b9d91fe3c11be7e9d0c2a17e72e6563848433604051808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a150505050565b60008060009150600090505b6000805490508110156117105760008181548110151561169f57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561170357600191505b8080600101915050611683565b81151561171c57600080fd5b83600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f7ced9d92fce2a8638d24f9402862b432a1622e10d0cef30cdd4311328665603c848433604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a150505050565b60046020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b60015481565b7f63b0da8d3b6d4f2d3d607e4bf412a85e661e29faa765dc3ff5617c0095982805333430604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a1565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050825600a165627a7a72305820441a047ae3ec54286dd5ebe7a4d78a2d49f1d1db2aa512b4f84d51ea58890c260029"

let recoveryAddresses = [];
Template.createPension.events({
    'click .addAddress': function () {
        let address = $('.recoveryAddress')[0].value;
        if (($.inArray(address, recoveryAddresses)) === -1) {
            recoveryAddresses.push(address);
            Session.set("recoveryAddresses", recoveryAddresses);
        }
    },
    'click .removeAddress': function (e) {
        let idToRemove = e.currentTarget.id;
        console.log(idToRemove);
        let index = recoveryAddresses.indexOf(idToRemove);
        if (index > -1) {
            recoveryAddresses.splice(index, 1);
        }
        Session.set("recoveryAddresses", recoveryAddresses);
    },
    'click .createFund': function () {
        createFund();
    }
});


Template.managePension.events({
    'click .btnSearch': function () {
        let template = Template.instance();
        let address = $('.fundAddress')[0].value;
        getFundFromBlockchain(address, template);
        setTimeout(animateBar, 500);
    },
    'click .btnDeposit': function () {
        let address = $('.fundAddress')[0].value;
        let amount = $('.fundingAmount')[0].value;
        depositEther(address,amount);
    }
});



function animateBar() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);

    function frame() {
        if (width >= 50) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

Template.createPension.helpers({
    recovers: function () {
        return Session.get("recovers");
    },
    recoveryAddresses: function () {
        return Session.get("recoveryAddresses");
    }
});

Template.managePension.helpers({
    fundFound: function () {
        return Session.get("fundFound");
    }
})

function createFund() {

    let ownerAddress = Session.get("recoveryAddresses");
    let threshold = $('#transferThreshold')[0].value;

    return new Promise((resolve, error) => {

        try {
            let StakeFund = web3.eth.contract(ABI_ARRAY);
            let contractInstance = StakeFund.new(
                ownerAddress,
                threshold,
                {
                    from: Address,
                    data: BYTE_CODE,
                    gas: "4000000"
                },
                function (e, contract) {
                    sAlert.success('Fund Published to blockchain');
                    sAlert.info('Fund Address is: ' + contract.address);
                    sAlert.info('Fund tx Hash is: ' + contract.txHash);

                    try {
                        if (typeof contract.address !== "undefined") {
                            try {
                                resolve({address: contract.address, txHash: contract.transactionHash});
                            }
                            catch (err) {
                                error(err);
                            }
                        }
                    } catch (e2) {
                        sAlert.error('It looks like you cancelled the transaction!');
                        error("Error");
                    }
                    if (e) {
                        sAlert.error('Oh-No! The fund could not to be mined.');
                        error("Error");
                    }
                }
            );
        }
        catch (err) {
            sAlert.error("Failed to create the fund.");
            error(err);
        }
    });
}

Meteor.setInterval(checkWeb3Status, 1000);

//Functions
function checkWeb3Status() {
    if (!web3.isConnected()) {
        console.log("no web3");
        sAlert.error("You don't have a web3 client");
    } else {
        let network;
        web3.version.getNetwork((error, result) => {
            network = getNetwork(result);
            Session.set("connectedNetwork", network);
            if (network !== "Ropsten" && network !== "Unknown") {
                console.log("wrong network");
                sAlert.error("You are not connected to Ropsten or a local network");
            } else { // Check whether account is locked
                web3.eth.getAccounts(function (err, res) {
                    if (!err) {
                        Address = res[0];
                        if (Address == undefined) {
                            if (!Session.get("accountLocked")) {
                                console.log("account locked");
                                sAlert.error("Your Web3 client is locked! please unlock it!");
                                Session.set("accountLocked", true);
                                Session.set("Address", "0x");
                                Session.set("walletBallance", 0);
                            }
                        } else { // Set all the apropriate variables
                            web3.eth.getBlockNumber(function (err, res) {
                                Session.set("blockNumber", res);
                            });
                            Session.set("Address", Address);
                            Session.set("accountLocked", false);
                            web3.eth.getBalance(Address, function (err, res) {
                                let ethBlance = Math.round(web3.fromWei(res, "ether") * 10000) / 10000;
                                Session.set("walletBallance", ethBlance);
                            });
                        }
                    }
                });
            }
        })
        ;
    }
};

function getNetwork(networkId) {
    switch (networkId) {
        case '1':
            return 'Mainnet';
        case '2':
            return 'Morden';
        case '3':
            return 'Ropsten';
        case '4':
            return 'Rinkeby';
        case '42':
            return 'Kovan';
        default:
            return 'Unknown';
    }
}

function getContract(fundAddress) {
    try {
        return web3.eth.contract(ABI_ARRAY).at(fundAddress);
    }
    catch (err) {
        sAlert.error("Somthing went wrong getting the contract");
        console.log(err)
    }
    return null;
}

Session.set("fundFound", false);
function getFundFromBlockchain(address, template) {
    Session.set("fundFound", true);
    let fund = getContract(address);
    fund.threshold(function (err, res) {
        TemplateVar.set(template, "threshold", res.c[0]);
    });

    fund.numberOfOwners(function (err, res) {
        TemplateVar.set(template, "numberOfOwners", res.c[0]);
    });

    web3.eth.getBalance(address, function(err,res) {
        TemplateVar.set(template,"fundBalance",res.c[0]/10000+" Ether");
        console.log(res);
    });
}

function depositEther(address, value) {
    let fund = getContract(address);
    fund.contribute({from: web3.eth.accounts[0], gas: 3000000, value: web3.toWei(value, "ether")}, function (err,res){
        console.log(res)});
}