Places = new Mongo.Collection('places');
Places.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
