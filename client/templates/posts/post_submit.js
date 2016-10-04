Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.postSubmit.events({

  'submit form': function(e) {
    e.preventDefault();
    var value = ('true' === $(".chk").val() );
    var post = {
      url: $(e.target).find('[name=url]').val(),
      description: $(e.target).find('[name=description]').val(),
      title: $(e.target).find('[name=title]').val(),
      private: Number($("input[name='private']:checked").val()) ? Number($("input[name='private']:checked").val()) : 0,
      image: $(e.target).find('[name=image]').val()
    };
    
    // var errors = validatePost(post);
    // if (errors.title || errors.url)
    //   return Session.set('postSubmitErrors', errors);
    
    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      // if (error)
      //   return throwError(error.reason);
      
      // show this result but route anyway
      // if (result.postExists)
      //   throwError('This link has already been posted');
      
      Router.go('postPage', {_id: result._id});  
    });
  }
  //  'click .toggle-checked'() {
  //   // Set the checked property to the opposite of its current value
  //   Tasks.update(this._id, {
  //     $set: { checked: ! this.checked },
  //   });
  // }
});