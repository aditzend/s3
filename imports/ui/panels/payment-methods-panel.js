import './payment-methods-panel.html';


Template.PaymentMethodsPanel.onCreated(function() {

    this.state = new ReactiveDict();
    this.state.setDefault({
        dataLoaded: false,
        creatingMethod: false
    });


    this.autorun(() => {
        let paymentMethodSubscription = this.subscribe('PaymentMethods.test');
        if (paymentMethodSubscription.ready()) {
            this.state.set('dataLoaded', true);
        }
    });
});
// Template.PaymentMethodsPanel.onRendered(function() {
//   const instance = Template.instance();
//   const currentPm = instance.data.currentPm;
//   instance.$('#paymentMethod').val(currentPm);
//   console.log('>>>SETTING CURRENT PM',currentPm);
// });

Template.PaymentMethodsPanel.helpers({
    isSelected(pm) {
      const instance = Template.instance();
        const currentPm = instance.data.currentPm;
      return (pm === currentPm)? 'selected':'';
    },
    paymentMethods() {
        return PaymentMethods.find();
    },
    creatingMethod() {
        const instance = Template.instance();
        return instance.state.get('creatingMethod');
    }
});

Template.PaymentMethodsPanel.events({
  'change .js-payment-method': function(e,instance) {
  const id = e.target.value;
  const pm = PaymentMethods.findOne(id);
  
  // console.log('PAYMENT METHOD>>>>>',pm.name);
  // console.log('PAYMENT METHOD DAYS>>>>>',pm.days);
   instance.data.onPMP_selectedPM(id,pm.name,pm.days);
},
    'click .js-create-payment-method': function(e, instance) {
        instance.state.set('creatingMethod', true);
    },
    'click .js-save-payment-method': function(e, instance) {
        instance.state.set('creatingMethod', false);
        PaymentMethods.insert({
                name: instance.$('#name')
                    .val(),
                days: instance.$('#days')
                    .val()
            }

        )
    },
    'click .js-cancel-payment-method': function(e, instance) {
        instance.state.set('creatingMethod', false);
    }
});
