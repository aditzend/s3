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
Meteor.publish('profit_centers.test', function profitCentersTest() {
    if (this.userId) {
        return ProfitCenters.find();
    } else {
        this.ready();
    }

});
