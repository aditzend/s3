AccountingAccounts = new Mongo.Collection('accounting_accounts');
AccountingAccounts.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
