GeneralLedger = new Mongo.Collection('general_ledger');
GeneralLedger.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});