//current account items publications
import {
    Meteor
}
from 'meteor/meteor';

Meteor.publish('CurrentAccountItems.origin', 
function CurrentAccountItemsOrigin(originId) {
    if (this.userId) {
        return CurrentAccountItems.find({
          origin: originId
        });
    } else {
        this.ready();
    }

});
