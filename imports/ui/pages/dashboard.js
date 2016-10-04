import '/imports/ui/components/rel/rel-customer-edit.js';
import '/imports/ui/components/profit-center/profit-center.js';
import '/imports/ui/components/cost-center/cost-center.js';
import '/imports/ui/panels/customers-panel.js';
import '/imports/ui/panels/payment-methods-panel.js';
import '/imports/ui/panels/vendors-panel.js';
import '/imports/ui/panels/orders-panel.js';
import '/imports/ui/panels/items-panel.js';
import '/imports/ui/panels/items-motors-panel.js';
import '/imports/ui/panels/sales-performance-panel.js';
import '/imports/ui/panels/cash-flow-panel.js';
import '/imports/ui/components/person/person-create.js';
import '/imports/ui/components/rel/validate-worker-rels.js';
import './dashboard.html';



Template.Dashboard.onCreated(function() {
    this.autorun(() => {
        // let tooSubscription = this.subscribe('transfers_of_ownership.test');
        // let toodSubscription = this.subscribe('transfer_of_ownership_details.test');

        // this.subscribe('userData'),
        //     this.subscribe('persons.own'),
    });
});

Template.Dashboard.helpers({

    isCompanyAdmin() {

        return (Meteor.user().admins === undefined) ? false : true;
    },

  


    pathForShowTreasury() {
        const params = {};
        const queryParams = {
            // state: 'open'
        };
        const routeName = 'showTreasury';
        const path = FlowRouter.path(routeName, params, queryParams);

        return path;
    },
    workingFor() {
      return workfor();
    }
});

Template.Dashboard.events({
  'click .js-new-order': function(e,instance) {
        const w = workfor();
        Meteor.call('createOrder', w._id, function(err,res){
          if (err) {
            console.log(err);
          } else {
            const params = {
                _id: res
            };
            const queryParams = {
                // state: 'open'
            };
            const routeName = 'showOrder';
            const path = FlowRouter.path(routeName, params, queryParams);
            
            FlowRouter.go(path);
          }
        });
        
      
        
        
    
  }
  

});
