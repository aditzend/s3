Items = new Mongo.Collection('items');
Items.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
