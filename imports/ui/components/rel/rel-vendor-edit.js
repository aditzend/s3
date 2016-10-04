import './rel-vendor-edit.html';
import '/imports/api/rels/methods.js';


Template.Rel_vendor_edit.onCreated(function() {
    console.log(this.data);
    this.state = new ReactiveDict();
    this.state.setDefault({
        editing: false

    });
});

Template.Rel_vendor_edit.onRendered(function() {
    const instance = Template.instance();
    const d = Template.instance()
        .data;
    const rel = Rels.findOne({
        origin: d.origin,
        destiny: d.destiny,
        type: d.type
    });
    if (rel) {
        instance.$('#notesInput')
            .val(rel.notes);
        instance.$('#paymentDaysInput')
            .val(rel.paymentDays);
        instance.$('#paymentTermsInput')
            .val(rel.paymentTerms);
        instance.$('#paymentNotesInput')
            .val(rel.paymentNotes);
    }

});



Template.Rel_vendor_edit.events({
    'submit form': function(e, instance) {
        e.preventDefault();
        console.log(instance.data.type);
        const d = instance.data;

        const rel = Rels.findOne({
            origin: d.origin,
            destiny: d.destiny,
            type: d.type
        });

        let relId;

        if (rel) {
            relId = Rels.update({
                _id: rel._id
            }, {
                $set: {
                    type: d.type,
                    origin: d.origin,
                    destiny: d.destiny,
                    notes: e.target.notes.value,
                    paymentDays: e.target.paymentDays.value,
                    paymentTerms: e.target.paymentTerms.value,
                    paymentNotes: e.target.paymentNotes.value,
                }
            });
        } else {
            relId = Rels.insert({
                type: d.type,
                origin: d.origin,
                destiny: d.destiny,
                notes: e.target.notes.value,
                paymentDays: e.target.paymentDays.value,
                paymentTerms: e.target.paymentTerms.value,
                paymentNotes: e.target.paymentNotes.value,
            });
        }


        // 
        console.log('new rel >>>>>>', relId);
        instance.data.onSavedData(relId);

        // 
        // 
        // console.log('editing Rel: ' + this._id);
        // Rels.update(this._id, {
        //   $set: {
        //     notes: e.target.notes.value,
        //     paymentDays: e.target.paymentDays.value,
        //     paymentTerms: e.target.paymentTerms.value,
        //     paymentNotes: e.target.paymentNotes.value,
        //   }
        // });
    },
    'click .js-rel-vendor-edit-cancel': function(e, instance) {
        instance.data.onCancel();
        swal({
            title: "Cancelado",
            text: "NO SE GUARDO LA RELACION CON ESTE CLIENTE",
            type: "warning"
        });
    }
});
