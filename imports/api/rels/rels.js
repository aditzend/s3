import {
    Mongo
}
from 'meteor/mongo';




Rels = new Mongo.Collection('rels');
Rels.before.insert(function(userId, doc) {
    doc.createdAt = moment()
        .format();
    doc.author = Meteor.userId();

});
