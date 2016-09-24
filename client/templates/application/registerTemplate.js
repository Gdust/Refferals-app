
Template.registerTemplate.onRendered(function(){

    // Initialize iCheck plugin
    // $('.i-checks').iCheck({
    //     checkboxClass: 'icheckbox_square-green',
    //     radioClass: 'iradio_square-green',
    // });

        $("#form").validate({
        rules: {
            password: {
                required: true,
                minlength: 3
            },
            url: {
                required: true,
                url: true
            },
            number: {
                required: true,
                number: true
            },
            max: {
                required: true,
                maxlength: 4
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });

    $("#registerForm").validate({
        rules: {
			password: {
                required: true,
                minlength: 8
            },
            password2: {
                required: true,
                minlength: 8,
                equalTo: '#password'
            },
            email: {
                required: true,
                email: true,
                minlength: 3
            },
            username: {
                required: true,
                url: false,
                minlength: 3
            },
           
            firstname: {
              required: true,
              minlength: 2
            },
            lastname: {
              required: true,
              minlength: 2
            }
        },
        messages: {
            password: {
                required: "(Please enter your password)",
                minlength: "The mininum length for password is 8 characters"
            },
            password2: {
                required: "(Please enter your password)",
                minlength: "The mininum length for password is 8 characters"
            },
            email: {
                required: "The email is required",
                minlength: "The mininum length for email is 3 characters"
            },
            username: {
                required: "The username is required",
                minlength: "The mininum length for username is 3 characters"
            },
            lastname: {
            	required: "The last name is required",
                minlength: "The mininum length for last name is 2 characters"
            },
	         firstname: {
	        	required: "The first name is required",
	            minlength: "The mininum length for first name is 2 characters"
	        }
	        // mobilenumber: {
	        // 	required: "Mobile number is required"
	        // }
            
        },
       cancelSubmit: function() {
        },
        submitHandler: function(form) {            
            var user = {
                "email": form['email'].value,
                "username": form['username'].value,
                "password": form['password'].value,
                "firstname": $('#firstname').val(),
                "lastname": $('#lastname').val()
                // "mobile": $('#mobilenumber').val(),
                // "identity": $('input[name=profile]:checked', '#registerForm').val()
            }
                Meteor.call('register', user, function(err, data) {
                // if (!data || !data.status) {
                //     Command: toastr["error"]("Register failed", data.err)
                //     toastr.options = {
                //     "closeButton": false,
                //     "debug": false,
                //     "newestOnTop": false,
                //     "progressBar": false,
                //     "positionClass": "toast-top-center",
                //     "preventDuplicates": false,
                //     "onclick": null,
                //     "showDuration": "300",
                //     "hideDuration": "1000",
                //     "timeOut": "5000",
                //     "extendedTimeOut": "1000",
                //     "showEasing": "swing",
                //     "hideEasing": "linear",
                //     "showMethod": "fadeIn",
                //     "hideMethod": "fadeOut"
                //     }
                //     console.log('register KO ' + data.err);
                // } 

                if (err){
                    // Command: toastr["error"]("error", "Register")

                    // toastr.options = {
                    //   "closeButton": false,
                    //   "debug": false,
                    //   "newestOnTop": false,
                    //   "progressBar": false,
                    //   "positionClass": "toast-top-right",
                    //   "preventDuplicates": false,
                    //   "onclick": null,
                    //   "showDuration": "300",
                    //   "hideDuration": "1000",
                    //   "timeOut": "5000",
                    //   "extendedTimeOut": "1000",
                    //   "showEasing": "swing",
                    //   "hideEasing": "linear",
                    //   "showMethod": "fadeIn",
                    //   "hideMethod": "fadeOut"
                    // }
                    throwError(err.reason);
                }

                else {
                                console.log('login ');
                                Router.go('login');                                
                            }
               
            });
        },
        errorPlacement: function(error, element) {
            $( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );
        },
        errorElement: "span",
    });

  


// Template.register.events({
// 	'click .cancel': function(event) {

//         event.preventDefault();
//         Router.go('login');
//     }
// });


});
