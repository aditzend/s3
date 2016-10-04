import './app-nav.html';

Template.App_nav.helpers({
  email: function() {
    return Meteor.user().emails[0].address;
  }

});

Template.App_nav.events({
  'click [data-action=navBarLogout]' : function() {
    AccountsTemplates.logout();
  }

});
