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
Meteor.publish('OrderDetails.test', function OrderDetailsTest() {
    if (this.userId) {
        return OrderDetails.find({
          
        });
    } else {
        this.ready();
    }

});
Meteor.publish('OrderDetails.own', function OrderDetailsOwn(ownerId) {
    if (this.userId) {
        return OrderDetails.find({
          owner: ownerId
        });
    } else {
        this.ready();
    }

});
