import './invoice-detail-edit.html';

Template.Invoice_detail_edit.onCreated( function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    saved: false
  });
});

Template.Invoice_detail_edit.helpers({ 
  saved() {
    const instance = Template.instance();
    return instance.state.get('saved');
  }
}); 

Template.Invoice_detail_edit.events({ 
'submit form': function(e,instance) {
  e.preventDefault();
  const ii = {
    itemId: instance.data.detail.itemId,
    itemName: instance.data.detail.itemName,
    amount: instance.data.detail.amount,
    price: e.target.price.value,
    discount: e.target.discount.value,
    taxes: e.target.taxes.value
  };
  instance.data.onSavedData(ii, instance.data.delivery);
  instance.state.set('saved',true);
},
'click .js-edit-detail': function(e,instance) {
  instance.state.set('saved',false);
}
}); 
