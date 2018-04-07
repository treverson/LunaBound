const ABI_ARRAY = [
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
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
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
        "constant": false,
        "inputs": [],
        "name": "contribute",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
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
    }
]
const BYTE_CODE = "0x606060405260405162001b8138038062001b81833981016040528080518201919060200180519060200190919050508160009080519060200190620000469291906200006c565b5080600160006101000a81548161ffff021916908361ffff160217905550505062000141565b828054828255906000526020600020908101928215620000e8579160200282015b82811115620000e75782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906200008d565b5b509050620000f79190620000fb565b5090565b6200013e91905b808211156200013a57600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555060010162000102565b5090565b90565b611a3080620001516000396000f3006060604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806309b6ce34146100a95780630f310b17146100be578063327f5957146101215780633ccfd60b1461013657806342cde4e81461014b5780634f02fb791461017c5780636f71bd89146101be578063736da9c314610216578063d7bb99ba14610296578063f205c09a146102a0575b600080fd5b34156100b457600080fd5b6100bc61034c565b005b34156100c957600080fd5b6100df600480803590602001909190505061041b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561012c57600080fd5b61013461045a565b005b341561014157600080fd5b610149610c6d565b005b341561015657600080fd5b61015e6113f7565b604051808261ffff1661ffff16815260200191505060405180910390f35b341561018757600080fd5b6101bc600480803590602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061140b565b005b34156101c957600080fd5b610214600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611643565b005b341561022157600080fd5b61024d600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506118bb565b604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b61029e6118ff565b005b34156102ab57600080fd5b6102d7600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506119a0565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b60008060009150600090505b6000805490508110156103e55760008181548110151561037457fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156103d857600191505b8080600101915050610358565b8115156103f157600080fd5b60003073ffffffffffffffffffffffffffffffffffffffff163114151561041757600080fd5b6000ff5b60008181548110151561042a57fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060008060008060009150600090505b6000805490508110156104f95760008181548110151561048857fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156104ec57600191505b808060010191505061046c565b81151561050557600080fd5b600095505b600160008054905003861015610c6557600094508593505b600080549050841015610c585760026000808681548110151561054157fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166002600080898154811015156105f357fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614801561080157506002600080868154811015156106ad57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660026000808981548110151561075f57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b15610c4b578480600101955050600160009054906101000a900461ffff1661ffff1685101515610c4a57600092505b600080549050831015610c495760026000808881548110151561084f57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000848154811015156108fe57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610c3c5760026000808881548110151561095857fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000848154811015156109f157fe5b906000526020600020900160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f381c0d11398486654573703c51ee8210ce9461764d133f9f0e53b6a539705331600260008089815481101515610a6d57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660026000808a815481101515610b0957fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a15b8280600101935050610830565b5b5b8380600101945050610522565b858060010196505061050a565b505050505050565b6000806000806000809150600090505b600080549050811015610d0a57600081815481101515610c9957fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610cfd57600191505b8080600101915050610c7d565b811515610d1657600080fd5b600094505b6001600080549050038510156113f057600093508492505b6000805490508310156113e357600360008085815481101515610d5257fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154600360008088815481101515610dce57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154148015610fa65750600360008085815481101515610e5257fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600360008088815481101515610f0457fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b156113d6578380600101945050600160009054906101000a900461ffff1661ffff16841015156113d557600360008087815481101515610fe257fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60036000808981548110151561109757fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549081150290604051600060405180830381858888f19350505050151561112657600080fd5b7f0a429aba3d89849a2db0153e4534d95c46a1d83c8109d73893f55ebc44010ff460036000808881548110151561115957fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001546003600080898154811015156111d557fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633604051808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a1604080519081016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525060036000808881548110151561131a57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050505b5b8280600101935050610d33565b8480600101955050610d1b565b5050505050565b600160009054906101000a900461ffff1681565b60008060009150600090505b6000805490508110156114a45760008181548110151561143357fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561149757600191505b8080600101915050611417565b8115156114b057600080fd5b3073ffffffffffffffffffffffffffffffffffffffff163184111515156114d657600080fd5b83600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555082600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fb49f0586bb66203abb694290db03134b3b9d91fe3c11be7e9d0c2a17e72e6563848433604051808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a150505050565b60008060009150600090505b6000805490508110156116dc5760008181548110151561166b57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156116cf57600191505b808060010191505061164f565b8115156116e857600080fd5b83600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f7ced9d92fce2a8638d24f9402862b432a1622e10d0cef30cdd4311328665603c848433604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a150505050565b60036020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b7f63b0da8d3b6d4f2d3d607e4bf412a85e661e29faa765dc3ff5617c0095982805333430604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a1565b60026020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050825600a165627a7a723058201be81a73ee56edd868275d53946f04c0ada68b5a12529513d27d2c37dc5276160029"

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
    }
});


Template.managePension.events({
    'click .btnSearch': function () {
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
});

Template.createPension.helpers({
    recovers: function () {
        return Session.get("recovers");
    },
    recoveryAddresses: function () {
        return Session.get("recoveryAddresses");
    }
});


// function createFund() {
//
//     let ownerAddress = Session.get("recoveryAddresses");
//
//     return new Promise((resolve, error) => {
//
//         try {
//             let StakeFund = web3.eth.contract(ABI_ARRAY);
//             let contractInstance = StakeFund.new(
//
//                 ,
//                 {
//                     from: Address,
//                     data: BYTE_CODE,
//                     gas: "4000000"
//                 },
//                 function (e, contract) {
//                     sAlert.success('Fund Published to blockchain');
//                     sAlert.info('Fund Address is: ' + contract.address);
//                     sAlert.info('Fund tx Hash is: ' + contract.txHash);
//
//                     try {
//                         if (typeof contract.address !== "undefined") {
//                             try {
//                                 resolve({address: contract.address, txHash: contract.transactionHash});
//                             }
//                             catch (err) {
//                                 error(err);
//                             }
//                         }
//                     } catch (e2) {
//                         sAlert.error('It looks like you cancelled the transaction!');
//                         error("Error");
//                     }
//                     if (e) {
//                         sAlert.error('Oh-No! The fund could not to be mined.');
//                         error("Error");
//                     }
//                 }
//             );
//         }
//         catch (err) {
//             sAlert.error("Failed to create the fund.");
//             error(err);
//         }
//     });
// }

