Meteor.methods({
  createDeliveryNote(orderId,destinysOrderNumber,originId,destinyId) {
    if (this.userId) {
      let newDeliveryNote = '';
      Meteor.call('getNumberWithPrefix',originId,'deliveryNoteNumber','deliveryNotePrefix', function(err,res){
        if (err) {
          console.log(err);
        }else{
          console.log('DELIVERY NUMBER: ', res);
          newDeliveryNote = DeliveryNotes.insert({
            orderId: orderId,
            number: res,
            destinysOrderNumber:destinysOrderNumber,
            origin: originId,
            destiny: destinyId,
            details: [],
            author: this.userId,
            createdAt: moment().format()
          });
        }
      })
      return newDeliveryNote;
    } else {
      throw new Meteor.Error('ERR100 USER MUST LOG IN', "log in first");
    }
  },
  deliveryNoteNumber(originId) {
    console.log('DELIVERY NOTE NUMBER', originId);
    
    return '0001-00003425';
  },
  propagateDeliveryToOrder(orderId,deliveryId) {
    Orders.update({_id:orderId},{
      $push: {
        deliveries:{
          deliveryId:deliveryId,
          invoiced:false
        }
      }
    })
  },
  updateRelatedInvoiceToDN(id) {
    if (this.userId){
      DeliveryNotes.update({_id: id},
        {$set:
          {invoiced:
             {
               createdAt: moment().format(),
               author: this.userId,
            }
          }
        }
      );
      
    }
  },
  updateDeliveryNote(id,itemObj) {
    if (this.userId) {
      DeliveryNotes.update({_id:id},
      {$push:{
        details: itemObj
      }
    });
    }else {
      throw new Meteor.Error('ERR100 USER MUST LOG IN', "log in first");
    }
  } 
});

