import {
    Meteor
}
from 'meteor/meteor';


import {
    Template
}
from 'meteor/templating';
import {
    Mongo
}
from 'meteor/mongo';
import {
    Tracker
}
from 'meteor/tracker';


import {
    FlowRouter
}
from 'meteor/kadira:flow-router';

// import '../components/person/person-show.js';
// import '../components/person/person-show-work.js';
// import '../components/company/company-show.js';
import '/imports/api/users/methods.js';



import './profile-new-page.html';



Template.Profile_new_page.onCreated(function profileNewPageOnCreated() {
    this.state = new ReactiveDict();
    this.state.setDefault({
        editing: false,

    });
});



Template.Profile_new_page.helpers({
    personArgs() {
        const instance = Template.instance();
        return {
            onPersonData(personData) {
                console.log("personData", personData);

            },
            onSavedData(finished) {
                instance.state.set('editing', false);
            },
            onCancel(finished) {
                instance.state.set('editing', false);
            }

        }
    }

});

Template.Profile_new_page.events({
    'click .js-create-person': function() {
        let person = {
            name: 'Alstion'
        };
        Meteor.call('createPerson', person, function(error, result) {
            if (error) {
                console.log("ERROR:", error);

            } else {
                Meteor.call('updateRelatedPersonInUser', result);
            }
        });

    }


});
