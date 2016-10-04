import './too-detail-show.html';
import numeral from 'numeral';

Template.TooDetailShow.onCreated(function() {
    // this.autorun(() => {
    //     this.subscribe('transfers_of_ownership.test');
    //     this.subscribe('transfer_of_ownership_details.test');
    // 
    // });
    this.state = new ReactiveDict();
    this.state.setDefault({
        rowState: false,
        selected: false

    });

    console.log("DATA IN TOO DETAIL SHOW: ", this.data);


});

Template.TooDetailShow.onRendered(function() {


});

Template.TooDetailShow.helpers({
  to(b) {
    const a = moment();
    return a.to(moment(b));
  },
  formatInteger(num) {
    return numeral(num).format('0,0');
  },
  formatCurrency(num) {
    return numeral(num).format('$0,0.00');
  },

    rowState() {
        const instance = Template.instance();
        return (instance.state.get('selected')) ?
            'info' : '';
    },
    selected() {
        const instance = Template.instance();
        return (instance.state.get('selected')) ?
            1 : 0;
    },
  
    total(amount, price, discount, taxes) {
        const instance = Template.instance();

        const total = (amount * price) * (1 - discount / 100) * (1 + taxes / 100)
        return (total > 0) ? numeral(total).format('$0,0.00') : '-';
    }
});

Template.TooDetailShow.events({
    'click .js-select-row': function(e, instance) {
        if (instance.state.get('selected')) {
            instance.state.set('selected', false);
        } else {
            instance.state.set('selected', true);
        }
    },
    'click .js-delete-detail': function(e, instance) {
        const orderDetailId = instance.$('.js-delete-detail')
            .attr('id');
        const total = instance.$('#total')
            .val();
        instance.data.onDelete(orderDetailId, total);
        console.log("detail clicked:", orderDetailId);
        
    }
});
