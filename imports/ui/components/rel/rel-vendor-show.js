import './rel-vendor-show.html';

Template.Rel_vendor_show.onCreated(function() {
    this.state = new ReactiveDict();

    this.state.setDefault({
        showingOptionButtons: false
    });
});

Template.Rel_vendor_show.helpers({
    showingOptionButtons() {
        const instance = Template.instance();
        return instance.state.get('showingOptionButtons');
    }
});

Template.Rel_vendor_show.events({
    'click .js-show-option-buttons': function(e, instance) {
        instance.state.set('showingOptionButtons', true);
    },
    'click .js-hide-option-buttons': function(e, instance) {
        instance.state.set('showingOptionButtons', false);
    },
    'click .js-edit': function(e, instance) {
        instance.data.onEdit(instance.data.rel._id);
    }

});
