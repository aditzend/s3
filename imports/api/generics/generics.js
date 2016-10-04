Generics = new Mongo.Collection('generics');
Generics.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
