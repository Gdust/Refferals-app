Meteor.publish("userData", function() {
    // var id = Meteor.users.findOne().profile.identity;
    var thisUser = Meteor.users.findOne().username;
    // var id = Meteor.user().profile.identity;
    // console.log(id);
    // current user
    if(this.userId){
         // return Meteor.users.find({"profile.identity":{$not: { $eq: "1" }}});
         return Meteor.users.find({});

  //       if (id == 2) {
  //       return Meteor.users.find({"profile.identity":{$ne:"1"}}
  //       //     , {
  //       //     fields: {
  //       //         'persodata': 1
                
  //       //     }
  //       // }

  //       );
  // }
  //   if (id == 1) {
  //       return Meteor.users.find({"profile.identity":{$ne:"2"}});
  //   } 
  //   else {
  //       this.ready();
  //   }
}
    
});

