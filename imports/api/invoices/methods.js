Meteor.methods({
  createInvoice(orderId,destinysOrderNumber,originId,destinyId) {
    if (this.userId) {
      let newInvoice = '';
      Meteor.call('getNumber',originId,'invoiceNumber', function(err,res){
        if (err) {
          console.log(err);
        }else{
          console.log('INVOICE NUMBER: ', res);
          newInvoice = Invoices.insert({
            order: orderId,
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
      return newInvoice;
    } else {
      throw new Meteor.Error('ERR100 USER MUST LOG IN', "log in first");
    }
  },
  propagateInvoiceToOrder(orderId,invoiceId) {
    Orders.update({_id:orderId},{
      $push: {
        invoices:{
          invoiceId:invoiceId,
          invoiced:false
        }
      }
    })
  },
  pushItemsToInvoice(id,itemsObj) {
    if (this.userId) {
      Invoices.update({_id:id},
      {$push:{
        details: itemsObj
      }
    });
    }else {
      throw new Meteor.Error('ERR100 USER MUST LOG IN', "log in first");
    }
  }, 
  updateInvoice(id,pos,type,details,relatedDeliveryNotes) {
    if (this.userId) {
      Invoices.update({_id:id},
      {$set:{
        type: type,
        pos: pos,
        details: details,
        relatedDeliveryNotes: relatedDeliveryNotes
      }
    });
    }else {
      throw new Meteor.Error('ERR100 USER MUST LOG IN', "log in first");
    }
  },
  removeInvoice(id) {
    if (this.userId) {
      Invoices.remove({_id:id});
      Meteor.call('subtractNumber','invoiceNumber');
      
    }else {
      throw new Meteor.Error('ERR100 USER MUST LOG IN', "log in first");
    }
  } 
});



// Meteor.methods({
//   createInvoice(invoice) {
//     if (this.userId) {
//       return Invoices.insert(invoice);
//     }else{
//       throw new Meteor.Error('error');
//     }
//   },
//   propagateInvoiceToOrder(orderId,invoiceId,invoice) {
//     let inv = invoice;
//     inv.invoiceId = invoiceId;
//     if (this.userId) {
//       Orders.update({_id:orderId},{$push:{
//         invoices:{inv}
//       }});
//     }else{
//       throw new Meteor.Error('error');
//     }
//   }
// });