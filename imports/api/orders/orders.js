Orders = new Mongo.Collection('orders');
Orders.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
    doc.authorName = Meteor.user()
        .name;
    doc.authorLastName = Meteor.user()
        .lastName;
});
