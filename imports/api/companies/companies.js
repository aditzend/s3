Companies = new Mongo.Collection('companies');
Companies.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
    doc.counters = {
      deliveryNotePrefix: '0001',
deliveryNoteNumber:0,
receiptPrefix:'0001',
receiptNumber:0,
orderNumber:0,
invoiceNumber:0
    };
});
