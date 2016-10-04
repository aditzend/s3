import './cash-assets-panel.html';

Template.CashAssets_panel.onCreated(function() {
    this.state = new ReactiveDict();
    this.state.setDefault({

        sum: 0

    });
    this.autorun(() => {
        this.subscribe("accountingAccounts.test");
        let prev = this.state.get('sum');


    })
});


Template.CashAssets_panel.helpers({
    accounts() {
        return AccountingAccounts.find({
            type: 'cashAsset'
        });
    },
    sum() {
        const instance = Template.instance();

        let accounts = AccountingAccounts.find({
            type: 'cashAsset'
        });
        let sum = 0;
        accounts.forEach(function(account) {
            console.log(account.value);
            sum += account.value;
        });
        instance.state.set('sum', sum);
        return sum;
    }
});
