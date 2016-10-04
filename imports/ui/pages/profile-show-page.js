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

import '../components/person/person-show.js';
import '../components/person/person-show-work.js';
import '../components/company/company-show.js';
// import '../components/rel/validate-worker-rels.js';
import '/imports/api/users/methods.js';



import './profile-show-page.html';



Template.Profile_show_page.onCreated(function profileShowPageOnCreated() {
    this.state = new ReactiveDict();

    this.autorun(() => {
        this.subscribe('persons.own');
        // const rp = Meteor.user()
        //     .relatedPerson;
        // 
        // this.state.set('relatedPerson', rp);
        let userSub = this.subscribe('userData');

        if (userSub.ready()) {
            const rp = Meteor.user()
                .relatedPerson;
            Session.set('relatedPerson', rp);


        }

    });
});



Template.Profile_show_page.helpers({
    // adminOf() {
    //     let c = Meteor.call('ad');
    //     return c;
    // },
    relatedPersonId() {

        // let r = Meteor.users.findOne(Meteor.userId()).relatedPerson;
        return Session.get('relatedPerson');
        // let relatedPerson = Persons.findOne(r);


    },
    foo() {
        const instance = Template.instance();
        return Session.get('relatedPerson');
    },

    firstAccess() {
        const instance = Template.instance();
        // return true;
        return (Session.get('relatedPerson') === undefined) ? true : false;
    },
    person() {
        const instance = Template.instance();
        const result = Persons.findOne(Meteor.user()
            .relatedPerson);
        //console.log(result);

        return result;

    },


    personArgs(relatedPersonId) {
        const instance = Template.instance();
        const person = Persons.findOne(relatedPersonId);
        console.log('person ', person._id);
        console.log('person ', person.name);
        return {
            personReady: instance.subscriptionsReady(),
            person
        }
    },
    showWorkArgs(person) {


        return {
            person: person,
            foo: 'bar'
        };

    },
    createPersonArgs() {
        const instance = Template.instance();
        return {

            onSavedData(person) {
                //instance.state.set('editing', false);
                console.log("person object", person);
                Meteor.call('createPerson', person, function(error, result) {
                    if (error) {
                        console.log("ERROR:", error);

                    } else {
                        swal({
                            title: "Ok " + person.name,
                            text: "Creaste tu perfil!",
                            type: "success"
                        });
                        Meteor.call('updateRelatedPersonInUser', result);
                        instance.state.set('relatedPerson', result)
                    }
                });


            },
            onCancel(finished) {
                swal({
                    title: "Necesitas crear un perfil para continuar !",

                    type: "warning"
                });
                //instance.state.set('editing', false);
            },


        }
    }
});

Template.Profile_show_page.events({


});
