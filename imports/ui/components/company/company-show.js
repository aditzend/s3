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

import './company-show.html';


Template.Company_show.onCreated(function() {
    this.state = new ReactiveDict();
    this.state.setDefault({
        showingOptionButtons: false,
        expanded: false
    });
});

Template.Company_show.helpers({
    showingOptionButtons() {
        const instance = Template.instance();
        return instance.state.get('showingOptionButtons');
    },
    expanded() {
        const instance = Template.instance();
        return instance.state.get('expanded');
    }

});


Template.Company_show.events({
    'click .js-show-option-buttons': function(e, instance) {
        instance.state.set('showingOptionButtons', true);
    },
    'click .js-hide-option-buttons': function(e, instance) {
        instance.state.set('showingOptionButtons', false);
    },
    'click .js-expand': function(e, instance) {
        instance.state.set('expanded', true);


    },
    'click .js-compress': function(e, instance) {
        instance.state.set('expanded', false);


    },
    'click .js-delete': function(e, instance) {
        instance.data.onDelete(instance.data.company._id);
    },
    'click .js-edit': function(e, instance) {
        instance.data.onEdit(instance.data.company._id);

    }

});
