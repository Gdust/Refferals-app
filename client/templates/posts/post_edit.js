Template.postEdit.onCreated(function() {
  Session.set('postEditErrors', {});
});

Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  }
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentPostId = this._id;
    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      description: $(e.target).find('[name=description]').val(),
      title: $(e.target).find('[name=title]').val(),
      private: Number($("input[name='private']:checked").val()) ? Number($("input[name='private']:checked").val()) : 0,
      image: $(e.target).find('[name=image]').val()
      
    }
    
    var errors = validatePost(postProperties);
    if (errors.title || errors.private)
      return Session.set('postEditErrors', errors);
    
    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('home');
    }
  }
//   'click .make_private': function(e){
//     e.preventDefault();

//     var currentPostId = this._id;
//     var postProperties = {
      
//       title: $(e.target).find('[name=title]').val(),
//       // private: true
//     }

// var errors = privatePost(postProperties);
//     if (errors.private)
//       return Session.set('postEditErrors', errors);

//       Posts.update(currentPostId, {$set: postProperties}, function(error) {
//       if (error) {
//         // display the error to the user
//         throwError(error.reason);
//       } else {
//         Router.go('postPage', {_id: currentPostId});
//       }
//     });
//   }
});
