import './create-admin-page.html';

Template.Create_admin_page.onCreated( function(){
  this.state = new ReactiveDict();
  this.state.setDefault({
    companyId: false,
    companyName: false,
    fin:false,
    finType:false
  });
});

Template.Create_admin_page.helpers({
  selectedCompany() {
    const instance = Template.instance();
    return instance.state.get('companyId');
  },
  companyName() {
    const instance = Template.instance();
    return instance.state.get('companyId');
  },
  fin() {
    const instance = Template.instance();
    return instance.state.get('fin');
  },
  finType() {
    const instance = Template.instance();
    return instance.state.get('finType');
  },
  companyArgs() {
    const instance = Template.instance();
    return {
      mode: 'customer',
      params: 'show-details',
      index: CompaniesIndex,
      onCS_selectedCompany(id,name,fin,finType) {
        console.log('selected company', id);

        instance.state.set('companyId',id);
        instance.state.set('companyName',name);
        instance.state.set('fin',fin);
        instance.state.set('finType',finType);
      }
    }
  }
}

);
Template.Create_admin_page.events({
  'click .js-create-admin': function(e,instance) {
    const company = instance.state.get('companyId');
    const user = Meteor.userId();
    Meteor.call('createAdmin',user,company,function(err,res){
      if (err) {
        console.log("error", err);
      }else{
        console.log("user is now company admin");

      }
      }
    );
  }
});
