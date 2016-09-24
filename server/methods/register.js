Meteor.methods({
register: function (user) {
        this.unblock();
            // console.log('register server ' + user.username + ' ' + user.password + ' ' + user.identity + ' ' + user.firstname + ' ' + user.lastname);
            //console.log('register identity 0 '+ user.identity);
        try {

            check(user.username, String);
           


            // make sure the username not exists!
            if (Meteor.users.findOne({username: user.username}))
            {
                return {err:'Username already exists!', status:false};
            }
            console.log('register server 1');

            var userId = Accounts.createUser({
                email: user.email,
                username: user.username,
                password: user.password,
                profile: {
                            
                            firstname:user.firstname,
                            lastname:user.lastname
                            // mobile:user.mobile,
                            // identity:user.identity
                        }
            });
            console.log('register server 2');

            return {err:'', status:true, id:userId};
        } catch (e) {
            console.log('error ' + e);
            // Got a network error, time-out or HTTP error in the 400 or 500 range.
            return {err:e.message, status:false};
        }
    },
});