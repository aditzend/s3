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
Meteor.publish('accountingAccounts.test', function accountingAccountsTest() {
    if (this.userId) {
        return AccountingAccounts.find();
    } else {
        this.ready();
    }

});
