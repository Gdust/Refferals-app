Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name
    });
    
    return active && 'active';
  },
  Gdust() {
  	var Gdust = Meteor.users.findOne()._id;
  	try{
  	
  	if(Gdust == "dhY9LJKavkDAdFnQz") {
  		return true;
  	} 
  } catch (e) {

  		console.log(e);
  	
  }
  	}
});