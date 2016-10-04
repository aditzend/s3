import '/imports/ui/components/rel/rel-customer-edit.js';
import '/imports/ui/panels/cash-assets-panel.js';
import '/imports/ui/panels/payables-panel.js';
import '/imports/ui/panels/receivables-panel.js';
import '/imports/ui/components/person/person-create.js';
import '/imports/ui/components/company/company-decs.js';
import '/imports/ui/components/item/item-decs.js';
import '/imports/ui/components/too-detail/too-detail-show.js';
import '/imports/ui/components/too-detail/too-detail-edit.js';
import './expense-new-page.html';



Template.Expense_new_page.onCreated(function() {


    this.state = new ReactiveDict();
    this.state.setDefault({
        company: false,
        //switchingCompany: false,
        showCompanyDetails: false,
        paymentDays: false,
        fin: false,
        finType: false,
        //  selectedProduct: false,
        tooId: false,
        sellingItemName: false,
        sellingItemId: false,
        grandTotal: false,
        dateDefined: false
    });

    this.autorun(() => {

        let tooSubscription = this.subscribe('transfers_of_ownership.test');
        let toodSubscription = this.subscribe('transfer_of_ownership_details.test');
        let customerRelSubscription = this.subscribe('customerRels', workforId());
        FlowRouter.watchPathChange();

        if (tooSubscription.ready()) {
            // console.log('too ready');
            const tooId = FlowRouter.getParam('_id');
            this.state.set('tooId', tooId);
            const too = TransfersOfOwnership.findOne({
                _id: tooId
            });
            if (too.invoiceType) {
                this.state.set('invoiceType', too.invoiceType);
            } else {
                this.state.set('invoiceType', false);

            }
            //console.log('invoiceType', this.state.get('invoiceType'));

            //  console.log('too', too);
            // console.log('tooId', tooId);
            // console.log('too', too);
            // console.log('too.destiny', too.destiny);
            if (too.destiny) {
                this.state.set('company', too.destiny);
                const rel = Rels.findOne({
                    type: 'vendor',
                    origin: too.destiny
                }, {
                    fields: {
                        paymentDays: 1
                    }
                });
                this.state.set('paymentDays', rel.paymentDays);
                // console.log('paymentDays', this.state.get('paymentDays'));

            }



        }
        // var context = FlowRouter.current();
    });



});

Template.Expense_new_page.onRendered(function() {
    const instance = Template.instance();

    // $('.date-picker')
    //     .datepicker();
    // const today = moment()
    //     .format("D-MM-YYYY");
    //
    // instance.$('#emission-date')
    // //     .val(today);
    // const tooId = FlowRouter.getParam('_id');
    // instance.state.set('tooId', tooId);
    //
    //
    // const too = TransfersOfOwnership.findOne({
    //     _id: tooId
    // });
    // console.log(too);
    // // console.log('tooId', tooId);
    // // console.log('too', too);
    // // console.log('too.destiny', too.destiny);
    // if (too.destiny) {
    //     instance.state.set('company', too.destiny);
    // }

});

