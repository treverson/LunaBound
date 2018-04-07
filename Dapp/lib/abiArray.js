export const ABI_ARRAY = [
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
];
