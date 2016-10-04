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
Meteor.publish('Invoices.origin', function invoicesOrigin(originId) {
    if (this.userId) {
        return Invoices.find({ origin: originId}
        );
    } else {
        this.ready();
    }

});
Meteor.publish('Invoices.ofThisOrder', function invoicesOrigin(originId, orderId) {
    if (this.userId) {
        return Invoices.find({ origin: originId, order: orderId}
        );
    } else {
        this.ready();
    }

});
Meteor.publish('Invoices.destiny', function invoicesDestiny(destinyId) {
    if (this.userId) {
        return Invoices.find({ destiny: destinyId}
        );
    } else {
        this.ready();
    }

});
