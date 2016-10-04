import './rel-worker-edit.html';
import '/imports/api/rels/methods.js';


Template.Rel_worker_edit.onCreated(function() {
  const instance = Template.instance();



  // instance.data.onEdit();
})

Template.Rel_worker_edit.helpers({
  company() {
      const instance = Template.instance();
      let c = Companies.findOne(instance.data.destiny);
      return c.name;
    },
    rel() {
      const instance = Template.instance();
      let destiny = instance.data.destiny;
      let origin = instance.data.origin;
      let r = Rels.findOne({
        origin: origin,
        destiny: destiny,
        type: 'worker'
      });
      return r;
    }

})

Template.Rel_worker_edit.events({
  'submit form': (e, instance) => {
    e.preventDefault();
    let position = instance.$('#positionInput').val();

    let destiny = instance.data.destiny;
    let origin = instance.data.origin;

    console.log("position", position);
    console.log("origin", origin);
    console.log("destiny", destiny);


    Meteor.call('rels.upsertWorker', {
      origin, destiny, position
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // swal({
        //   title: 'Datos guardados',
        //   type: 'success'
        // });
        instance.data.onSavedData();
        // success!
      }
    });


  },
  'click .js-cancel': (e, instance) => {
    instance.data.onCancel();
  }
})
