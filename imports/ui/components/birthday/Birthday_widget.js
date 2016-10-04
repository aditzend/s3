Template.Birthday_widget.helpers({
  bday: function() {
    return Actodes.find({
      actodeType: 1
    }, {
      sort: {
        createdAt: -1
      },
      limit: 5
    });
  }
});

Template.Birthday_widget.events({

});
