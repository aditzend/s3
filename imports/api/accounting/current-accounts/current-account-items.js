CurrentAccountItems = new Mongo.Collection('current_account_items');
CurrentAccountItems.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
