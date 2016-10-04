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

import './contact-edit.html';

Template.Contact_edit.onRendered(function() {
    const instance = Template.instance();
    const person = instance.data.person;
    const rel = instance.data.rel;
    const mode = instance.data.mode;

    var arrYears = bYearOptions();
    var selectYear = document.getElementById("bYearInput");
    for (i = 0; i < arrYears.length; i++) {
        selectYear.add(new Option(arrYears[i].text, arrYears[i].value));
    };
    var arrMonths = monthOptions();
    var selectMonth = document.getElementById("bMonthInput");
    for (i = 0; i < arrMonths.length; i++) {
        selectMonth.add(new Option(arrMonths[i].text, arrMonths[i].value));
    };
    var arrDays = dayOfMonthOptions();
    var selectDay = document.getElementById("bDayInput");
    for (i = 0; i < arrDays.length; i++) {
        selectDay.add(new Option(arrDays[i].text, arrDays[i].value));
    };

    if (instance.data.person == undefined) {
        console.log('creating person');
    } else {
        if (this.data.person.bDay === undefined) {
            $('#bYearInput')
                .val(5000)
                .change();
            $('#bMonthInput')
                .val(12)
                .change();
            $('#bDayInput')
                .val(0)
                .change();
        } else {
            $('#bYearInput')
                .val(this.data.person.bYear)
                .change();
            $('#bMonthInput')
                .val(this.data.person.bMonth)
                .change();
            $('#bDayInput')
                .val(this.data.person.bDay)
                .change();
        }
    }

    instance.$('[data-action=form]')
        .validate({

            rules: {
                name: {
                    required: false,
                    minlength: 2,
                    maxlength: 30
                },
                middleName: {
                    required: false,
                    minlength: 2,
                    maxlength: 30
                },
                lastName: {
                    required: false,
                    minlength: 2,
                    maxlength: 30
                },
                fin: {
                    required: true,
                    minlength: 7,
                    maxlength: 8
                },
                email: {
                    required: false,
                    email: true
                }



            },
            messages: {
                name: {
                    //required: 'Este campo no puede quedar vacío!',
                    minlength: 'El nombre debe tener mínimo {0} letras!',
                    maxlength: 'El nombre debe tener máximo {0} letras!',
                },
                middleName: {
                    //required: 'Este campo no puede quedar vacío!',
                    minlength: 'El nombre debe tener mínimo {0} letras!',
                    maxlength: 'El nombre debe tener máximo {0} letras!',
                },
                lastName: {
                    //required: 'Este campo no puede quedar vacío!',
                    minlength: 'El apellido debe tener mínimo {0} letras!',
                    maxlength: 'El apellido debe tener máximo {0} letras!',
                },
                fin: {
                    required: 'Este campo no puede quedar vacío!',
                    minlength: 'El DNI debe tener mínimo {0} números!',
                    maxlength: 'El DNI debe tener máximo {0} números!',
                },
                email: {
                    email: 'Este no es un email válido!',

                },


            },
            showErrors: function(errorMap, errorList) {
                instance.$("#summary")
                    .html("El formulario tiene errores (" +
                        this.numberOfInvalids() +
                        "), ver detalles en rojo.");
                this.defaultShowErrors();
            },
            submitHandler: function() {

                let treatedAs = instance.$('#treatedAsInput')
                    .val();
                let formalTreatment = instance.$('#formalTreatmentInput')
                    .is(':checked');
                let position = instance.$('#positionInput')
                    .val();

                let name = instance.$('#nameInput')
                    .val();
                // let middleName = instance.$('#middleNameInput')
                //     .val();
                let lastName = instance.$('#lastNameInput')
                    .val();

                let isMale = instance.$('#isMaleInput')
                    .is(':checked');
                let fin = instance.$('#finInput')
                    .val();
                let email = instance.$('#emailInput')
                    .val();
                let bDay = instance.$('#bDayInput')
                    .val();
                let bMonth = instance.$('#bMonthInput')
                    .val();
                let bYear = instance.$('#bYearInput')
                    .val();
                //var birthMoment;
                let mobile = instance.$('#mobileInput')
                    .val();
                let mobileCountry = (Phoneformat.countryForE164Number(mobile)) ?
                    Phoneformat.countryForE164Number(mobile) : 'AR';
                let phone = instance.$('#phoneInput')
                    .val();
                let phoneCountry = (Phoneformat.countryForE164Number(phone)) ?
                    Phoneformat.countryForE164Number(phone) : 'AR';
                let internalPhone = instance.$('#internalPhoneInput')
                    .val();

                if (
                    (mobile === '' || Phoneformat.isValidNumber(mobile,
                        mobileCountry)) &&
                    (phone === '' || Phoneformat.isValidNumber(phone,
                        phoneCountry))
                ) {

                    if (instance.data.person == undefined) {

                        console.log("INSERTING...");

                        const newPerson = Persons.insert({
                            name: name,
                            lastName: lastName,
                            fin: fin,
                            finType: 'DNI',
                            country: 'AR',
                            isMale: isMale,
                            email: email,
                            bDay: bDay,
                            bMonth: bMonth,
                            bYear: bYear,
                            mobile: mobile,
                            phone: phone,
                            internalPhone: internalPhone
                        });

                        const newRel = Rels.insert({
                            origin: newPerson,
                            destiny: instance.data.destiny,
                            type: instance.data.type,
                            position: position,
                            treatedAs: treatedAs,
                            formalTreatment: formalTreatment,
                            owner: instance.data.owner
                        });
                        console.log("new contactRel id :", newRel);
                        
                        instance.data.onSavedData();

                        swal({
                            title: 'Ok!',
                            text: 'Ahora ' + treatedAs + ' es ' + position + ' en ' + instance.data.company.name,
                            type: "success"
                        });



                    } else {
                        console.log("UPDATING...");

                        Persons.update({
                            _id: person._id
                        }, {
                            name: name,
                            lastName: lastName,
                            treatedAs: treatedAs,
                            fin: fin,
                            finType: 'DNI',
                            country: 'AR',
                            isMale: isMale,
                            email: email,
                            bDay: bDay,
                            bMonth: bMonth,
                            bYear: bYear,
                            mobile: mobile,
                            phone: phone,
                            internalPhone: internalPhone
                        });
                        Rels.update({
                            _id: rel._id
                        }, {
                            origin: person._id,
                            destiny: instance.data.destiny,
                            type: instance.data.type,
                            position: position,
                            treatedAs: treatedAs,
                            formalTreatment: formalTreatment,
                            owner: instance.data.owner
                        });
                        instance.data.onSavedData();
                        swal({
                            title: 'Ok!',
                            text: 'Los datos de  ' + treatedAs + ' se actualizaron. ',
                            type: "success"
                        });
                    }
                }
            }
        });
});

