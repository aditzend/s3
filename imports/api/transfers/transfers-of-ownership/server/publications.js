import {
    Meteor
}
from 'meteor/meteor';

// 
// import {
//   Companies
// }
// from '../companies.js';
// Meteor.publish("companies.public", function companiesPublic() {
//     return Companies.find({}, {
//         fields: {
//             ssok: false
//         }
//     });
// });
Meteor.publish('transfers_of_ownership.test', function transfers_of_ownershipTest() {
    if (this.userId) {
        return TransfersOfOwnership.find();
    } else {
        this.ready();
    }

});
