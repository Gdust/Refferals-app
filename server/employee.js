Meteor.publish('employee', function(id) {
  if(this.userId){
    return Employee.find();
  }
});
