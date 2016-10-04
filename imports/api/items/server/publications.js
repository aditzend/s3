// Meteor.publish("items.test", function itemsTest() {
//     return Items.find();
// });
// 
// 
// 
// 
// Meteor.publish('items.own',
//     function itemsOwn(workfor, workerRelId) { //f7BXSGPQY3gnKf9zr
//         const workerRel = Rels.findOne(workerRelId);
//         const company = Companies.findOne(workfor); //this is an async call, if you remove the loop the data wont be ready and company.ssok will throw undefined
// 
// 
//         // return Items.find({
//         //     owner: company.ssok
//         // }, {
//         //     fields: {
//         //         owner: false
//         //     }
//         // });
//         // if (company.ssok === workerRel.owner) {
//         return Items.find({
//             //owner: company._id
//         }, {
//             fields: {
//                 owner: false
//             }
//         });
//         // } else {
//         //     return this.ready();
//         // }
// 
//     });

Meteor.publish('items.own',
    function(workfor) {
    //     this.autorun(function(computation) {
    //         let workerRel = Rels.findOne(workerRelId, {
    //             fields: {
    //                 owner: 1
    //             }
    //         });
    //         let company = Companies.findOne(workfor, {
    //             fields: {
    //                 ssok: 1
    //             }
    //         });
    //         let ip = this.connection.clientAddress;
    // 
    // 
    //         if (company.ssok === workerRel.owner) {
    //             console.log("access granted to own items");
    //             return Items.find({
    //                 owner: company._id
    //             }, {
    //                 fields: {
    //                     owner: false
    //                 }
    //             });
    //         } else {
    //             console.log("ACCESS DENIED : Attempt logged to ip ", ip);
    //             Logs.insert({
    //                 type: 'ACCESS_DENIAL',
    //                 user: this.userId,
    //                 ip: ip,
    //                 createdAt: new Date()
    //                     .valueOf(),
    //                 affects: company._id,
    //                 details: 'items.own publication denied due to keys inconsistency'
    //             });
    //             this.ready();
    //         }
    //     });
    return Items.find({owner:workfor});
    });
Meteor.publish('items.test',
    function() {
    //     this.autorun(function(computation) {
    //         let workerRel = Rels.findOne(workerRelId, {
    //             fields: {
    //                 owner: 1
    //             }
    //         });
    //         let company = Companies.findOne(workfor, {
    //             fields: {
    //                 ssok: 1
    //             }
    //         });
    //         let ip = this.connection.clientAddress;
    // 
    // 
    //         if (company.ssok === workerRel.owner) {
    //             console.log("access granted to own items");
    //             return Items.find({
    //                 owner: company._id
    //             }, {
    //                 fields: {
    //                     owner: false
    //                 }
    //             });
    //         } else {
    //             console.log("ACCESS DENIED : Attempt logged to ip ", ip);
    //             Logs.insert({
    //                 type: 'ACCESS_DENIAL',
    //                 user: this.userId,
    //                 ip: ip,
    //                 createdAt: new Date()
    //                     .valueOf(),
    //                 affects: company._id,
    //                 details: 'items.own publication denied due to keys inconsistency'
    //             });
    //             this.ready();
    //         }
    //     });
    return Items.find();
    });
