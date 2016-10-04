import {
    Meteor
}
from 'meteor/meteor';


import {
    Template
}
from 'meteor/templating';
import {
    Mongo
}
from 'meteor/mongo';
import {
    Tracker
}
from 'meteor/tracker';

import {
    ReactiveDict
}
from 'meteor/reactive-dict';

import {
    FlowRouter
}
from 'meteor/kadira:flow-router';

import './item-motor-edit.html';



Template.Item_motor_edit.onCreated(function() {
    this.autorun(() => {
        let profitCenterSubscription = this.subscribe('profit_centers.test');
    });
});

Template.Item_motor_edit.onRendered(function() {
    const instance = Template.instance();
    const item = instance.data.item;
    console.log('on rendered EDIT ITEM >>>>>>', item);
    instance.$('#nameInput')
        .val(item.name);

    // instance.$('#profitCenterSelect')
    //     .val('ffHRBxE9GjRY2TSzH');
    // not working   FIXXXXXXXXXXXXX




    instance.$('[data-action=form]')
        .validate({
            rules: {
        
            },
            messages: {
        
            },
            showErrors: function(errorMap, errorList) {
                instance.$("#summary")
                    .html("El formulario tiene errores (" +
                        this.numberOfInvalids() +
                        "), ver detalles en rojo.");
                this.defaultShowErrors();
            },
            submitHandler: function() {
                    const w = workfor();
                    let productPrimaryDescription = instance.$('#productPrimaryDescriptionInput')
                        .val();
                    let productSecondaryDescription = instance.$('#productSecondaryDescriptionInput')
                        .val();
                    let name = instance.$('#nameInput')
                        .val();
                    let diameter = instance.$('#diameterInput')
                        .val();
                    let voltage = instance.$('#voltageInput')
                        .val();
                    let frecuency = instance.$('#frecuencyInput')
                        .val();
                    let amperage = instance.$('#amperageInput')
                        .val();
                    let power = instance.$('#powerInput')
                        .val();
                    let rpm = instance.$('#rpmInput')
                        .val();
                    let maxTime = instance.$('#maxTimeInput')
                        .val();
                    let IPclass = instance.$('#IPclassInput')
                        .val();
                    let iClass = instance.$('#iClassInput')
                        .val();
                    let torque = instance.$('#torqueInput')
                        .val();
                
                    if (item._id == undefined) {
                        console.log("INSERTING...");
                        const newItem = Items.insert({
                            productPrimaryDescription: productPrimaryDescription,
                            productSecondaryDescription: productSecondaryDescription,
                            name: name,
                            diameter: diameter,
                            voltage: voltage,
                            frecuency: frecuency,
                            amperage: amperage,
                            power: power,
                            rpm: rpm,
                            maxTime: maxTime,
                            IPclass: IPclass,
                            iClass: iClass,
                            torque: torque,
                            owner: w._id
                        });
                        instance.data.onSavedData(newItem);
                        swal({
                            title: name + ' creado!',
                            type: "success"
                        });
                    } else {
                        console.log("UPDATING...");
                        Items.update({
                            _id: item._id
                        }, {
                            $set: {
                              productPrimaryDescription: productPrimaryDescription,
                              productSecondaryDescription: productSecondaryDescription,
                              name: name,
                              diameter: diameter,
                              voltage: voltage,
                              frecuency: frecuency,
                              amperage: amperage,
                              power: power,
                              rpm: rpm,
                              maxTime: maxTime,
                              IPclass: IPclass,
                              iClass: iClass,
                              torque: torque,
                            }
                        });
                        instance.data.onSavedData(item._id);
                        // swal({
                        //     title: name + ' actualizado!',
                        //     type: "success"
                        // });
                    }
                    //insert or edit if
                }
                //submit
        });
});

Template.Item_motor_edit.helpers({

    profitCenters() {

        return ProfitCenters.find();


    }
})

Template.Item_motor_edit.events({


    'click .js-cancel': function(e, instance) {
        this.onCancel(true);
        swal({
            title: 'Cancelado',
            text: 'Los cambios no se guardaron',
            type: 'warning'
        });
    },

    'submit form': function(e, instance) {
        e.preventDefault();

    }

});
