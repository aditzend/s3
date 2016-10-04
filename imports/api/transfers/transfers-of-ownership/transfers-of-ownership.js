TransfersOfOwnership = new Mongo.Collection('transfers_of_ownership');
TransfersOfOwnership.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
