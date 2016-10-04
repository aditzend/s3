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

import './item-edit.html';



Template.Item_edit.onCreated(function() {
    this.autorun(() => {
        let profitCenterSubscription = this.subscribe('profit_centers.test');
    });
});

Template.Item_edit.onRendered(function() {
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
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 30
                },
                desc: {
                    required: false,
                    minlength: 2,
                    maxlength: 30

                },
                profitcenter: {
                    required: true
                }
            },
            messages: {
                name: {
                    //required: 'Este campo no puede quedar vacío!',
                    minlength: 'El nombre debe tener mínimo {0} letras!',
                    maxlength: 'El nombre debe tener máximo {0} letras!',
                },
                desc: {
                    //required: 'Este campo no puede quedar vacío!',
                    minlength: 'La descripción debe tener mínimo {0} letras!',
                    maxlength: 'La descripción debe tener máximo {0} letras!',

                },
                profitcenter: {
                    required: 'Este campo no puede quedar vacío!'
                        //minlength: 'La descripción debe tener mínimo {0} letras!',
                        //maxlength: 'La descripción debe tener máximo {0} letras!',
                }
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
                    let name = instance.$('#nameInput')
                        .val();
                    let desc = instance.$('#descInput')
                        .val();
                    let profitCenter = instance.$('#profitCenterSelect')
                        .val();
                    if (item._id == undefined) {
                        console.log("INSERTING...");
                        const newItem = Items.insert({
                            name: name,
                            desc: desc,
                            profitCenter: profitCenter,
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
                                name: name,
                                desc: desc,
                                profitCenter: profitCenter,
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

Template.Item_edit.helpers({

    profitCenters() {

        return ProfitCenters.find();


    }
})

Template.Item_edit.events({


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
