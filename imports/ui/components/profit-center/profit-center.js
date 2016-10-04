import './profit-center.html';

Template.ProfitCenter.onCreated( function() {
  this.autorun( () => {
    this.subscribe('profit_center.test');
  });
});

Template.ProfitCenter.helpers({
 pcs() {
   return ProfitCenters.find();
 }
});


Template.ProfitCenter.events({
  'submit form': function(e,instance) {
    e.preventDefault();
    console.log("pc" , e.target.pc.value);
    ProfitCenters.insert({name: e.target.pc.value});
    
  }
})