import '/imports/ui/components/rel/rel-customer-edit.js';
import '/imports/ui/panels/cash-assets-panel.js';
import '/imports/ui/panels/payables-panel.js';
import '/imports/ui/panels/receivables-panel.js';
import '/imports/ui/components/person/person-create.js';
import '/imports/ui/components/company/company-decs.js';
import '/imports/ui/components/item/item-decs.js';
import '/imports/ui/components/too-detail/too-detail-show.js';
import '/imports/ui/components/too-detail/too-detail-edit.js';
import '/imports/ui/components/common/staggering.js';
import '/imports/ui/components/common/sparkline.js';
import '/imports/ui/panels/deliveries-panel.js';
import '/imports/ui/panels/invoices-panel.js';
import './order-show-page.html';
import numeral from 'numeral';


Template.Order_show_page.onCreated(function() {


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
        sellingItemDesc: false,
        sellingItemId: false,
        grandTotal: false,
        dateDefined: false,
        uploadingFile: false,
        addingOrderDetail:false,
    });

    this.autorun(() => {
        let w = workfor();
        let orderSubscription = this.subscribe('Orders.own', w._id);
        let orderDetailSubscription = this.subscribe('OrderDetails.own', w._id);
        let deliveriesSubscription = this.subscribe('Deliveries.test');
        // let customerRelSubscription = this.subscribe('customerRels', w._id);
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
            if (order.destiny) {
              this.state.set('company', order.destiny);
            }else{
              this.state.set('company',false);
            }
            //console.log('invoiceType', this.state.get('invoiceType'));

            //  console.log('too', too);
            // console.log('orderId', orderId);
            // console.log('too', too);
            // console.log('order.destiny', order.destiny);
            // if (order.destiny) {
            //     this.state.set('company', order.destiny);
            //     const rel = Rels.findOne({
            //         type: 'customer',
            //         origin: order.destiny
            //     }, {
            //         fields: {
            //             paymentDays: 1
            //         }
            //     });
                // console.log('paymentDays', this.state.get('paymentDays'));

            //}



        }

        // var context = FlowRouter.current();
    });



});

