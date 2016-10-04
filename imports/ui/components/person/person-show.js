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
    ReactiveDict
}
from 'meteor/reactive-dict';

import {
    FlowRouter
}
from 'meteor/kadira:flow-router';

import './person-show.html';
import './person-edit.js';


Template.Person_show.onCreated(function() {
    this.state = new ReactiveDict();
    this.state.setDefault({
        editing: false
    });
    //  console.log(this.data);
});

Template.Person_show.helpers({
    editing() {
        const instance = Template.instance();
        return instance.state.get('editing');
    },
    displaying() {
        const instance = Template.instance();
        return !instance.state.get('editing');
    },
    personArgs(person) {
        const instance = Template.instance();
        return {
            person,
            onSavedData(person) {
                instance.state.set('editing', false);
                const rp = Session.get('relatedPerson');
                Meteor.call('updatePerson', rp, person, function(error, result) {
                    if (error) {
                        console.log("ERROR:", error);

                    } else {
                        swal({
                            title: "Ok " + person.name,
                            text: "Actualizaste tu perfil!",
                            type: "success"
                        });

                    }
                });
                

            },
            onCancel(finished) {
                instance.state.set('editing', false);
                swal({
                    title: "Operacion cancelada",
                    text: "Tu perfil no se actualizo",
                    type: "error"
                });
            }

        }
    }
});

Template.Person_show.events({
    'click .js-edit': function(e, instance) {
        instance.state.set('editing', true);
    }
});
