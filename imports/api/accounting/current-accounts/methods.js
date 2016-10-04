//current account methods
Meteor.methods({
  createCurrentAccountItem(
    origin,
    destiny,
    invoiceId,
    grandTotal,
    taxTotal,
    dueDate
  ){
    const itemId = CurrentAccountItems.insert({
      origin: origin,//the company that will receive money
      destiny: destiny,//the company that must pay
      invoice: invoiceId,
      grandTotal: grandTotal,
      taxTotal: taxTotal,
      dueDate: dueDate,
      open: true, 
      applications: []
    });
    console.log("NEW CURRENT ACCOUNT ITEM", itemId);
    
    return itemId;
    
  }
})