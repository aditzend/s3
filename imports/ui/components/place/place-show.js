import './place-show.html';
// 
// Template.Place_show.onCreated(function() {
// 
//     this.autorun(() => {
//         this.subscribe('Places.byRelatedActode', FlowRouter.getParam('_id'));
//     });
// 
// });

Template.Place_show.onCreated(function() {

    this.state = new ReactiveDict();
    this.state.setDefault({
        showingOptionButtons: false,
        expanded: false
    });
});

/*Template.Place_show.onRendered( function() {
  Places.attachSchema(Schema.Place, {replace:true});
  console.log('Schema.Place attached');
});*/

Template.Place_show.helpers({

    showingOptionButtons() {
        const instance = Template.instance();
        return instance.state.get('showingOptionButtons');
    },
    expanded() {
        const instance = Template.instance();
        return instance.state.get('expanded');
    }
});


Template.Place_show.events({
    'click .js-delete': function(e, instance) {
        instance.data.onDelete(instance.data.rel._id);
    },
    'click .js-edit': function(e, instance) {
        instance.data.onEdit(instance.data.rel._id);

    },
    'click .js-expand': function(e, instance) {
        instance.state.set('expanded', true);


    },
    'click .js-compress': function(e, instance) {
        instance.state.set('expanded', false);


    },
    'click .js-show-option-buttons': function(e, instance) {
        instance.state.set('showingOptionButtons', true);
    },
    'click .js-hide-option-buttons': function(e, instance) {
        instance.state.set('showingOptionButtons', false);
    },
    "click [data-action=phone]": function() {
        Session.set('btn', true);
        setTimeout(function() {
            Session.set('btn', false);
        }, 100);
    },
    'click [data-action=edit]': function(e) {
        //
        if (Session.get('btn')) {
            console.log('btn tocado, no hago nada');
        } else {
            console.log('editing');
            Session.set('editing', this._id);
        }
        //

    },
    'click [data-action=delete-item]': function() {
        Session.set('btn', true);
        console.log('btn CLICK');
        setTimeout(function() {
            Session.set('btn', false);
            console.log('btn UNCLICK');
        }, 100);
        console.log('delete item...' + this._id);
        Places.remove(this._id);
        Session.set('deleting', false);
    }

});
