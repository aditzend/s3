import './invoices-panel.html';
import '/imports/ui/components/invoice/invoice-edit.js';


Template.Invoices_panel.onCreated( function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    creatingInvoice: false,
    editingInvoiceId: false
  });
  const w = workfor();
  this.autorun( () => {
    let deliveryNotesSubscription = 
      this.subscribe(
        'DeliveryNotes.origin',
        w._id
      );
    let invoicesSubscription =
      this.subscribe(
        'Invoices.ofThisOrder',
        w._id,
        FlowRouter.getParam('_id')
      );
  });
  
  
  
});

Template.Invoices_panel.helpers({
  // paymentDays() {
  //   const instance = Template.instance();
  //   return instance.data.order.paymentDays;
  // },
  // paymentMethodDays() {
  //   const instance = Template.instance();
  //   return instance.data.order.paymentMethodDays;
  // },
  pathForShowInvoice(id) {
    const routeName = 'showInvoice';
    const params = { _id: id};
    const queryParams = {
        // state: 'open'
    };
    const path = FlowRouter.path(routeName, params, queryParams);
    
    return path;
  },
  invoices() {
    return Invoices.find();
  },


  creatingInvoice() {
    const instance = Template.instance();
    
    return instance.state.get('creatingInvoice');
  },
  createInvoiceArgs(order) {
    const instance = Template.instance();
    const w = workfor();
    return {
      soldProducts: order.soldProducts,
      orderId: order._id,
      onSavedData(formData) {
        const invoiceId = instance.state.get('editingInvoiceId');
        const pos = formData.pos;
        const type = formData.type;
        const details = formData.details;
        const relatedDeliveryNotes = formData.relatedDeliveryNotes;
        //change this
        const dueDate = moment().add(90,'days').format();
        console.log("INVOICE TOTAL:", formData.grandTotal);
        console.log("INVOICE TOTAL TAX:", formData.taxTotal);
      
        Meteor.call('createCurrentAccountItem',
          w._id,//origin
          "sowuAKD92TCiX4eaK", //APRON id
          invoiceId,
          formData.grandTotal,
          formData.taxTotal,
          dueDate
        );
    
        
        Meteor.call('updateInvoice',
          invoiceId,pos,type,
          details,relatedDeliveryNotes);
        
        for (i = 0; i < relatedDeliveryNotes.length; i++) {
          Meteor.call('updateRelatedInvoiceToDN',relatedDeliveryNotes[i]);
        };
        
        Meteor.call('pushItemsToInvoice',invoiceId,details);
        
        
        instance.state.set('creatingInvoice',false);
        
      },
      onCancel() {
        // Meteor.call('removeInvoice',instance.state.get('editingInvoiceId'));
        instance.state.set('creatingInvoice',false);
        
      }
    }
  }
});

Template.Invoices_panel.events({
  'click .js-create-invoice': function(e,instance) {
          // instance.state.set('creatingInvoice',true);
    
    const w = workfor();
    Meteor.call('createInvoice',
      instance.data.orderId, 
      'na',
      w._id,
      instance.data.destiny,
      function (err,res) {
        if (err) {
          console.log("ERROR", err);
        }else{
          console.log("new invoice ",res);
          instance.state.set('creatingInvoice',true);
          instance.state.set('editingInvoiceId',res);
          
        }
      }
    );
  }
})