ProfitCenters = new Mongo.Collection('profit_centers');
ProfitCenters.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
