// import {
//     Meteor
// }
// from 'meteor/meteor';
// 
// 
// import {
//     Template
// }
// from 'meteor/templating';
// import {
//     Mongo
// }
// from 'meteor/mongo';
// import {
//     Tracker
// }
// from 'meteor/tracker';
// 
// import {
//     ReactiveDict
// }
// from 'meteor/reactive-dict';
// 
// import {
//     FlowRouter
// }
// from 'meteor/kadira:flow-router';

import './item-show.html';
import './item-edit.js';

Template.Item_show.onCreated(function() {

    this.state = new ReactiveDict();
    this.state.setDefault({
        showingOptionButtons: false,
        expanded: false
    });
});


Template.Item_show.helpers({
    showingOptionButtons() {
        const instance = Template.instance();
        return instance.state.get('showingOptionButtons');
    },
    expanded() {
        const instance = Template.instance();
        return instance.state.get('expanded');
    },
    foo() {
        const instance = Template.instance();
        return instance.data.foo;
    }
});

Template.Item_show.events({
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
        instance.data.onDelete(instance.data.item._id);
    },
    'click .js-edit': function(e, instance) {
        instance.data.onEdit(instance.data.item._id);

    }

});
