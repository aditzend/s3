import './rel-customer-show.html';

Template.Rel_customer_show.onCreated(function() {
    this.state = new ReactiveDict();
    this.state.setDefault({
        showingOptionButtons: false
    });
});

Template.Rel_customer_show.helpers({
    risk(paymentBehavior, riskValue) {
        return (paymentBehavior === riskValue) ? true : false;
    },
    showingOptionButtons() {
        const instance = Template.instance();
        return instance.state.get('showingOptionButtons');
    }
});

Template.Rel_customer_show.events({
    'click .js-show-option-buttons': function(e, instance) {
        instance.state.set('showingOptionButtons', true);
    },
    'click .js-hide-option-buttons': function(e, instance) {
        instance.state.set('showingOptionButtons', false);
    },
    'click .js-edit': function(e, instance) {
        instance.data.onRCS_edit(instance.data.rel._id);
    }

});
