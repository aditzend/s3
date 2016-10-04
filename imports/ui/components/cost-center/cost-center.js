import './cost-center.html';

Template.CostCenter.onCreated( function() {
  this.autorun( () => {
    this.subscribe('cost_centers.test');
  });
});

Template.CostCenter.helpers({
 ccs() {
   return CostCenters.find();
 }
});


Template.CostCenter.events({
  'submit form': function(e,instance) {
    e.preventDefault();
    console.log("cc" , e.target.cc.value);
    CostCenters.insert({name: e.target.cc.value});
    
  }
})