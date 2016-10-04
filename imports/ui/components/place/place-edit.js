import './place-edit.html';

Template.Place_edit.onRendered(function() {
    const instance = Template.instance();
    //const company = instance.data.company;
    const place = instance.data.place;
    const rel = instance.data.rel;

    if (place) {
        $('#placeType')
            .val(place.placeType);
    }



    //console.log(instance.data);

    //-----------------------------geocomplete
    // this.autorun(() => {
    //     if (GoogleMaps.loaded()) {
    //         $('#addressInput')
    //             .geocomplete({
    //                 map: ".map_canvas",
    //                 location: [$('#lat')
    //                     .val(), $('#lng')
    //                     .val()
    //                 ],
    //                 details: "[data-action=result]",
    //                 markerOptions: {
    //                     draggable: true
    //                 }
    //             });
    // 
    //     }
    //     $("#addressInput")
    //         .geocomplete()
    //         .bind("geocode:result", function(event, result) {
    //             // console.log(result);
    //         });
    //     $("#addressInput")
    //         .bind("geocode:dragged", function(event, latLng) {
    //             $("input[name=lat]")
    //                 .val(latLng.lat());
    //             // console.log(latLng.lat());
    // 
    //             $("input[name=lng]")
    //                 .val(latLng.lng());
    //         });
    // 
    // });

    $('[data-action=result]')
        .validate({
            submitHandler: function() {
                const route = $('#route')
                    .val();
                const street_number = $('#street_number')
                    .val();
                const postal_code = $('#postal_code')
                    .val();
                const lat = $('#lat')
                    .val();
                const lng = $('#lng')
                    .val();
                const locality = $('#locality')
                    .val();
                const administrative_area_level_2 = $(
                        '#administrative_area_level_2')
                    .val();
                const administrative_area_level_1 = $(
                        '#administrative_area_level_1')
                    .val();
                const country = $('#country')
                    .val();
                const country_short = $('#country_short')
                    .val();
                const placeType = $('#placeType')
                    .val();
                const notes = $('#notes')
                    .val();
                const phone = instance.$('#phoneInput')
                    .val();
                const phoneCountry = (Phoneformat.countryForE164Number(phone)) ?
                    Phoneformat.countryForE164Number(phone) : 'AR';
                const internalPhone = instance.$('#internalPhoneInput')
                    .val();

                if (
                    phone === '' || Phoneformat.isValidNumber(phone, phoneCountry)
                ) {
                    console.log('phones ok');
                    if (place == undefined) {
                        const newPlace = Places.insert({
                            route: route,
                            street_number: street_number,
                            postal_code: postal_code,
                            lat: lat,
                            lng: lng,
                            locality: locality,
                            administrative_area_level_2: administrative_area_level_2,
                            administrative_area_level_1: administrative_area_level_1,
                            country: country,
                            country_short: country_short,
                            placeType: placeType,
                            notes: notes,
                            phone: phone,
                            internalPhone: internalPhone,
                            owner: instance.data.destiny

                        });

                        const newRel = Rels.insert({
                            origin: newPlace,
                            destiny: instance.data.destiny,
                            type: instance.data.type,
                            owner: instance.data.owner
                        });
                        instance.data.onSavedData();

                        swal({
                            title: 'Nuevo lugar registrado!',

                            type: "success"
                        });
                    } else {
                        console.log("UPDATING...");
                        Places.update({
                            _id: place._id
                        }, {
                            route: route,
                            street_number: street_number,
                            postal_code: postal_code,
                            lat: lat,
                            lng: lng,
                            locality: locality,
                            administrative_area_level_2: administrative_area_level_2,
                            administrative_area_level_1: administrative_area_level_1,
                            country: country,
                            country_short: country_short,
                            placeType: placeType,
                            phone: phone,
                            internalPhone: internalPhone,
                            notes: notes
                        });
                        Rels.update({
                            _id: rel._id
                        }, {
                            origin: place._id,
                            destiny: instance.data.destiny,
                            type: instance.data.type,
                            owner: instance.data.owner
                        });
                        instance.data.onSavedData();
                        swal({
                            title: 'Los datos de este lugar se actualizaron. ',
                            type: "success"
                        });
                    }
                }
            }

        });
});


Template.Place_edit.events({
    'submit [data-action=result]': function(e) {
        e.preventDefault();
        console.log("result SUBMIT ATEMPT");

    },
    'submit [data-action=search]': (e) => {
        e.preventDefault();
        $('#addressInput')
            .trigger("geocode");
    },
    'click .js-cancel': (e, instance) => {
        instance.data.onCancel();
        swal('Cancelado!', 'Los cambios no se guardaron', 'error');
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


    }
});
