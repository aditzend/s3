Meteor.publish(null,
    function() {
        if (this.userId) {
            return Places.find();
        } else {
            this.ready();
        }
    });
