import './cash-flow-panel.html';

Template.Cash_flow_panel.onCreated( function() {
  const w = workfor();
  this.autorun( () => {
    let CurrentAccountItemsSubscription =
    this.subscribe(
      'CurrentAccountItems.origin',
      w._id
    )
  });
});


Template.Cash_flow_panel.helpers({ 
  CurrentAccountItems() {
    return CurrentAccountItems.find({open:true});
  }
}); 

Template.Cash_flow_panel.events({ 

}); 
