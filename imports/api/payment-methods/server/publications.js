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
Meteor.publish('PaymentMethods.test', function paymentMethodsTest() {
    if (this.userId) {
        return PaymentMethods.find();
    } else {
        this.ready();
    }

});
