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

import './person-show-work.html';
import '../company/company-create.js';
import '../company/company-search.js';
import '../rel/rel-worker-edit.js';
import '../../../api/rels/methods.js';



Template.Person_show_work.onCreated(function() {
    // let admin = Meteor.call('rels.checkAdmin');
    // console.log(admin);
    console.log("data", this.data);

    //
    this.state = new ReactiveDict();
    this.state.setDefault({
        creatingCompany: false,
        creatingWorkRel: false,
        editingWorkRel: true,

    });
    this.subscribe('workerRels');

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

// Template.Person_show_work.onRendered(function() {
//     const instance = Template.instance();
//
//     console.log('person id', instance.data.person);
//
// });

Template.Person_show_work.helpers({
    selectedCompany() {
        const instance = Template.instance();

        return instance.state.get('selectedCompany');
    },

    positions(personId) {
        return Rels.find({
            origin: personId,
            type: 'worker'
        });

    },
    positionCountGreaterThan(number) {
        // const instance = Template.instance();
        const wr = Rels.find({
            type: 'worker'
        });
        const count = wr.count();

        return (count > number) ? true :
            false;
    },
    company(destiny) {
        const c = Companies.findOne(
            destiny
        );
        return c.name;
    },

    creatingCompany() {
        const instance = Template.instance();
        return instance.state.get('creatingCompany');
    },
    createCompanyArgs() {
        const instance = Template.instance();

        return {
            // person,
            company: {
              name: instance.state.get('creatingCompanyName')
            },
            onSavedData() {
                instance.state.set('creatingCompany', false);
            },
            onCancel() {
                instance.state.set('creatingCompany', false);

            }
        }
    },
    position(company) {
        const instance = Template.instance();
        const person = instance.data.person._id;
        const rel = Rels.findOne({
            origin: person,
            type: "worker",
            destiny: company
        });
        return rel.position;
    },
    searchCompanyArgs() {
        const instance = Template.instance();

        return {
          mode: 'both',
          index: CompaniesIndex,
            onCS_selectedCompany(id) {
                instance.state.set('selectedCompany', id);
                console.log("STATE>>>>>>>>>>>>>> SELECTED COMPANY ", id);
            },
            companyNotFound(companyStr) {
              instance.state.set('creatingCompanyName', companyStr);
              console.log('NOT FOUND :' , companyStr);
            }
        }
    },
    showCompanyArgs(id) {
        const instance = Template.instance();
        return {
            selectedCompanyId: id
        }
    },
    createWorkerRelArgs(company) {
        const instance = Template.instance();
        return {
            origin: instance.data.person._id,
            destiny: company,
            onSavedData() {
                instance.state.set('editingWorkRel', false);
                instance.state.set('creatingWorkRel', false);
                instance.state.set('selectedCompany', false);
            },
            onCancel() {
                instance.state.set('editingWorkRel', false);
                instance.state.set('creatingWorkRel', false);
                instance.state.set('selectedCompany', false);


            },
            onEdit() {
                instance.state.set('editingWorkRel', true);
            }

        }
    },
    creatingWorkerRel() {
        const instance = Template.instance();
        return instance.state.get('creatingWorkRel');

    },
    editingWorkRel() {
        const instance = Template.instance();
        return instance.state.get('editingWorkRel');
    }
    // validated() {
    //     const instance = Template.instance();
    //     return instance.data.validated;
    // }
});

Template.Person_show_work.events({
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
        console.log("EDIT>>>>>>>>> ");
    }


});

Template.Person_show_work.events({
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
        console.log("EDIT>>>>>>>>> ");
    }

});
