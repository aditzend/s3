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
Meteor.publish('Orders.test', function OrdersTest() {
    if (this.userId) {
        return Orders.find();
    } else {
        this.ready();
    }

});
