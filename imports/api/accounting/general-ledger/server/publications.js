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
Meteor.publish('GeneralLedger.own', function generalLedgerOwn(ownerId) {
    if (this.userId) {
        return GeneralLedger.find({
          owner: ownerId
        });
    } else {
        this.ready();
    }

});
