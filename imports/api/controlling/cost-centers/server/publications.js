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
Meteor.publish('cost_centers.test', function costCentersTest() {
    if (this.userId) {
        return CostCenters.find();
    } else {
        this.ready();
    }

});
