// Template.profile.onRendered(function(){



//     $("#form_2").validate({
//         rules: {
//             name: {
//                 required: true,
//                 minlength: 3
//             },



//             // personalInfo: {
//             //     required: true

//             // },
//             // phoneNumber: {
//             //     required: true,
//             //     number: true
//             // },
//             // dollarsPerHour: {
//             //     required: true,
//             //     number: true
//             // },
//             last_name: {
//                 required: true,
//                 minlength: 3
//             }
//         },
//         messages: {
//             // phoneNumber: {
//             //     required: "(Please enter your phone number)",
//             //     number: "(Please enter valid phone number)"
//             // },
//             last_name: {
//                 required: "Last name is required",
//                 minlength: "min 3 digits"
//             },
//             name: {
//                 required: "First name is required",
//                 minlength: "min 3 digits"
//             }
//         },
//         //  submitHandler: function(form) {
//         //     form.submit();
//         // },
//         submitHandler: function(event) {
//                   // event.preventDefault();
//                   // console.log("saveEmployee clicked start");
//                   var EmployeeData = {
//                       // firstName: $(event.target).find('[name=name]').val(),
//                       // lastName: $(event.target).find('[name=last_name]').val()
//                       // personalInfo: $(event.target).find('[name=personalInfo]').val(),
//                       // email: $(event.target).find('[name=email]').val(),
//                       // phoneNumber: $(event.target).find('[name=phoneNumber]').val(),
//                       // dollarsPerHour: $(event.target).find('[name=dollarsPerHour]').val(),
//                       // firstName: form["name"].value,
//                       // lastName: form["last_name"].value
//                       // firstName: event.target.name.value,
//                       // lastName: event.target.last_name.value
//                       firstName: $('#name').val(),
//                       lastName: $('#last_name').val()
//                       // personalInfo: event.target.personalInfo.value,
//                       // email: event.target.email.value,
//                       // phoneNumber: event.target.phoneNumber.value,
//                       // dollarsPerHour: event.target.dollarsPerHour.value,
//                   }
//                   console.log("saveEmployee clicked start");
//                   // if (template.patientId) {
//                   //     appointmentData['patientId'] = template.patientId.get();
//                   // }
//                   Meteor.call('saveEmployee', EmployeeData, function(err, result) {
//                       if (err && err.error) {

//                         throwError(error.reason);
//                           // swal({
//                           //     title: 'Error occured',
//                           //     text: err.reason,
//                           //     allowEscapeKey: false,
//                           //     closeOnCancel: false,
//                           //     closeOnConfirm: true,
//                           //     type: 'error'
//                           // });
//                       }
//                       console.log("saveEmployee clicked stop");
//                       // $('#calendar').fullCalendar('refetchEvents');
//                       // Modal.hide();
//                   });
//                   // form.submit();

//         },
//         errorPlacement: function(error, element) {
//             $( element )
//                 .closest( "form" )
//                 .find( "label[for='" + element.attr( "id" ) + "']" )
//                 .append( error );
//         },
//         errorElement: "span",
//     });


// });


Template.profile.helpers({
	myUsername() {
		// var workers = Meteor.users.find().fetch().map(worker =>
		// 	worker.username);
			// document.write("<ul>")+document.write("<li>")+worker.username+document.write("</ul>")+document.write("</li>"));

		// var workers = Meteor.users.findOne();

		var username = Meteor.user().username;
		return username;
	},
  firstName() {
    var fname = Meteor.user().profile.firstname;
    return fname;
  },
  lastName() {
    var lname = Meteor.user().profile.lastname;
    return lname;
  },
  email(){
    var email =  Meteor.user().emails[0].address;
    return email;
  },
  personalInfo() {
    var pInfo =  Meteor.user().profile.personalInfo;
    return pInfo;
  },
  mobileNumber() {
    var mNumber =  Meteor.user().profile.mobile;
    return mNumber;
  }
});

// // Template.myProfile.events({
// //     'click .createProfile': function(event, template) {
// //         event.preventDefault();
// //         console.log("saveEmployee clicked start");
// //         var EmployeeData = {
// //             // firstName: $(event.target).find('[name=firstName]').val(),
// //             // lastName: $(event.target).find('[name=lastName]').val(),
// //             // personalInfo: $(event.target).find('[name=personalInfo]').val(),
// //             // email: $(event.target).find('[name=email]').val(),
// //             // phoneNumber: $(event.target).find('[name=phoneNumber]').val(),
// //             // dollarsPerHour: $(event.target).find('[name=dollarsPerHour]').val(),
// //             firstName: event.target.firstName.value,
// //             lastName: event.target.lastName.value,
// //             personalInfo: event.target.personalInfo.value,
// //             email: event.target.email.value,
// //             phoneNumber: event.target.phoneNumber.value,
// //             dollarsPerHour: event.target.dollarsPerHour.value,
// //         }
// //         // if (template.patientId) {
// //         //     appointmentData['patientId'] = template.patientId.get();
// //         // }
// //         Meteor.call('saveEmployee', EmployeeData, function(err, result) {
// //             if (err && err.error) {
// //                 swal({
// //                     title: 'Error occured',
// //                     text: err.reason,
// //                     allowEscapeKey: false,
// //                     closeOnCancel: false,
// //                     closeOnConfirm: true,
// //                     type: 'error'
// //                 });
// //             }
// //             console.log("saveEmployee clicked stop");
// //             // $('#calendar').fullCalendar('refetchEvents');
// //             // Modal.hide();
// //         });
// //     }
// // });
