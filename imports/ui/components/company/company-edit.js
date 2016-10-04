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

import './company-edit.html';


Template.Company_edit.onCreated(function() {
    this.state = new ReactiveDict();
    this.state.setDefault({
        editing: false,
        foo: 'bar'
    });
});


Template.Company_edit.onRendered(function() {
    const instance = Template.instance();
    const companyId = instance.data.company._id;
    console.log('company', companyId);

    instance.$('#nameInput')
        .val(instance.data.company.name);
    instance.$('#countryInput')
        .val(CountryCodes.countryName(instance.data.company
            .country))
        .change();
    instance.$('#cuitInput')
        .val(instance.data.company.fin);

    instance.$('[data-action=form]')
        .validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 40
                },
                cuit: {
                    required: false,
                    minlength: 11
                }
            },
            messages: {
                name: {
                    required: 'Este campo no puede quedar vacío!',
                    minlength: 'La Razon Social debe tener mínimo {0} letras!',
                    maxlength: 'La Razon Social debe tener máximo {0} letras!',
                },
                cuit: {
                    minlength: 'El CUIT debe tener mínimo {0} numeros!',
                }
            },
            submitHandler: () => {
                const name = $('#nameInput')
                    .val();
                const country = CountryCodes.countryCode($('#countryInput')
                    .val());
                const cuit = $('#cuitInput')
                    .val();
                const companyId = instance.data.company._id;
                Companies.update({
                    _id: companyId
                }, {
                    $set: {
                        name: name,
                        country: country,
                        fin: cuit
                    }
                });
                swal({
                    title: 'Cambios OK',
                    text: 'Los datos se guardaron ',
                    type: 'success'
                });
                instance.data.onSavedData();
            }
        });
});



Template.Company_edit.events({

    'click .js-save': function(e, instance) {
        // this.onSavedData();

    },
    'click .js-cancel': function(e, instance) {

        this.onCancel();

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
