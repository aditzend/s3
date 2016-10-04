import './deliveries-panel.html';

Template.Deliveries_panel.onCreated(function() {
  this.state = new ReactiveDict();
  
  this.autorun( () => {
    let w = workfor();
    let deliveryNotesSubscription = this.subscribe('DeliveryNotes.origin',w._id);
  });
  
  this.state.setDefault({
    editingDeliveryId:false,
    creatingDelivery:false,
    // creatingInvoice:false
  });
});

Template.Deliveries_panel.helpers({ 
  // creatingInvoice() {
  //   return Template.instance().state.get('creatingInvoice');
  // },

  pathForShowDeliveryNote(id) {
      const params = {_id: id};
      const queryParams = {
          // state: 'open'
      };
      const routeName = 'showDeliveryNote';
      const path = FlowRouter.path(routeName, params, queryParams);

      return path;
  },

  formatAsNumber(number) {
    return numeral(number).format('0,0');
  },
  // timeFromCreation(createdAt) {
  // 
  //     return moment(createdAt).fromNow();
  // 
  // },
  remainingDeliveries(amount,deliveries) {

    for (i=0, len = deliveries.length, sum = 0; i < len; i++){
      sum += Number(deliveries[i].amount);
      //console.log("sum is now", sum);
      
    };
    return amount - sum;
    
    
    
    //return deliveries.length;
  },
  editingDelivery() {
    const instance = Template.instance();
    
    return DeliveryNotes.findOne({_id:instance.state.get('editingDeliveryId')});
  },
  deliveryNotes() {
    const instance = Template.instance();
    
    return DeliveryNotes.find({orderId:instance.data.orderId});
  },
  creatingDelivery() {
    const instance = Template.instance();
    console.log('CREATIN DELIVERY? :',instance.state.get('creatingDelivery') );
    return instance.state.get('creatingDelivery');
    
  },
  sumAllDeliveries(deliveries) {

    for (i=0, len = deliveries.length, sum = 0; i < len; i++){
      sum += Number(deliveries[i].amount);
      //console.log("sum is now", sum);
      
    };
    return sum;
    
    
    
    //return deliveries.length;
  },
}); 

Template.Deliveries_panel.events({ 
  'click .js-add-item-to-delivery': function(e,instance) {
    console.log("index", e.target.id);
    Meteor.call('addDeliveryItemToOrder',instance.state.get('orderId'),e.target.id,100)
    ;

    
  },
  'submit .js-add-item-to-delivery-form': function(e,instance) {
    e.preventDefault();
    const invoiced = false;
    const item = {itemId:e.target.id,
                  itemName:e.target.name,
                  packaging:e.target.packaging.value,
                  amount:e.target.amount.value,
                invoiced:invoiced};
    console.log("amount", e.target.amount.value);
    // Meteor.call('addDeliveryItemToOrder',instance.state.get('orderId'),instance.state.get('editingDeliveryId'),e.target.id,e.target.amount.value,e.target.packaging.value,invoiced)
    // ;
     Meteor.call('updateDeliveryNote',instance.state.get('editingDeliveryId'),item);
    
  },
  'click .js-confirm-delivery': function(e,instance) {
    // Meteor.call('propagateDeliveryToOrder',
    //                       instance.data.orderId,
    //                     instance.state.get('editingDeliveryId')
    //                     );
    instance.state.set('editingDeliveryId', false);
    instance.state.set('creatingDelivery',false);
    
  
  },
  // 'click .js-create-invoice': function(e,instance) {
  //   const w = workfor();
  //   instance.state.set('creatingInvoice',true);
  //   
  // },
  'click .js-create-delivery': function(e,instance) {
    const w = workfor();
    instance.state.set('creatingDelivery',true);
    
    Meteor.call('createDeliveryNote',
    instance.data.orderId, 
    'LINE83dvrspnl',
    w._id,
  instance.data.destiny,
  function (err,res) {
    if (err) {
      console.log("ERROR", err);
    }
    else{
      console.log("new delivery ",res);
      instance.state.set('editingDeliveryId',res);
      instance.state.set('creatingDelivery',true);
 
      
    }
  }
  
  );
  
    //version con metodos sincronicos
    
    // const newDeliveryNote = Meteor.call('createDeliveryNote',
    //                           instance.data.orderId, 
    //                             'LINE83dvrspnl',
    //                             w._id,
    //                           instance.data.destiny,
    //                           );
  // 
  // const propagated = Meteor.call('propagateDeliveryToOrder',
  //                       instance.data.orderId,
  //                     '234'
  //                     );
    
    
  }
}); 
