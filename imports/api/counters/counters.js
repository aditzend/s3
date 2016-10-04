Counters = new Mongo.Collection('counters');
Counters.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});