Template.Expense_new_page.helpers({
    invoiceType() {
        const instance = Template.instance();

        return instance.state.get('invoiceType');

    },
    dateDefined() {
        // const instance = Template.instance();
        // return instance.state.get('dateDefined');
        return true;
    },
    emissionDate() {
        return moment()
            .format('D-MM-YYYY');

    },
    dueDate() {
        const instance = Template.instance();
        const paymentDays = instance.state.get('paymentDays');
        return moment()
            .add(paymentDays, 'days')
            .format('D-MM-YYYY');

    },
    showDetailArgs(detail) {
        const instance = Template.instance();
        return {
            detail: detail,
            onEdit(detailId) {
                instance.state.set('editingDetail', detailId);
            },
            onDelete(detailId, total) {
                instance.state.set('deletingDetail', detailId);
                TransferOfOwnershipDetails.remove(detailId);
            }
        }
    },
    editDetailArgs(detail) {
        const instance = Template.instance();
        return {
            detail: detail,
            onSaved(detailId) {
                instance.state.set('editingDetail', detailId);
            },
            addToGrandTotal(total) {
                console.log('total', total);
                let grandTotal = instance.state.get('grandTotal');
                grandTotal += total;
                console.log('grandTotal', grandTotal);
                instance.state.set('grandTotal', grandTotal);
            },
            subtractFromGrandTotal(total) {
                let grandTotal = instance.state.get('grandTotal');
                grandTotal -= total;
                instance.state.set('grandTotal', grandTotal);
            }
        }
    },
    amountTotal() {
        const instance = Template.instance();
        let amountTotal = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
        let toods = TransferOfOwnershipDetails.find({
            too: instance.state.get('tooId')
        });
        toods.forEach(function(tood) {
            amountTotal += Number(tood.amount);
        });
        return amountTotal;
    },
    subtotal() {
        const instance = Template.instance();
        let grossTotal = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
        let toods = TransferOfOwnershipDetails.find({
            too: instance.state.get('tooId')
        });
        toods.forEach(function(tood) {
            grossTotal += Number(tood.amount) * Number(tood.price);
        });
        return grossTotal;
    },
    discount() {
        const instance = Template.instance();
        let discount = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
        let toods = TransferOfOwnershipDetails.find({
            too: instance.state.get('tooId')
        });
        toods.forEach(function(tood) {
            discount += (Number(tood.amount) * Number(tood.price)) * Number(tood.discount) * 0.01;
        });
        return discount;
    },
    // discountTotal() {
    //     const instance = Template.instance();
    //     let discountTotal = 0;
    //     // instance.$('.total')
    //     //     .each(function() {
    //     //         // grandTotal += 2;
    //     //         grandTotal += $(this)
    //     //             .html();
    //     //     });
    //     let toods = TransferOfOwnershipDetails.find({
    //         too: instance.state.get('tooId')
    //     });
    //     toods.forEach(function(tood) {
    //         discountTotal += (Number(tood.amount) * Number(tood.price)) * (1 + Number(tood.discount) * 0.01);
    //     });
    //     return discountTotal;
    // },
    netTotal() {
        const instance = Template.instance();
        let netTotal = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
        let toods = TransferOfOwnershipDetails.find({
            too: instance.state.get('tooId')
        });
        toods.forEach(function(tood) {
            netTotal += (Number(tood.amount) * Number(tood.price)) * (1 - Number(tood.discount) * 0.01);
        });
        return netTotal;
    },
    taxes() {
        const instance = Template.instance();
        let taxes = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
        let toods = TransferOfOwnershipDetails.find({
            too: instance.state.get('tooId')
        });
        toods.forEach(function(tood) {
            taxes += (Number(tood.amount) * Number(tood.price)) * (1 - Number(tood.discount) * 0.01) * (Number(tood.taxes) * 0.01);
        });
        return taxes;
    },
    grandTotal() {
        const instance = Template.instance();
        let grandTotal = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
        let toods = TransferOfOwnershipDetails.find({
            too: instance.state.get('tooId')
        });
        toods.forEach(function(tood) {
            grandTotal += (Number(tood.amount) * Number(tood.price)) * (1 - Number(tood.discount) * 0.01) * (1 + Number(tood.taxes) * 0.01);
        });
        return grandTotal;
    },
    sellingItemName() {
        const instance = Template.instance();
        return instance.state.get('sellingItemName');
    },
    soldProducts() {
        const instance = Template.instance();
        const too = instance.state.get('tooId');
        return TransferOfOwnershipDetails.find({
            too: too
        }, {
            sort: {
                createdAt: -1
            }
        });
    },
    company() {
        const instance = Template.instance();
        return instance.state.get('company');




    },
    showCompanyDetails() {
        const instance = Template.instance();
        return instance.state.get('showCompanyDetails');


    },

    // switching(company) {
    //     const instance = Template.instance();
    //
    //     return instance.state.get('switchingCompany');
    // },
    too() {
        const instance = Template.instance();
        const tooId = instance.state.get('tooId');
        return TransfersOfOwnership.findOne(tooId);
    },

    companyName() {
        const instance = Template.instance();
        const companyId = instance.state.get('company');
        const company = Companies.findOne({
            _id: companyId
        }, {
            fields: {
                name: 1
            }
        });
        return company.name;
    },

    // companyName() {
    //     const instance = Template.instance();
    //     const tooId = instance.state.get('tooId');
    //     const too = TransfersOfOwnership.findOne(tooId);
    //     const company = Companies.findOne(too.destiny);
    //     instance.state.set('selectedCompany', too.destiny);
    //     return (instance.state.get('switchingCompany')) ? false : company;
    // },
    inputArgs() {
        const instance = Template.instance();
        return {
            mode: 'input',

            selectedItemId(id) {
                instance.state.set('sellingItemId', id);
                // console.log("product", id);
            },
            selectedItemName(name) {
                instance.state.set("sellingItemName", name);
                // console.log("selling :", instance.state.get('sellingItemName'));
            },
            selectedItemProfitCenter(pcId) {
                instance.state.set("sellingItemProfitCenter", pcId);
            }
        }
    },
    paymentDays() {
        const instance = Template.instance();
        return instance.state.get('paymentDays');
    },
    vendorArgs(companyId) {
        const instance = Template.instance();

        return {
            mode: 'vendor',
            params: 'show-details',
            index: VendorsIndex,
            selectedCompanyId: companyId,
            onCS_selectedCompany(id) {
                instance.state.set('company', id);
                //instance.state.set('switchingCompany', false);

                //  console.log('company', id);
                const tooId = instance.state.get('tooId');
                // console.log('tooid', tooId);
                TransfersOfOwnership.update({
                    _id: tooId
                }, {
                    $set: {
                        destiny: id
                    }
                });

                // console.log("STATE>>>>>>>>>>>>>> SELECTED COMPANY ", id);
            },
            name(name) {
                instance.state.set('companyName', name);
                // console.log('company', name);

                // console.log("STATE>>>>>>>>>>>>>> SELECTED COMPANY ", id);
            },
            fin(fin) {
                instance.state.set('fin', fin);
                // console.log("fin", fin);
            },
            finType(finType) {
                instance.state.set('finType', finType);
                // console.log("finType", finType);
            }

        }
    }

});

