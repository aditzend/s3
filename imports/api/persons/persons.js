Persons = new Mongo.Collection('persons');
Persons.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
