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

import './person-edit.html';


Template.Person_edit.onCreated(function() {
    this.state = new ReactiveDict();
    this.state.setDefault({
        editing: false,

    });

    console.log('DATA person edit', this.data);



});


Template.Person_edit.onRendered(function() {
    const instance = Template.instance();

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

    if (Session.get('relatedPerson') === undefined) {
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
        //data of the person has been passed
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
        //
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
                console.log("submit request");

                let user = Meteor.userId();

                let name = instance.$('#nameInput')
                    .val();
                let middleName = instance.$('#middleNameInput')
                    .val();
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


                /*var intNum = e.target.phoneInput.value;
                if (Phoneformat.isValidNumber(intNum,country)) {
                  console.log("submited");
                }*/
                /*
                      if ((bDay === null) || (bMonth === null)) {
                        birthMoment = "UNKNOWN";
                      } else {
                        if ((bYear === 5000) || (bYear === null)) {
                          //birthMoment = "5000-" + bMonth + "-" + bDay;

                          birthMoment = moment({
                            year: 5000,
                            month: bMonth,
                            day: bDay
                          }).format();
                        } else {
                          birthMoment = moment({
                            year: bYear,
                            month: bMonth,
                            day: bDay
                          }).format();*/
                //birthMoment = bYear + "-" + bMonth + "-" + bDay;



                /*    var birthMoment = ((bDay===null) || (bMonth===null))
                                  ? null
                                  : moment({
                                        year: bYear,
                                        month: bMonth,
                                        day: bDay
                                        }).format('YYYY-MM-DD');*/



                //console.log(Phoneformat.isValidNumber(mobile, mobileCountry));

                if (
                    (mobile === '' || Phoneformat.isValidNumber(mobile,
                        mobileCountry)) &&
                    (phone === '' || Phoneformat.isValidNumber(phone,
                        phoneCountry))
                ) {
                    //console.log("SUBMISSION AUTHORIZED");
                    // let r = Meteor.user()
                    //     .relatedPerson;
                    // 
                    // if (r === undefined) {
                    //     console.log("create a relatedperson");
                    // 
                    // }
                    // 
                    // Persons.update(r, {
                    //     $set: {
                    //         name: name,
                    //         middleName: middleName,
                    //         lastName: lastName,
                    //         fin: fin,
                    //         finType: 'DNI',
                    //         country: 'AR',
                    //         isMale: isMale,
                    //         email: email,
                    //         bDay: bDay,
                    //         bMonth: bMonth,
                    //         bYear: bYear,
                    //         mobile: mobile,
                    //         phone: phone,
                    //         internalPhone: internalPhone
                    //     }
                    // });
                    let personData = {
                        name: name,
                        middleName: middleName,
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
                    }
                    instance.data.onSavedData(personData);
                    // instance.state.set('editing', false);





                    /*console.log('INSERT : ' + insert);
                    console.log("name : " + name);
                    console.log("middleName : " + middleName);
                    console.log("lastName : " + lastName);
                    console.log("treatedAs : " + treatedAs);
                    console.log("formalTreatment : " + formalTreatment);
                    console.log("isMale : " + isMale);
                    console.log("birthMoment : " + birthMoment);
                    console.log("mobile : " + mobile);
                    console.log("bDay : " + bDay);
                    console.log("bMonth : " + bMonth);
                    console.log("bYear : " + bYear);*/
                }
                /*  var createdActode = Actodes.findOne(insert);
      console.log(createdActode.treatedAs);

*/

            }
        });



});


Template.Person_edit.events({

    'click .js-save': function(e, instance) {
        //this.data.onSavedData(true);

    },
    'click .js-cancel': function(e, instance) {
        this.onCancel(true);

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
    },
    // 'focus [data-action=bDayInput]': function() {
    //   //var option = document.createElement("option");
    //   var select = document.getElementById("bDayInput");
    //   var arr = dayOfMonthOptions();
    //   for (i = 0; i < arr.length; i++) {
    //     select.add(new Option(arr[i].text, arr[i].value));
    //   }
    // },
    // 'focus [data-action=bMonthInput]': function() {
    //   //var option = document.createElement("option");
    //   var select = document.getElementById("bMonthInput");
    //   var arr = monthOptions();
    //   for (i = 0; i < arr.length; i++) {
    //     select.add(new Option(arr[i].text, arr[i].value));
    //   }
    // },
    // 'focus [data-action=bYearInput]': function() {
    //     let arrYears = bYearOptions();
    //     let selectYear = document.getElementById("bYearInput");
    //     for (i = 0; i < arrYears.length; i++) {
    //       selectYear.add(new Option(arrYears[i].text, arrYears[i].value));
    //     };
    //   }
    /*,
    'keyup [data-action=nameInput]' : function(e) {
      console.log(Template.instance().find( "[data-action=nameInput]" ).class);


    }*/
});
