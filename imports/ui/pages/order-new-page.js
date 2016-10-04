import '/imports/ui/components/rel/rel-customer-edit.js';
import '/imports/ui/panels/cash-assets-panel.js';
import '/imports/ui/panels/payables-panel.js';
import '/imports/ui/panels/receivables-panel.js';
import '/imports/ui/components/person/person-create.js';
import '/imports/ui/components/company/company-decs.js';
import '/imports/ui/components/item/item-decs.js';
import '/imports/ui/components/too-detail/too-detail-show.js';
import '/imports/ui/components/too-detail/too-detail-edit.js';
import './order-new-page.html';



Template.Order_new_page.onCreated(function() {


    this.state = new ReactiveDict();
    this.state.setDefault({
        company: false,
        //switchingCompany: false,
        showCompanyDetails: false,
        paymentDays: false,
        fin: false,
        finType: false,
        //  selectedProduct: false,
        orderId: false,
        sellingItemName: false,
        sellingItemId: false,
        grandTotal: false,
        dateDefined: false,
        uploadingFile: false
    });

    this.autorun(() => {

        //let orderSubscription = this.subscribe('Orders.');
        // let orderDetailSubscription = this.subscribe('OrderDetails.test');
        let customerRelSubscription = this.subscribe('customerRels', workforId());
        // let paymentMethodSubscription = this.subscribe('PaymentMethods.test');
        FlowRouter.watchPathChange();

        if (orderSubscription.ready()) {
            // console.log('order ready');
            const orderId = FlowRouter.getParam('_id');
            this.state.set('orderId', orderId);
            console.log('orderId is ', orderId);
            const order = Orders.findOne({
                _id: orderId
            });
            if (order.invoiceType) {
                this.state.set('invoiceType', order.invoiceType);
            } else {
                this.state.set('invoiceType', false);

            }
            //console.log('invoiceType', this.state.get('invoiceType'));

            //  console.log('too', too);
            // console.log('orderId', orderId);
            // console.log('too', too);
            // console.log('order.destiny', order.destiny);
            if (order.destiny) {
                this.state.set('company', order.destiny);
                const rel = Rels.findOne({
                    type: 'customer',
                    origin: order.destiny
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

Template.Order_new_page.onRendered(function() {

    const instance = Template.instance();

    // $('.date-picker')
    //     .datepicker();
    // const today = moment()
    //     .format("D-MM-YYYY");
    //     
    // instance.$('#emission-date')
    // //     .val(today);
    // const orderId = FlowRouter.getParam('_id');
    // instance.state.set('orderId', orderId);
    // 
    // 
    // const too = Orders.findOne({
    //     _id: orderId
    // });
    // console.log(too);
    // // console.log('orderId', orderId);
    // // console.log('too', too);
    // // console.log('order.destiny', order.destiny);
    // if (order.destiny) {
    //     instance.state.set('company', order.destiny);
    // }

});

Template.Order_new_page.helpers({


    uploadingFile() {
        const instance = Template.instance();
        return instance.state.get('uploadingFile');
    },

    // createdBy() {
    //     const instance = Template.instance();
    // 
    //     return instance.data.name;
    // },
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
                OrderDetails.remove(detailId);
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
        let orderDetails = OrderDetails.find({
            too: instance.state.get('orderId')
        });
        orderDetails.forEach(function(orderDetail) {
            amountTotal += Number(orderDetail.amount);
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
        let orderDetails = OrderDetails.find({
            too: instance.state.get('orderId')
        });
        orderDetails.forEach(function(orderDetail) {
            grossTotal += Number(orderDetail.amount) * Number(orderDetail.price);
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
        let orderDetails = OrderDetails.find({
            too: instance.state.get('orderId')
        });
        orderDetails.forEach(function(orderDetail) {
            discount += (Number(orderDetail.amount) * Number(orderDetail.price)) * Number(orderDetail.discount) * 0.01;
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
    //     let orderDetails = OrderDetails.find({
    //         too: instance.state.get('orderId')
    //     });
    //     orderDetails.forEach(function(orderDetail) {
    //         discountTotal += (Number(orderDetail.amount) * Number(orderDetail.price)) * (1 + Number(orderDetail.discount) * 0.01);
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
        let orderDetails = OrderDetails.find({
            too: instance.state.get('orderId')
        });
        orderDetails.forEach(function(orderDetail) {
            netTotal += (Number(orderDetail.amount) * Number(orderDetail.price)) * (1 - Number(orderDetail.discount) * 0.01);
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
        let orderDetails = OrderDetails.find({
            too: instance.state.get('orderId')
        });
        orderDetails.forEach(function(orderDetail) {
            taxes += (Number(orderDetail.amount) * Number(orderDetail.price)) * (1 - Number(orderDetail.discount) * 0.01) * (Number(orderDetail.taxes) * 0.01);
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
        let orderDetails = OrderDetails.find({
            order: instance.state.get('orderId')
        });
        orderDetails.forEach(function(orderDetail) {
            grandTotal += (Number(orderDetail.amount) * Number(orderDetail.price)) * (1 - Number(orderDetail.discount) * 0.01) * (1 + Number(orderDetail.taxes) * 0.01);
        });
        return grandTotal;
    },
    sellingItemName() {
        const instance = Template.instance();
        return instance.state.get('sellingItemName');
    },
    soldProducts() {
        const instance = Template.instance();
        const order = instance.state.get('orderId');
        return OrderDetails.find({
            order: order
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

    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    order() {
        const instance = Template.instance();
        const orderId = instance.state.get('orderId');
        const order = Orders.findOne(orderId);
        return {
            timeFromOrderCreation: moment(order.createdAt)
                .fromNow(),
            authorName: order.authorName,
            authorLastName: order.authorLastName
        }

    },

    // timeFromOrderCreation() {
    //     const instance = Template.instance();
    //     const orderId = instance.state.get('orderId');
    //     const order = Orders.findOne({
    //         _id: orderId
    //     }, {
    //         fields: {
    //             createdAt: 1
    //         }
    //     });
    // 
    //     console.log('order created at', order.createdAt);
    // 
    //     return {
    //         time: moment(order.createdAt)
    //             .fromNow(),
    //         name: 'Alvarito'
    //     };
    // 
    // },
    files() {
        const instance = Template.instance();
        const orderId = instance.state.get('orderId');
        return order = Orders.findOne(orderId, {
                fields: {
                    files: 1
                }
            })
            .count();

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
    //     const orderId = instance.state.get('orderId');
    //     const order = Orders.findOne(orderId);
    //     const company = Companies.findOne(order.destiny);
    //     instance.state.set('selectedCompany', order.destiny);
    //     return (instance.state.get('switchingCompany')) ? false : company;
    // },
    productArgs() {
        const instance = Template.instance();
        return {
          mode:'product',
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
    customerArgs(companyId) {
        const instance = Template.instance();

        return {
            mode: 'customer',
            params: 'show-details',
            index: CustomersIndex,
            selectedCompanyId: companyId,
            selectedCompany(id) {
                instance.state.set('company', id);
                //instance.state.set('switchingCompany', false);

                //  console.log('company', id);
                const orderId = instance.state.get('orderId');
                // console.log('orderId', orderId);
                Orders.update({
                    _id: orderId
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

Template.Order_new_page.events({
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




        const newOrderDetail = OrderDetails.insert({
            order: instance.state.get('orderId'),
            owner: workforId(),
            item: instance.state.get('sellingItemId'),
            profitCenter: instance.state.get('sellingItemProfitCenter'),
            amount: amount,
            price: price,
            discount: discount,
            taxes: taxes

        });
        AccountingAccounts.insert({
            name: 'vatPayable', //iva debito
            owner: workforId(),
            value: amount * price * (1 - discount * 0.01) * taxes * 0.01,
            orderDetail: newOrderDetail

        });
        AccountingAccounts.insert({
            name: 'owes', //clientBalance o saldo cuenta corriente del cliente
            destiny: workforId(),
            origin: company,
            owner: workforId(),
            value: amount * price * (1 - discount * 0.01) * (1 + taxes * 0.01),

            dueDate: moment()
                .add(1, 'days')
                .format(),
            paid: false,
            orderDetail: newOrderDetail

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
        const orderId = instance.state.get('orderId');
        Orders.update({
            _id: orderId
        }, {
            $set: {
                invoiceType: null
            }
        });
        instance.state.set('invoiceType', false);
    },
    'change .js-invoice-type': function(e, instance) {
        const invoiceType = e.target.value;
        const orderId = instance.state.get('orderId');
        Orders.update({
            _id: orderId
        }, {
            $set: {
                invoiceType: invoiceType
            }
        });
        instance.state.set('invoiceType', invoiceType);


    },
    'click .js-goto-upload-file': function(e, instance) {
        instance.state.set('uploadingFile', true);
    },
    'click .js-upload-file': function(e, instance) {
        console.log("call filestack");
        // filepicker.pick({
        // 
        //         language: 'es',
        //         container: 'window',
        //         services: ['COMPUTER']
        //     },
        //     function(Blob) {
        //         //console.log('Storing in session' + JSON.stringify(Blob.url));
        //         const orderId = instance.state.get('orderId');
        //         let updateFiles = {};
        //         let file = {
        //             url: Blob.url
        //         };
        //         let name = instance.$('#uploadingFileInput')
        //             .val();
        //         updateFiles['files.' + name] = file;
        // 
        //         let pushFile = {
        //             name: name,
        //             url: Blob.url
        //         };
        // 
        // 
        //         Orders.update({
        //             _id: orderId
        //         }, {
        //             $push: {
        //                 files: pushFile
        //             }
        //         });
        //         instance.state.set('uploadingFile', false);
        //         // Session.set(
        //         //   'url', JSON.stringify(Blob.url)
        //         // );
        //         // Session.set(
        //         //   'artworkUploaded', true
        //         // );
        //         // console.log("Artwork URL " + Session.get('artworkUrl'));
        // 
        //     },
        //     function(FPError) {
        //         // Session.set(
        //         //   'artworkUploaded', false
        //         // );
        //         console.log(FPError.toString());
        //     }
        // );

    }

});
