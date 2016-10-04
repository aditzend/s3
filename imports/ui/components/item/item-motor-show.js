

import './item-motor-show.html';
import './item-motor-edit.js';

Template.Item_motor_show.onCreated(function() {

    this.state = new ReactiveDict();
    this.state.setDefault({
        showingOptionButtons: false,
        expanded: false
    });
});


Template.Item_motor_show.helpers({
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

Template.Item_motor_show.events({
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