Template.Order_show_page.onRendered(function() {

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

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
////////////////////////////ARGS/////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

Template.Order_show_page.helpers({

  
  deliveryArgs(order){
    const instance = Template.instance();
    
    return {
      order:order,
      orderId: instance.state.get('orderId'),
      destiny: instance.state.get('company')
    };
  },
  invoiceArgs(order){
    const instance = Template.instance();
    
    return {
      order:order,
      orderId: instance.state.get('orderId'),
      destinyId: instance.state.get('company'),
      // paymentDays: instance.data.order.paymentDays,
      // paymentDays: 60,
      // paymentMethodDays: instance.data.order.paymentMethodDays
      // paymentMethodDays: 30
    };
  }

});

Template.Order_show_page.helpers({
  // 
  // creatingInvoice() {
  //   const instance = Template.instance();
  //   return instance.state.get('creatingInvoice');
  // },

  addingOrderDetail() {
    const instance = Template.instance();
    
    return instance.state.get('addingOrderDetail');
  },

  plusOne(string) {
    return 1+ Number(string);
  },


  formatAsNumber(number) {
    return numeral(number).format('0,0');
  },
  diff(alfa,bravo) {
    const a = numeral(alfa);
    const b = numeral(bravo);
    return a.subtract(b).format('0,0');
  },



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
            onEdit(detail) {
                instance.state.set('editingDetail', detail);
            },
            onDelete(orderDetailId, total) {
                instance.state.set('deletingDetail', orderDetailId);
                
                const deletedDetail = Meteor.call('removeDetail',instance.state.get('orderId'),orderDetailId);
              Meteor.call('removeOrderDetail',orderDetailId);
                
            }
        }
    },
    createDetailArgs() {
      const instance = Template.instance();
      const w = workfor();
      return {
        onAddItem(expectedDate,amount,price,discount,taxes) {
          //console.log("AMOUNT CREATED",amount);
          
          const tood = {
            order: instance.state.get('orderId'),
            owner: w._id,
            origin: w._id,
            destiny: instance.state.get('company'),
            item: instance.state.get('sellingItemId'),
            profitCenter: instance.state.get('sellingItemProfitCenter'),
            expectedDate: moment(expectedDate).format(),
            amount: amount,
            price: price,
            discount: discount,
            taxes: taxes
          };
          //console.log('tood is...' , tood);
          Meteor.call('createOrderDetail',tood,function(err,res){
            if (err) {
              console.log(err);
            }else{
              const propagateOrderDetailToOrderArgs = {
                order: instance.state.get('orderId'),
                orderDetail: res,
                item: instance.state.get('sellingItemId'),
                itemName: instance.state.get('sellingItemName'),
                itemDesc: instance.state.get('sellingItemDesc'),
                expectedDate: moment(expectedDate).format(),
                amount: amount,
                price: price,
                discount: discount,
                taxes: taxes
              };
              console.log(propagateOrderDetailToOrderArgs);
              Meteor.call('propagateOrderDetailToOrder',
              propagateOrderDetailToOrderArgs, function(err,res){
                if (err) {
                  console.log(err);
                }else{
                  instance.state.set('addingOrderDetail',false);
                  instance.state.set('sellingItemId',false);
                  instance.state.set('sellingItemName',false);
                }
              });
            }
          });
    
        },
        onCancelItem() {
          instance.state.set('addingOrderDetail',false);
          instance.state.set('sellingItemId',false);
          instance.state.set('sellingItemName',false);
          
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
    amountTotal(details) {
        const instance = Template.instance();
        let amountTotal = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
        // let orderDetails = OrderDetails.find({
        //     too: instance.state.get('orderId')
        // });
        details.forEach(function(detail) {
            amountTotal += Number(detail.amount);
        });
        return numeral(amountTotal).format('0,0');
    },
    subtotal(details) {
        const instance = Template.instance();
        let grossTotal = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
      
        details.forEach(function(orderDetail) {
            grossTotal += Number(orderDetail.amount) * Number(orderDetail.price);
        });
        return numeral(grossTotal).format('$0,0.00');
    },
    discount(details) {
        let discount = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
      
        details.forEach(function(orderDetail) {
            discount += (Number(orderDetail.amount) * Number(orderDetail.price)) * Number(orderDetail.discount) * 0.01;
        });
        return numeral(discount).format('$0,0.00');
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
    netTotal(details) {
        let netTotal = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
        
        details.forEach(function(orderDetail) {
            netTotal += (Number(orderDetail.amount) * Number(orderDetail.price)) * (1 - Number(orderDetail.discount) * 0.01);
        });
        return numeral(netTotal).format('$0,0.00');
    },
    taxes(details) {
        const instance = Template.instance();
        let taxes = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
    
        details.forEach(function(orderDetail) {
            taxes += (Number(orderDetail.amount) * Number(orderDetail.price)) * (1 - Number(orderDetail.discount) * 0.01) * (Number(orderDetail.taxes) * 0.01);
        });
        return numeral(taxes).format('$0,0.00');
    },
    grandTotal(details) {
        const instance = Template.instance();
        let grandTotal = 0;
        // instance.$('.total')
        //     .each(function() {
        //         // grandTotal += 2;
        //         grandTotal += $(this)
        //             .html();
        //     });
      
        details.forEach(function(orderDetail) {
            grandTotal += (Number(orderDetail.amount) * Number(orderDetail.price)) * (1 - Number(orderDetail.discount) * 0.01) * (1 + Number(orderDetail.taxes) * 0.01);
        });
        return numeral(grandTotal).format('$0,0.00');
    },
    sellingItemName() {
        const instance = Template.instance();
        return instance.state.get('sellingItemName');
    },
    soldProducts(order) {
        const instance = Template.instance();
        // const order = instance.state.get('orderId');
        // return OrderDetails.find({
        //     order: order
        // }, {
        //     sort: {
        //         createdAt: -1
        //     }
        // });
        return
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
        // return {
        //     timeFromOrderCreation: moment(order.createdAt)
        //         .fromNow(),
        //     authorName: order.authorName,
        //     authorLastName: order.authorLastName,
        //     
        // }
        return order;

    },
    // files() {
    //     const instance = Template.instance();
    //     const orderId = instance.state.get('orderId');
    //     return order = Orders.findOne(orderId, {
    //             fields: {
    //                 files: 1
    //             }
    //         })
    //         .count();
    // 
    // },

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
                console.log("selling :", instance.state.get('sellingItemName'));
          
            },
            selectedItemDesc(desc) {
                instance.state.set("sellingItemDesc", desc);
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
          selectedCompanyId: companyId,
          mode: 'customer',
        //  params: 'show-details',
          index: CustomersIndex,
          onDECS_selectedCompany(
            id, 
            name,
            fin,
            finType,
            paymentDays,
            paymentMethod,
            paymentMethodName,
            paymentMethodDays
          ) {
              instance.state.set('company', id);
              //instance.state.set('switchingCompany', false);
              //  console.log('company', id);
              const orderId = instance.state.get('orderId');
              // console.log('orderId', orderId);
              Orders.update({
                  _id: orderId
              }, {
                  $set: {
                      destiny: id,
                      destinyName: name,
                      destinyFin: fin,
                      destinyFinType: finType,
                      paymentDays: paymentDays,
                      paymentMethod:paymentMethod,
                      paymentMethodName: paymentMethodName,
                      paymentMethodDays: paymentMethodDays
                  }
              });
              instance.state.set('companyName', name);
              instance.state.set('fin', fin);
              instance.state.set('finType', finType);
              instance.state.set('paymentDays',paymentDays);
              instance.state.set('paymentMethod',paymentMethod);
              instance.state.set('paymentMethod',paymentMethod);
              instance.state.set('paymentMethodName',paymentMethodName);
              instance.state.set('paymentMethodDays',paymentMethodDays);
              
          
               console.log("STATE>>>>>>>>>>>>>> SELECTED COMPANY ", name);
          },
          // onDECS_companyName(name) {
          //     instance.state.set('companyName', name);
          // },
          // onDECS_companyFin(fin) {
          //     instance.state.set('fin', fin);
          // },
          // onDECS_companyfinType(finType) {
          //     instance.state.set('finType', finType);
          // }

        }
    }

});

Template.Order_show_page.events({
  // 'click .js-create-invoice': function(e,instance) {
  //   instance.state.set('creatingInvoice', true);
  //   
  // },      
  'click .js-add-order-detail': function(e,instance) {
    instance.state.set('addingOrderDetail',true);
    console.log('ADDING ORDER DETAIL');
  },
  'click .js-cancel-add-order-detail': function(e,instance) {
    instance.state.set('addingOrderDetail',false);
    console.log('CANCEL ADDING ORDER DETAIL');
  },
    'click .js-save-sale': function(e, instance) {

        FlowRouter.go('home');
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


    }
    ,
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
