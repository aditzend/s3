Invoices = new Mongo.Collection('invoices');
Invoices.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});