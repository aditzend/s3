import './payables-panel.html';

Template.Payables_panel.onCreated(function() {
    this.autorun(() => {
        let tooSubscription = this.subscribe('transfers_of_ownership.test');
        let toodSubscription = this.subscribe('transfer_of_ownership_details.test');

        let accountingAccountsSubscription = this.subscribe('accountingAccounts.test');

    });
});


Template.Payables_panel.helpers({

    payable() {
        const aas = AccountingAccounts.find({
            name: 'owes',
            paid: false,
            origin: workforId()
        });
        let payable = 0;

        aas.forEach(function(aa) {
            payable += Number(aa.value);
        });
        return payable;

    },
    companyName(id) {
        const company = Companies.findOne({
            _id: id
        }, {
            fields: {
                name: 1
            }
        });
        return company.name
    }

});;
