CostCenters = new Mongo.Collection('cost_centers');
CostCenters.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();
});
