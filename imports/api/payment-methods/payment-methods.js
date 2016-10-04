PaymentMethods = new Mongo.Collection('payment_methods');
PaymentMethods.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
