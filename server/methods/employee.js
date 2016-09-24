Meteor.methods({
    saveEmployee: function(EmployeeData) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You must be loged in!');
        } else {
          console.log("allowed");
        }
        check(EmployeeData, Object);

        // var currUser = Meteor.users.findOne({_id: this.userId});
        // if (currUser.profile.identity == 1) {
        //
        //   console.log("saveEmployee pressed, id=1");
        //     // var patient = {
        //     //     patientId: this.userId,
        //     //     confirmed: true,
        //     //     response: true,
        //     // }
        //     //
        //     // var doctor = {
        //     //     doctorId: currUser.doctor.doctorId,
        //     //     confirmed: false,
        //     //     response: false,
        //     // }
        // } else if (currUser.profile.identity == 2) {
        //
        //   console.log("saveEmployer pressed, id=2");
        //     // var patient = {
        //     //     patientId: EmployeeData.patientId,
        //     //     confirmed: false,
        //     //     response: false,
        //     // }
        //     // var doctor = {
        //     //     doctorId: this.userId,
        //     //     confirmed: true,
        //     //     response: true,
        //     // }
        // } else {
        //     throw new Meteor.Error('unknown-identity');
        // }

var fname = Meteor.user().profile.firstname;

        var firstName = EmployeeData.firstName,
            lastName = EmployeeData.lastName;
            // personalInfo = EmployeeData.personalInfo,
            // email = EmployeeData.email;
            // phoneNumber = EmployeeData.phoneNumber,
            // status = 'created',
            // createdAt = new Date(),
            // dollarsPerHour = EmployeeData.dollarsPerHour;

        Employee.insert({
            firstName: firstName,
            lastName: lastName
            // personalInfo: personalInfo,
            // email: email
            // phoneNumber: phoneNumber,
            // status: status,
            // createdAt: createdAt,
            // dollarsPerHour: dollarsPerHour
        });
    },
    updateEmployee: function(EmployeeData, id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You must be loged in!');
        }

        check(EmployeeData, Object);
        var currUser = Meteor.users.findOne({_id: this.userId});
        // if (Meteor.users.findOne({username: user.username}))
        // //             {
        // //                 return {err:'Username already exists!', status:false};
        // //             }
        Employee.update({_id: id}), {
          $set: {
            status: 'updated',

          }
        }
        // if (appData.status && appData.status === 'confirmed') {
        //     if (currUser.persodata.identity == 1) {
        //         Employees.update({_id: id}, {
        //             $set: {
        //                 status: appData.status,
        //                 'patient.confirmed': true,
        //                 'patient.response': true,
        //             }
        //         });
        //     } else if (currUser.persodata.identity == 2) {
        //         Employees.update({_id: id}, {
        //             $set: {
        //                 status: appData.status,
        //                 'doctor.confirmed': true,
        //                 'doctor.response': true,
        //             }
        //         });
        //     }
        // }

        // if (appData.newDate1 && appData.status && appData.status === 'pending') {
        //     if (currUser.persodata.identity == 1) {
        //         Employees.update({_id: id}, {
        //             $set: {
        //                 status: 'pending',
        //                 'patient.confirmed': true,
        //                 'doctor.confirmed': false,
        //                 newDate1: appData.newDate1 ? new Date(appData.newDate1) : null,
        //                 newDate2: appData.newDate2 ? new Date(appData.newDate2) : null,
        //                 newDate3: appData.newDate3 ? new Date(appData.newDate3) : null,
        //             }
        //         });
        //     } else if (currUser.persodata.identity == 2) {
        //         Employee.update({_id: id}, {
        //             $set: {
        //                 status: 'pending',
        //                 'patient.confirmed': false,
        //                 'doctor.confirmed': true,
        //                 newDate1: appData.newDate1 ? new Date(appData.newDate1) : null,
        //                 newDate2: appData.newDate2 ? new Date(appData.newDate2) : null,
        //                 newDate3: appData.newDate3 ? new Date(appData.newDate3) : null,
        //             }
        //         });
        //     }
        // }
        // if (appData.status && appData.status === 'canceled') {
        //     if (currUser.persodata.identity == 1) {
        //         Employees.update({_id: id}, {
        //             $set: {
        //                 status: 'canceled',
        //                 'patient.confirmed': false,
        //                 'doctor.confirmed': true,
        //                 newDate1: null,
        //                 newDate2: null,
        //                 newDate3: null,
        //             }
        //         });
        //     } else if (currUser.persodata.identity == 2) {
        //         Employees.update({_id: id}, {
        //             $set: {
        //                 status: 'canceled',
        //                 'patient.confirmed': true,
        //                 'doctor.confirmed': false,
        //                 newDate1: null,
        //                 newDate2: null,
        //                 newDate3: null,
        //             }
        //         });
        //     }
        // }
    }
});