Template.Expense_new_page.events({
    'click .js-save-sale': function(e, instance) {

        FlowRouter.go('home');
    },
    'click .js-add-item': function(e, instance) {

        const amount = instance.$('.js-amount')
            .val() || 0;
        const price = instance.$('.js-price')
            .val() || 0;

        const discount = instance.$('.js-discount')
            .val() || 0;
        const taxes = instance.$('.js-taxes')
            .val() || 0;
        const company = instance.state.get('company');




        const newTood = TransferOfOwnershipDetails.insert({
            too: instance.state.get('tooId'),
            owner: workforId(),
            item: instance.state.get('sellingItemId'),
            profitCenter: instance.state.get('sellingItemProfitCenter'),
            amount: amount,
            price: price,
            discount: discount,
            taxes: taxes

        });
        AccountingAccounts.insert({
            name: 'vatReceivable', //iva creadito
            owner: workforId(),
            value: amount * price * (1 - discount * 0.01) * taxes * 0.01,
            tood: newTood

        });
        AccountingAccounts.insert({
            name: 'owes', //clientBalance o saldo cuenta corriente del cliente
            origin: workforId(),
            destiny: company,
            owner: workforId(),
            value: amount * price * (1 - discount * 0.01) * (1 + taxes * 0.01),

            dueDate: moment()
                .add(1, 'days')
                .format(),
            paid: false,
            tood: newTood

        });
        instance.state.set('sellingItemName', false);

    },
    'click .js-cancel-item': function(e, instance) {

        //instance.state.set('selectedProduct', false);
        instance.state.set('sellingItemName', false);
        console.log('cancel');

    },
    'click .js-show-company-details': function(e, instance) {
        instance.state.set('showCompanyDetails', true);

        console.log("show details");


    },
    'click .js-hide-company-details': function(e, instance) {
        instance.state.set('showCompanyDetails', false);
    },
    'click .js-show-company-switch': function(e, instance) {
        // instance.state.set('switchingCompany', true);
        instance.state.set('company', false);

        console.log("show search");
    },
    'click .js-edit-invoice-type': function(e, instance) {
        // instance.state.set('switchingCompany', true);
        const invoiceType = e.target.value;
        const tooId = instance.state.get('tooId');
        TransfersOfOwnership.update({
            _id: tooId
        }, {
            $set: {
                invoiceType: null
            }
        });
        instance.state.set('invoiceType', false);
    },
    'change .js-invoice-type': function(e, instance) {
        const invoiceType = e.target.value;
        const tooId = instance.state.get('tooId');
        TransfersOfOwnership.update({
            _id: tooId
        }, {
            $set: {
                invoiceType: invoiceType
            }
        });
        instance.state.set('invoiceType', invoiceType);


    }

});
