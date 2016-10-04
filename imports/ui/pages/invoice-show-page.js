import './invoice-show-page.html';

Template.Invoice_show_page.onCreated( function() {
  this.state = new ReactiveDict();
  const w = workfor();
  this.autorun( () => {
    let invoiceSubscription =
     this.subscribe(
       'Invoices.origin',
       w._id
     );
  //   if (invoiceSubscription.ready()) {
  //     this.data = Invoices.findOne(
  //       FlowRouter.getParam('_id')
  //     );
  //     console.log('invoice found', this.data);
  //   }
  //   
  //   
   });
});

Template.Invoice_show_page.helpers ({
  invoice() {
    return Invoices.findOne(
      FlowRouter.getParam('_id')
    );
  }
});