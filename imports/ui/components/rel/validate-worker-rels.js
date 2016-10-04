import './validate-worker-rels.html';


Template.ValidateWorkerRels.onCreated(function() {
    // let admin = Meteor.call('rels.checkAdmin');
    // console.log(admin);

    // 
    this.state = new ReactiveDict();
    this.state.setDefault({
        editingWorkerRel: false

    });
    this.subscribe('companyWorkerRels');
    this.subscribe('userData');

    // let personId = this.data.person._id;
    // this.autorun(function() {
    //     let workRels = Rels.find({
    //         origin: personId,
    //         type: 'worker'
    //     });
    //     // let i = 0;
    //     // if (workRels.count() > 0) {
    //     //     i = workRels.count();
    //     //     this.state.set('positionCount', i);
    //     // } else {
    //     //     console.log('position count', 0);
    //     //     //console.log("state", this.state.get('foo'));
    //     // 
    //     // 
    //     //     // this.state.set('positionCount', false);
    //     // 
    //     // }
    // 
    // 
    // 
    // 
    // });




});

// Template.ValidateWorkerRels.onRendered(function() {
//     const instance = Template.instance();
// 
//     console.log('person id', instance.data.person);
// 
// });

Template.ValidateWorkerRels.helpers({

    jobs() {
        const admins = Meteor.user()
            .admins;
        return Rels.find({
            type: 'worker',
            destiny: admins,
            validated: false
        });
    },
    name(id) {
        const person = Persons.findOne(id);
        return person.name;
    },
    editingWorkerRel(id) {
        const instance = Template.instance();
        return (instance.state.get('editingWorkerRel') === id) ? true : false;
    }
});

Template.ValidateWorkerRels.events({
    // 'click .js-edit': function(e, instance) {
    //     instance.state.set('editing', true);
    // },
    'click .js-create-company': function(e, instance) {
        instance.state.set('creatingCompany', true);
    },
    'click .js-deselect-company': function(e, instance) {
        instance.state.set('selectedCompany', false);
    },
    'click .js-create-worker-rel': function(e, instance) {
        instance.state.set('creatingWorkRel', true);
        console.log("STATE>>>>>>>>> CREATING WORK REL");
    },
    'click .js-edit-worker-rel': function(e, instance) {
        console.log("EDIT>>>>>>>>> ");
    }


});

Template.ValidateWorkerRels.events({
    'click .js-edit': function(e, instance) {
        instance.state.set('editing', true);
    },
    'click .js-create-company': function(e, instance) {
        instance.state.set('creatingCompany', true);
    },
    'click .js-deselect-company': function(e, instance) {
        instance.state.set('selectedCompany', false);
    },
    'click .js-create-worker-rel': function(e, instance) {
        instance.state.set('creatingWorkRel', true);
        console.log("STATE>>>>>>>>> CREATING WORK REL");
    },
    'click .js-edit-worker-rel': function(e, instance) {
        console.log("EDIT>>>>>>>>> ", e.target.id);
        instance.state.set('editingWorkerRel', e.target.id);
    },
    'click .js-save-edited-position': function(e, instance) {
        const newVal = instance.$('#positionInput')
            .val();
        Rels.update({
            _id: e.target.id
        }, {
            $set: {
                position: newVal
            }
        });
        instance.state.set('editingWorkerRel', false);

    },
    'click .js-validate-worker-rel': function(e, instance) {
        Rels.update({
            _id: e.target.id
        }, {
            $set: {
                validated: true
            }
        });
        Meteor.call('propagateWorkerRelToUser', e.target.id);

    },
    'click .js-reject-worker-rel': function(e, instance) {
        Rels.remove({
            _id: e.target.id
        });

    },

    'click .js-cancel-edited-position': function(e, instance) {

        instance.state.set('editingWorkerRel', false);

    }

});
