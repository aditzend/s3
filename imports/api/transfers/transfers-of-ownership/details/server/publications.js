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
Meteor.publish('transfer_of_ownership_details.test', function transfers_of_ownershipTest() {
    if (this.userId) {
        return TransferOfOwnershipDetails.find();
    } else {
        this.ready();
    }

});
