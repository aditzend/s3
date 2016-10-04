Meteor.publish(null, function personsPublic() {
    return Persons.find({}, {
        fields: {
            treatedAs: 1,
            bDay: 1,
            bMonth: 1,
            bYear: 1,
            isMale: 1,
            lastName: 1,
            middleName: 1,
            name: 1,
            fin: 1,
            finType: 1,
            country: 1,
            phone: 1,
            internalPhone: 1,
            mobile: 1,
            email: 1,
        }
    });
    console.log("public persons data published");

});
// 
// Meteor.publish('persons.own', function personsOwn() {
//     if (this.userId) {
//         let user = Meteor.users.findOne(this.userId);
// 
//         //console.log('USER KEY', r.key);
// 
//         // let r = "vBBRrEM8m8PYSjTBM";
// 
//         return Persons.find({
//             owner: u.ssok
//         }, {
//             fields: {
//                 owner: false
// 
//             }
//         });
//     } else {
//         this.ready();
//     }
// });

Meteor.publish('persons.own',
     function() {
    //     let ip = this.connection.clientAddress;
    // 
    //     if (this.userId) {
          return Persons.find({
              
          }, {
              fields: {
                  owner: 0
              }
          });
    //       
    //     } else {
    //         console.log("ACCESS DENIED to persons.own : Attempt logged to ip ", ip);
    //         Logs.insert({
    //             type: 'ACCESS_DENIAL',
    //             user: this.userId,
    //             ip: ip,
    //             createdAt: new Date()
    //                 .valueOf(),
    //             affects: this.userId,
    //             details: 'persons.own publication denied due to keys inconsistency'
    //         });
    //         this.ready();
    //     }
    });

Meteor.publish('persons.test', function() {
    return Persons.find();
});