Template.Contact_edit.helpers({
    company() {
        const instance = Template.instance();
        return instance.data.company;
    }
})

Template.Contact_edit.events({


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

    },
    'focus [data-action=phoneInput]': function(e) {
        //$('#phoneExplanation').show();
    },
    'blur [data-action=phoneInput]': function(e, instance) {
        var intNum = e.target.value;
        var country = (Phoneformat.countryForE164Number(intNum)) ?
            Phoneformat.countryForE164Number(intNum) : 'AR';
        var element = instance.$('#phoneInput');
        var error = 'TELEFONO INCORRECTO';
        if (!Phoneformat.isValidNumber(intNum, country) && (intNum != '')) {
            element.parent("div")
                .addClass("has-error has-feedback");
            $(element)
                .next("span")
                .next("span")
                .html(error)
                .show();
            $(element)
                .parent("div")
                .addClass("has-error has-feedback");
            // $(element).next("span").addClass("fa fa-2x fa-remove");
        } else {
            $(element)
                .parent("div")
                .removeClass("has-error has-feedback");
            // $(element).next("span").removeClass("fa fa-2x fa-remove");
            $(element)
                .next("span")
                .next("span")
                .hide();
        }
        //console.log(Phoneformat.isValidNumber(intNum,country));
        //console.log(country);
        //console.log(intNum);

        //$('#phoneExplanation').hide();


    },
    'blur [data-action=mobileInput]': function(e, instance) {
        var intNum = e.target.value;
        var country = (Phoneformat.countryForE164Number(intNum)) ?
            Phoneformat.countryForE164Number(intNum) : 'AR';
        var element = instance.$('#mobileInput');
        var error = 'TELEFONO INCORRECTO';
        if (!Phoneformat.isValidNumber(intNum, country) && (intNum != '')) {
            element.parent("div")
                .addClass("has-error has-feedback");
            $(element)
                .next("span")
                .next("span")
                .html(error)
                .show();
            $(element)
                .parent("div")
                .addClass("has-error has-feedback");
            // $(element).next("span").addClass("fa fa-2x fa-remove");
        } else {
            $(element)
                .parent("div")
                .removeClass("has-error has-feedback");
            // $(element).next("span").removeClass("fa fa-2x fa-remove");
            $(element)
                .next("span")
                .next("span")
                .hide();
        }
    }

});
