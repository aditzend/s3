import './orders-show-page.html';

Template.Orders_show_page.onCreated(function() {
  this.autorun( () => {
    
    const w = workfor();
    
    this.subscribe('Orders.own', w._id);
  });
});

Template.Orders_show_page.helpers({
  
  orders() {
    return Orders.find({},{ sort:{createdAt:-1}});
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
  }
});