

Template.createPension.events({
    'change #numRecoverers': function(event) {
        let value = event.target.value;
        console.log(value);
         if(Session.get("recovers")===undefined){
             Session.set("recovers",[]);
         }
         else {
             let recovers = Session.get("recovers");
             if (value > recovers.length){
                 recovers.push("");
                 Session.set("recovers", recovers);
             }
             else{
                 // recovers.pop();
             }
             console.log("populated");
         }
    }
});

Template.createPension.helpers({
    recovers: function (){
        return Session.get("recovers");
    }
});


