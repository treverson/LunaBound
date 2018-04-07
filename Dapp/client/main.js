import {ABI_ARRAY} from "../lib/abiArray"
import {BYTE_CODE} from "../lib/byteCode"

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