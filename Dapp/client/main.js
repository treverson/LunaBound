let recoveryAddresses = [];
Template.createPension.events({
    'click .addAddress': function () {
        let address = $('.recoveryAddress')[0].value;
        if (($.inArray(address, recoveryAddresses)) === -1) {
            recoveryAddresses.push(address);
            Session.set("recoveryAddresses",recoveryAddresses);
        }
    },
    'click .removeAddress': function (e) {
        let idToRemove = e.currentTarget.id;
        console.log(idToRemove);
        let index = recoveryAddresses.indexOf(idToRemove);
        if (index > -1) {
            recoveryAddresses.splice(index, 1);
        }
        Session.set("recoveryAddresses",recoveryAddresses);
    }
});


Template.managePension.events({
    'click .btnSearch': function (){
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

