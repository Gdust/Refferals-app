Template.postItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-success upvotable';
    } else {
      return 'disabled';
    }
  },
  profile: function() {
    var profile = {
      firstname: Meteor.users.findOne().profile.firstname,
      lastname: Meteor.users.findOne().profile.lastname
    }
    return profile.firstname + ' ' + profile.lastname;
  },
  ref() {
    return ' перейти и получить информацию';
  }
});

Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});