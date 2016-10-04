import './rel-customer-edit.html';
import '/imports/api/rels/methods.js';
import '../../panels/payment-methods-panel.js';


Template.Rel_customer_edit.onCreated(function() {
    console.log(this.data);
    this.state = new ReactiveDict();
    this.state.setDefault({
        editing: false,
        // dataLoaded: false,
        // creatingMethod: false,
        // paymentMethod: false
    });
    // this.autorun(() => {
    //     let paymentMethodSubscription = this.subscribe('PaymentMethods.test');
    //     if (paymentMethodSubscription.ready()) {
    //         this.state.set('dataLoaded', true);
    //     }
    // });
});

Template.Rel_customer_edit.onRendered(function() {
    const instance = Template.instance();
    const d = Template.instance().data;
    const rel = Rels.findOne({
        origin: d.origin,
        destiny: d.destiny,
        type: d.type
    });
    instance.data.rel = rel;
    if (rel) {
        instance.$('#notesInput')
            .val(rel.notes);
        instance.$('#category')
            .val(rel.category);
        instance.$('#payerBehavior')
            .val(rel.payerBehavior);
        instance.$('#paymentDays')
            .val(rel.paymentDays);
        instance.$('#paymentNotes')
            .val(rel.paymentNotes);
        console.log('>>>SETTING PM',rel.paymentMethod);
        instance.state.set('paymentMethod',rel.paymentMethod);
    }

});

Template.Rel_customer_edit.helpers({
  // set(){
  //   const instance = Template.instance();
  //   console.log('>>>SELECT BOX set',instance.state.get('paymentMethod'));
  // },
  // paymentMethods() {
  //     return PaymentMethods.find();
  //   
  // },
  creatingMethod() {
      const instance = Template.instance();
      return instance.state.get('creatingMethod');
  },
  paymentMethodsArgs(){
    const instance = Template.instance();
    return {
      currentPm: instance.state.get('paymentMethod'),//the current payment method of the rel
      //PMP=PaymentMethods_panel PM=pm=PaymentMethod
      onPMP_selectedPM(id,name,days){
        instance.data.pmId = id;
        instance.data.pmName = name;
        instance.data.pmDays = days;
        console.log('>>>DATA RETURNED FROM PMP',name);
      }
    }
  }
});



Template.Rel_customer_edit.events({
//   'click .js-payment-method': function(e,instance) {
//   const id = e.target.value;
//   const pm = PaymentMethods.findOne(id);
//   
//   console.log('PAYMENT METHOD>>>>>',pm.name);
//   console.log('PAYMENT METHOD DAYS>>>>>',pm.days);
// },
    // 'click .js-create-payment-method': function(e, instance) {
    //     instance.state.set('creatingMethod', true);
    // },
    // 'click .js-save-payment-method': function(e, instance) {
    //     instance.state.set('creatingMethod', false);
    //     PaymentMethods.insert({
    //             name: instance.$('#name')
    //                 .val(),
    //             days: instance.$('#days')
    //                 .val()
    //         }
    // 
    //     )
    // },
    // 'click .js-cancel-payment-method': function(e, instance) {
    //     instance.state.set('creatingMethod', false);
    // },
    'submit form': function(e, instance) {
        e.preventDefault();
        console.log(instance.data.type);
        console.log("category", instance.$("#category")
            .val());

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
                    category: instance.$("#category")
                        .val(),
                    paymentDays: e.target.paymentDays.value,
                    paymentNotes: e.target.paymentNotes.value,
                    payerBehavior: e.target.payerBehavior.value,
                    paymentMethod: instance.data.pmId,
                    paymentMethodDays: instance.data.pmDays,
                    paymentMethodName: instance.data.pmName,
                  
                }
            });

            console.log(rel);
        } else {
            relId = Rels.insert({
                type: d.type,
                origin: d.origin,
                destiny: d.destiny,
                notes: e.target.notes.value,
                category: e.target.category.value,
                paymentDays: e.target.paymentDays.value,
                paymentNotes: e.target.paymentNotes.value,
                payerBehavior: e.target.payerBehavior.value,
                paymentMethod: instance.data.pmId,
                paymentMethodDays: instance.data.pmDays,
                paymentMethodName: instance.data.pmName
            });
        }


        // 
        // console.log('new rel >>>>>>', relId);
        instance.data.onRCE_savedData(relId);

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
    'click .js-rel-customer-edit-cancel': function(e, instance) {
        instance.data.onRCE_cancel();
        swal({
            title: "Cancelado",
            text: "NO SE GUARDO LA RELACION CON ESTE CLIENTE",
            type: "warning"
        });
    }
});
