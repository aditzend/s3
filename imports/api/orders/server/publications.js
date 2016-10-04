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
Meteor.publish('Orders.test', function ordersTest() {
    if (this.userId) {
        return Orders.find();
    } else {
        this.ready();
    }

});
Meteor.publish('Orders.own', function ordersOwn(ownerId) {
    if (this.userId) {
        return Orders.find({
          owner:ownerId
        });
    } else {
        this.ready();
    }

});
