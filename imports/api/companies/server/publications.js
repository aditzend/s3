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
Meteor.publish(null, function companiesNames() {
    if (this.userId) {
        return Companies.find({}, {
            fields: {
                name: 1,
                _id: 1,
                fin: 1,
                finType: 1,
                logo: 1,
                country: 1,
                counters: 1
            }
        });
    } else {
        this.ready();
    }

});
