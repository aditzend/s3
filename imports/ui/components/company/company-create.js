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

import './company-create.html';
import '../rel/rel-customer-edit';
import '/imports/api/companies/methods.js';



Template.Company_create.onRendered(function() {

    const instance = Template.instance();
    $('#nameInput')
        .val(instance.data.company.name);

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
                var name = $('#nameInput')
                    .val();
                var formalName = $('#formalNameInput')
                    .val();
                var country = CountryCodes.countryCode($('#countryInput')
                    .val());
                var cuit = $('#cuitInput')
                    .val();
                const ssok = Random.secret([26]) + Meteor.userId();
                var newCompany = Companies.insert({
                    name: name,
                    formalName: formalName,
                    country: country,
                    fin: cuit,
                    finType: 'CUIT',
                    ssok: ssok
                });
                instance.data.onSavedData(newCompany);
                // Rels.insert({
                //   origin: Meteor.user().relatedPerson,
                //   type: 'worker',
                //   position: 'Gerente general',
                //   destiny: newCompany,
                // });

                // swal({
                //   title: name + ' creada!',
                //   text: 'Datos guardados',
                //   type: 'success'
                // });
                // const relType = FlowRouter.getQueryParam('relType');
                //   FlowRouter.go('showCompany', {
                //     _id: insert
                //   }, {
                //     relType: relType
                //   });
            }


        });


});



Template.Company_create.events({
    'submit form': (e, instance) => {
        e.preventDefault();

    },

    'click .js-cancel': function(e, instance) {
        instance.data.onCancel();
        swal({
            title: 'Cancelado',
            text: 'No se guardaron los datos',
            type: 'warning'
        });


    }

});
