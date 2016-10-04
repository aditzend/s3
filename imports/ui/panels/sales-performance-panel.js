import './sales-performance-panel.html';


Template.SalesPerformance_panel.onCreated(function() {
    this.autorun(() => {
        let tooSubscription = this.subscribe('transfers_of_ownership.test');
        let toodSubscription = this.subscribe('transfer_of_ownership_details.test');

        let profitCentersSubscription = this.subscribe('profit_centers.test');

    });
});


Template.SalesPerformance_panel.helpers({
    sales(pcId) {
        return TransferOfOwnershipDetails.find({
            profitCenter: pcId
        });
    },
    amountSold(pcId) {
        const toods = TransferOfOwnershipDetails.find({
            profitCenter: pcId
        });
        let amountSold = 0;

        toods.forEach(function(tood) {
            amountSold += Number(tood.amount);
        });
        return amountSold;

    },
    revenue(pcId) {
        const toods = TransferOfOwnershipDetails.find({
            profitCenter: pcId
        });
        let revenue = 0;

        toods.forEach(function(tood) {
            revenue += Number(tood.amount) * Number(tood.price) * (1 - Number(tood.discount) * 0.01);
        });
        return revenue;

    },
    profitCenters() {
        return ProfitCenters.find({});
    }

});;
