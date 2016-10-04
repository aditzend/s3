import './receivables-panel.html';



Template.Receivables_panel.onCreated(function() {
    this.autorun(() => {
        let tooSubscription = this.subscribe('transfers_of_ownership.test');
        let toodSubscription = this.subscribe('transfer_of_ownership_details.test');

        let accountingAccountsSubscription = this.subscribe('accountingAccounts.test');

    });
});


Template.Receivables_panel.helpers({
    // receivables(pcId) {
    //     return TransferOfOwnershipDetails.find({
    //         profitCenter: pcId
    //     });
    // },
    // amountSold(pcId) {
    //     const toods = TransferOfOwnershipDetails.find({
    //         profitCenter: pcId
    //     });
    //     let amountSold = 0;
    // 
    //     toods.forEach(function(tood) {
    //         amountSold += Number(tood.amount);
    //     });
    //     return amountSold;
    // 
    // },
    receivable() {
        const aas = AccountingAccounts.find({
            name: 'owes',
            paid: false,
            destiny: workforId()
        });
        let receivable = 0;

        aas.forEach(function(aa) {
            receivable += Number(aa.value);
        });
        return receivable;

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
    },
    owes() {
        return AccountingAccounts.find({
            name: 'owes',
            paid: false
        });
    }

});;
