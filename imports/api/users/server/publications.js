// api/users/server
Meteor.publish(null, function() {
    if (this.userId) {
        return Meteor.users.find({
            _id: this.userId
        }, {
            fields: {
                'emails': 1,
                'relatedPerson': 1,
                'admins': 1,
                'name': 1,
                'lastName': 1,
                'isSuperAdmin': 1,
                'jobs': 1,
                'isMale': 1
            }
        });
    } else {
        this.ready();
    }
});
Meteor.publish('userData', function() {
    if (this.userId) {
        return Meteor.users.find({
            _id: this.userId
        }, {
            fields: {
                'emails': 1,
                'relatedPerson': 1,
                'admins': 1,
                'name': 1,
                'lastName': 1,
                'isSuperAdmin': 1,
                'jobs': 1,
                'isMale': 1
            }
        });
    } else {
        this.ready();
    }
});
