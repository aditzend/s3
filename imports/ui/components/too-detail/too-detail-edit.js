import './too-detail-edit.html';

// 
// 'click .js-cancel-item': function(e, instance) {
// 
//     //instance.state.set('selectedProduct', false);
//     instance.state.set('sellingItemName', false);
//     console.log('cancel');
// 
// },
Template.TooDetailEdit.events({
  'click .js-add-item': function(e, instance) {

      const expectedDate = instance.$('.js-expected-date')
          .val() || 0;
      const amount = instance.$('.js-amount')
          .val() || 0;
      const price = instance.$('.js-price')
          .val() || 0;

      const discount = instance.$('.js-discount')
          .val() || 0;
      const taxes = instance.$('.js-taxes')
          .val() || 0;

    instance.data.onAddItem(expectedDate,amount,price,discount,taxes);
  },
  'click .js-cancel-item' : function(e,instance) {
    instance.data.onCancelItem();
  }
});

      // const tood = {
      //                 order: instance.state.get('orderId'),
      //                 owner: workforId(),
      //                 item: instance.state.get('sellingItemId'),
      //                 profitCenter: instance.state.get('sellingItemProfitCenter'),
      //                 amount: amount,
      //                 price: price,
      //                 discount: discount,
      //                 taxes: taxes
      //               };
                    //console.log("tood:", tood);
        // let newOrderDetail;            
  //     Meteor.call('createOrderDetail', tood, function(error, res){
  //       if (error) {
  //         console.log("Error inserting order detail", Meteor.error);
  //       }else{
  //         console.log("order detail id is ", res);
  //         newOrderDetail = res;
  //         
  //         //create methods for all these...
  //         
  //         Orders.update({_id: instance.state.get('orderId')},
  //                         {$push: {
  //                           soldProducts : {
  //                             orderDetailId: newOrderDetail,
  //                             item: instance.state.get('sellingItemId'),
  //                             itemName: instance.state.get('sellingItemName'),
  //                             itemDesc: instance.state.get('sellingItemDesc'),
  //                             profitCenter: instance.state.get('sellingItemProfitCenter'),
  //                           
  //                             amount: amount,
  //                             price: price,
  //                             discount: discount,
  //                             taxes: taxes,
  //                             createdAt: moment().format(),
  //                             author: Meteor.userId(),
  //                             authorName: Meteor.user().name,
  //                             authorLastName: Meteor.user().lastName
  //                           }
  //                         }});
  //         AccountingAccounts.insert({
  //             name: 'vatPayable', //iva debito
  //             owner: workforId(),
  //             value: amount * price * (1 - discount * 0.01) * taxes * 0.01,
  //             orderDetail: newOrderDetail
  //         
  //         });
  //         AccountingAccounts.insert({
  //             name: 'owes', //clientBalance o saldo cuenta corriente del cliente
  //             destiny: workforId(),
  //             origin: company,
  //             owner: workforId(),
  //             value: amount * price * (1 - discount * 0.01) * (1 + taxes * 0.01),
  //         
  //             dueDate: moment()
  //                 .add(1, 'days')
  //                 .format(),
  //             paid: false,
  //             orderDetail: newOrderDetail
  //         
  //         });
  //       }
  //       }
  //     );
  //     
  //     
  //   
  //     
  //   
  //     instance.state.set('sellingItemName', false);
  // 
  // },
  


