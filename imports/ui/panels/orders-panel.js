import './orders-panel.html';
import '../pages/orders-show-page.js';

Template.Orders_panel.onCreated(function() {
  this.autorun( () => {
    const w = workfor();
    this.subscribe('Orders.own',w._id);
  });
});

Template.Orders_panel.helpers({
  
  orders() {
    return Orders.find({},{limit: 6, sort:{createdAt:-1}});
  },
  timeFromOrderCreation(createdAt) {
    return moment(createdAt).fromNow();
  },
  pathForOrder(id) {
      
      const params = {
          _id: id
      };
      const queryParams = {
          // state: 'open'
      };
      const routeName = 'showOrder';
      const path = FlowRouter.path(routeName, params, queryParams);

      return path;
  },
  pathForOrders() {
      
      const params = {
          
      };
      const queryParams = {
          // state: 'open'
      };
      const routeName = 'showOrders';
      const path = FlowRouter.path(routeName, params, queryParams);

      return path;
  },
});

Template.Orders_panel.events({
  'click .js-show-order': function(e, instance) {
    
  }
})