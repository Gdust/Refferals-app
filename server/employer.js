Meteor.publish('employer', function(id) {
    return Employer.find({_id: id});
});
