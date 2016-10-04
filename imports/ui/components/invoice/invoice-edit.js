import './invoice-edit.html';
import './invoice-detail-edit.js';

Template.Invoice_edit.onCreated( function() {
  this.state = new ReactiveDict();
  console.log("orderId received at invoice edit",
  this.data.orderId);
  
  this.state.set('invoiceItems', []);
  this.state.set('relatedDeliveryNotes', []);
  this.state.set('grandTotal', 0);
  this.state.set('taxTotal', 0);
  const w = workfor();
  this.autorun( () => {
    let deliveryNotesSubscription =
     this.subscribe(
       'DeliveryNotes.origin',
       w._id
     );
    
  });
});

Template.Invoice_edit.helpers({

  invoiceItems() {
    const instance = Template.instance();
    return instance.state.get('invoiceItems');
  },
  totals() {
    const instance = Template.instance();
    const items = instance.state.get('invoiceItems');
    let sum = 0;
    let taxes = 0;
    for (i=0;i < items.length; i++) {
      // console.log("item:", items[i].amount);
      const item = items[i];
      sum += item.amount * item.price * (1-item.discount/100) * (1 + item.taxes/100);
      taxes += item.amount * item.price * (1-item.discount/100) * (item.taxes/100);
    };
    instance.state.set('grandTotal',sum);
    instance.state.set('taxTotal',taxes);
    
    return {
            grandTotal:sum,
            taxes: taxes
          };
  },
  invoiceDetailArgs(detail, deliveryId) {
    const instance = Template.instance();
    return {
      detail: detail,
      delivery: deliveryId,
      onSavedData(invoiceItem, deliveryId) {
        rdn = instance.state.get('relatedDeliveryNotes');
        rdn.push(deliveryId);
        instance.state.set('relatedDeliveryNotes',rdn);
        iis = instance.state.get('invoiceItems');
        iis.push(invoiceItem);
        instance.state.set('invoiceItems', iis);
        // console.log('data.invoiceitems', instance.data.invoiceItems);
      }
    }
  },

  
  unInvoicedDeliveries() {
    return DeliveryNotes.find({
      // orderId:'DvWFNrEEtDrt4FoGy',
      orderId:Template.instance().data.orderId,
      // invoiced:false
    });
  },
  // soldProducts() {
  //   const instance = Template.instance();
  //   return instance.data.soldProducts;
  // },
    timeFromCreation(createdAt) {
    
        return moment(createdAt).fromNow();
    
    }
});

Template.Invoice_edit.events({
  'submit form': function(e,instance) {
    e.preventDefault();
    const formData = {
      pos: e.target.pos.value,
      type: e.target.type.value,
      details: instance.state.get('invoiceItems'),
      relatedDeliveryNotes: instance.state.get('relatedDeliveryNotes'),
      grandTotal: instance.state.get('grandTotal'),
      taxTotal: instance.state.get('taxTotal')
    };
    instance.data.onSavedData(formData);  
  },
  'click .js-toggle-delivery': function(e,instance) {
    
    console.log("show", e.target.data-toggle);
    console.log("delivery id showing:", e.target.id);
    
    
  },

  'click .js-cancel': function(e,instance) {
    console.log('cancel invoice');
    instance.data.onCancel();
  }
});