Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  // update: function(userId, post) { return true },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    // return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title;
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = privatePost(modifier.$set);
    return errors.private;
  }
});

validatePost = function (post) {
  var errors = {};

  if (!post.title)
    errors.title = "Please fill in a headline";

  if (!post.description)
    errors.description = "Please fill in a description";
  
   
  if (!post.url)
    errors.url =  "Please fill in a URL";

  return errors;
}

privatePost = function (post) {
  var errors = {};

  // if (!post.private)
  //   errors.title = "private error";
  
   
  // if (!post.url)
  //   errors.url =  "Please fill in a URL";

  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      private: Number,
      url: String,
      description: String
    });
    
    var errors = validatePost(postAttributes);
    if (errors.title || errors.url || errors.description)
      throw new Meteor.Error('invalid-post', "You must set a title, URL and description for your post");
    
    // var postWithSameLink = Posts.findOne({url: postAttributes.url});
    // if (postWithSameLink) {
    //   return {
    //     postExists: true,
    //     _id: postWithSameLink._id
    //   }
    // }
    
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [], 
      votes: 0
    });
    
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  },
  
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
    
    var affected = Posts.update({
      _id: postId, 
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
    
    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }
});
