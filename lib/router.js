Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [Meteor.subscribe('notifications')]
  }
});



PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 10, 
  postsLimit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var self = this;
    return {
      posts: self.posts(),
      ready: self.postsSub.ready,
      nextPath: function() {
        if (self.posts().count() === self.postsLimit())
          return self.nextPath();
      }
    };
  }
});

PrivatePostsListController = RouteController.extend({
  template: 'postsList',
  increment: 10, 
  postsLimit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('privatePosts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var self = this;
    return {
      posts: self.posts(),
      ready: self.postsSub.ready,
      nextPath: function() {
        if (self.posts().count() === self.postsLimit())
          return self.nextPath();
      }
    };
  }
});

NewPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

BestPostsController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PrivatePostsController = PrivatePostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.privatePosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

Router.route('/', {
  name: 'home',
  controller: NewPostsController
});

Router.route('/profile', {name: 'profile'});

Router.route('/new/:postsLimit?', {name: 'newPosts'});

Router.route('/best/:postsLimit?', {name: 'bestPosts'});

// Router.route('/registerTemplate', {name: 'registerTemplate'});

// Router.route('/loginTemplate', {name: 'loginTemplate'});

Router.route('/private/:postsLimit?', {
  name: 'privatePosts'

  
});


Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Posts.findOne(this.params._id); }
});


Router.route('/loginTemplate', function () {


    // $('html').removeClass('user-interface');
    Meteor.logout();
    this.render('loginTemplate');
    // this.redirect('loginTemplate');
    // this.layout('blankLayout');



},
    {
        name: 'loginTemplate'
    });

Router.route('/termsOfUse', function () {
    this.render('termsOfUse');
    this.layout('blankLayout');
},
    {
        name: 'termsOfUse'
    });

Router.route('/registerTemplate', function () {
    this.render('registerTemplate');
    // this.redirect('registerTemplate');
    // this.layout('blankLayout');
},
    {
        name: 'registerTemplate'
    });


Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() { 
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

// Router.route('/submit', {name: 'postSubmit'});

Router.route('/submit', function () {
  var Admin = Meteor.users.findOne()._id;
  if (Admin == "D2jGE756QqZyZfSBZ") {
    this.render('postSubmit');
  } else {
    this.render('notFound');
  }
},
    {
        name: 'postSubmit'
    });

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
