TransferOfOwnershipDetails = new Mongo.Collection('transfer_of_ownership_details');
TransferOfOwnershipDetails.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
