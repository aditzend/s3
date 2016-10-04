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
Meteor.publish('DeliveryNotes.origin', function deliveryNotesOrigin(originId) {
    if (this.userId) {
        return DeliveryNotes.find({
          origin:originId
        });
    } else {
        this.ready();
    }

});
Meteor.publish('DeliveryNotes.destiny', function deliveryNotesDestiny(destinyId) {
    if (this.userId) {
        return DeliveryNotes.find({
          destiny:destinyId
        });
    } else {
        this.ready();
    }

});