OrderDetails = new Mongo.Collection('order_details');
OrderDetails.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
