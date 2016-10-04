import './company-decs.html';
import './company-search.js';
import './company-edit.js';
import '../contact/contact-edit.js';
import '../contact/contact-show.js';
import '../place/place-show.js';
import '../place/place-edit.js';
import '../birthday/birthday-show.js';
import '../rel/rel-customer-show.js';
import '../rel/rel-customer-edit.js';
import '../rel/rel-vendor-show.js';
import '../rel/rel-vendor-edit.js';


Template.Company_DECS.onCreated(function() {
    this.autorun(() => {
        this.subscribe('rels.customers' );
        this.subscribe('rels.vendors');
        this.subscribe('rels.places');
        this.subscribe('rels.contacts');
        // this.subscribe('persons.test');
        // this.subscribe('places.test');
    })

    this.state = new ReactiveDict();
    this.state.setDefault({
        selectedCompany: false,
        createdRel: false,
        editingCustomerRel: false,
        creatingCompany: false,
        editingCompany: false,
        companyCreated: false,
        creatingContact: false,
        editingContact: false,
        deletingContact: false,
        creatingPlace: false,
        editingPlace: false,
        mode: false

    });
});

Template.Company_DECS.onRendered(function() {
    const instance = Template.instance();
    instance.state.set('selectedCompany', instance.data.selectedCompanyId);
    instance.state.set('mode', instance.data.mode);
    console.log('DATA RECEIVED AT Company_DECS', instance.data);
});


//vvvvvvvvvvvvvv ARGS vvvvvvvvvvvvvv
Template.Company_DECS.helpers({
    // params(str) {
    //     const instance = Template.instance();
    //     return (instance.data.params === str) ? true : false;
    // },

    searchCompanyArgs() {
        const instance = Template.instance();

        return {
            mode: instance.data.mode,
            index: instance.data.index,
            //CS = Company_search  DECS= Company_DECS
            onCS_selectedCompany(id) {
                instance.state.set('selectedCompany', id);
                console.log('DECS searchCompanyArgs SELECTED ID:' , id);
                const w = workfor();
                const company = Companies.findOne(id);
                const rel = Rels.findOne({
                    type: instance.data.mode,
                    origin: id,
                    destiny: w._id
                });
                //DECS is subscribed to Companies, its parents may not!
                
                // instance.data.onDECS_companyFin(company.fin);
                // instance.data.onDECS_companyfinType(company.finType);
                // instance.data.onDECS_companyName(company.name);
                instance.data.onDECS_selectedCompany(
                  id,
                  company.name,
                  company.fin,
                  company.finType,
                  rel.paymentDays,
                  rel.paymentMethod,
                  rel.paymentMethodName,
                  rel.paymentMethodDays
                );
                console.log('SENDING DATA TO OSP', company);
                

                // console.log("STATE>>>>>>>>>>>>>> SELECTED COMPANY ", id);
            },
            companyNotFound(insertedText) {
                instance.state.set('creatingCompany', insertedText);
            }
        }
    },
    showCompanyArgs(selectedCompanyId) {
        const instance = Template.instance();
        const company = Companies.findOne(selectedCompanyId);

        return {
            company: company,
            onEdit(companyId) {
                instance.state.set('editingCompany', companyId);
                // console.log('EDIT CONTACT REL ', relId);
            },
            onDelete(companyId) {
                instance.state.set('deletingCompany', companyId);
                // console.log('DELETE CONTACT REL ', relId);
                swal({
                        title: "Borramos a " + company.name + ' ?',
                        text: "No se puede recuperar esta informacion!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Sí, borrar!",
                        cancelButtonText: "No, cancelar por favor!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            const deleted = Companies.remove(companyId);
                            instance.state.set('selectedCompany', false);
                            swal(company.name + " fue eliminada.", "Se borraron los datos", "success");
                        } else {
                            swal("Eliminación cancelada!", company.name + " esta segura :)", "error");
                        }
                    });

            }
        }
    },
    editCompanyArgs(id) {
        const instance = Template.instance();
        const company = Companies.findOne(id);
        return {
            company: company,
            onSavedData() {
                instance.state.set('editingCompany', false);

            },
            onCancel() {
                instance.state.set('editingCompany', false);

            }

        }
    },
    showRelArgs(companyId) {
        const instance = Template.instance();
        const w = workfor();
        const rel = Rels.findOne({
            type: instance.state.get('mode'),
            origin: companyId,
            destiny: w._id
        });
        //  instance.data.paymentDays(rel.paymentDays);
        return {
            rel,
            //RCS=Rel_customer_show
            onRCS_edit(relId) {
                instance.state.set('editingCustomerRel', relId);
                // console.log('EDIT CONTACT REL ', relId);
            }
        }

    },
    editRelArgs(companyId) {
        const instance = Template.instance();
        const w = workfor();
        return {
            type: instance.state.get('mode'),
            origin: companyId,
            destiny: w._id,
            //RCE=Rel_customer_edit
            onRCE_savedData(relId) {
                instance.state.set('createdRel', relId);
                instance.state.set('editingCustomerRel', false);
            },
            onRCE_cancel() {
                instance.state.set('editingCustomerRel', false);
                console.log('Cancelado');
            }
        }
    },
    createCompanyArgs() {
        const instance = Template.instance();

        return {
            company: {
                name: instance.state.get('creatingCompany')
            },
            // person,
            onSavedData(newCompany) {
                instance.state.set('creatingCompany', false);
                instance.state.set('selectedCompany', newCompany);

            },
            onCancel() {
                instance.state.set('creatingCompany', false);

            }
        }
    },
    showContactArgs(personId, relId) {
        const instance = Template.instance();

        const person = Persons.findOne(personId);
        const rel = Rels.findOne(relId);
        return {
            person: person,
            rel: rel,

            onEdit(relId) {
                instance.state.set('editingContact', relId);
                // console.log('EDIT CONTACT REL ', relId);
            },
            onDelete(relId) {
                instance.state.set('deletingContact', relId);
                // console.log('DELETE CONTACT REL ', relId);
                swal({
                        title: "Estas seguro?",
                        text: "No se puede recuperar esta informacion!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Si, borrarlo!",
                        cancelButtonText: "No, cancelar por favor!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm) {
                        if (isConfirm) {

                            const deleted = Rels.remove(relId);
                            console.log('deleted', deleted);


                            swal("Eliminado!", "Este contacto fue eliminado.", "success");
                        } else {
                            swal("Cancelado", "Este contacto esta seguro :)", "error");
                        }
                    });

            }
        }
    },

    editContactArgs(companyId, personId, relId) {
        const instance = Template.instance();
        const company = Companies.findOne(companyId);
        const person = Persons.findOne(personId);
        const rel = Rels.findOne(relId);
        const w = workfor();
        return {
            destiny: companyId,
            owner: w._id,
            type: 'contact',
            company: company,
            person: person,
            rel: rel,
            onSavedData() {
                // console.log('rel created contact', relId);
                instance.state.set('editingContact', false);
                instance.state.set('creatingContact', false);

            },
            onCancel() {
                // console.log('cancel');
                instance.state.set('editingContact', false);
                instance.state.set('creatingContact', false);

            }
        }
    },
    editPlaceArgs(companyId, placeId, relId) {
        const instance = Template.instance();
        let rel = Rels.findOne(relId);
        const place = Places.findOne(placeId);
        const w = workfor();
        console.log('STATE VAR editingPlace :', instance.state.get('editingPlace'));
        console.log('relId parameter received', relId);

        return {
            destiny: companyId,
            owner: w._id,
            type: 'place',
            place: place,
            rel: rel,
            onSavedData() {
                // console.log('rel created contact', relId);
                instance.state.set('editingPlace', false);
                instance.state.set('creatingPlace', false);

            },
            onCancel() {
                // console.log('cancel');
                instance.state.set('editingPlace', false);
                instance.state.set('creatingPlace', false);

            }
        }
    },


    showPlaceArgs(placeId, relId) {
        const instance = Template.instance();
        const place = Places.findOne(placeId);
        const rel = Rels.findOne(relId);
        return {
            place: place,
            rel: rel,
            onEdit(relId) {
                instance.state.set('editingPlace', relId);
                console.log('EDIT place rel', relId);
            },
            onDelete(relId) {
                instance.state.set('deletingPlace', relId);
                // console.log('DELETE CONTACT REL ', relId);
                swal({
                        title: "Estas seguro?",
                        text: "No se puede recuperar esta informacion!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Si, borrarlo!",
                        cancelButtonText: "No, cancelar por favor!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm) {
                        if (isConfirm) {

                            const deleted = Rels.remove(relId);
                            console.log('deleted', deleted);


                            swal("Eliminado!", "Este lugar fue eliminado.", "success");
                        } else {
                            swal("Cancelado", "Este lugar esta seguro :)", "error");
                        }
                    });

            }
        }
    },


});
//vvvvvvvvvvvvvv STATE vvvvvvvvvvvvvv
Template.Company_DECS.helpers({
    editingCustomerRel() {
        const instance = Template.instance();
        return instance.state.get('editingCustomerRel');
    },
    editingCompany() {
        const instance = Template.instance();
        return instance.state.get('editingCompany');
    },
    selectedCompany() {
        const instance = Template.instance();
        return instance.state.get('selectedCompany');
    },
    creatingCompany() {
        const instance = Template.instance();
        return instance.state.get('creatingCompany');
    },
    companyCreated() {
        const instance = Template.instance();
        return instance.state.get('companyCreated');
    },
    creatingContact() {
        const instance = Template.instance();
        return instance.state.get('creatingContact');
    },
    creatingPlace() {
        const instance = Template.instance();
        return instance.state.get('creatingPlace');
    },
    editingPlace(relId) {
        const instance = Template.instance();
        return (instance.state.get('editingPlace') === relId) ? true : false;
    },
    editingContact(relId) {
        const instance = Template.instance();
        return (relId == instance.state.get('editingContact')) ? true : false;
    }
});
//vvvvvvvvvvvvvv HELPERS vvvvvvvvvvvvvv
Template.Company_DECS.helpers({
    rel(company) {
        const instance = Template.instance();
        const w = workfor();
        const rel = Rels.findOne({
            type: instance.state.get('mode'),
            origin: company,
            destiny: w._id
        });
        return rel;
    },
    contactRels(company) {
        const rels = Rels.find({
            type: 'contact',
            // origin: company,
            destiny: company
        });
        return rels;
    },
    placeRels(company) {
        const rels = Rels.find({
            type: 'place',
            // origin: company,
            destiny: company
        });
        return rels;
    },
    mode(str) {
        const instance = Template.instance();
        return (str === instance.data.mode) ? true : false;
    }
});

Template.Company_DECS.events({
    'click .js-deselect-company': function(e, instance) {
        instance.state.set('selectedCompany', false);
    },
    'click .js-rel-customer-edit': function(e, instance) {
        instance.state.set('editingCustomerRel', true);
    },
    'click .js-company-edit': function(e, instance) {
        instance.state.set('editingCompany', true);
    },
    'click .js-contact-create': function(e, instance) {
        instance.state.set('creatingContact', true);
        //console.log('show contact edit to create..........');
    },
    'click .js-place-create': function(e, instance) {
        instance.state.set('creatingPlace', true);
    },
    'click .js-confirm-deletion': function(e, instance) {
        const relId = instance.state.get('deletingContactRel');
        console.log('delete confirmed ', relId);

    },
    'click .js-cancel-deletion': function(e, instance) {
        instance.data.onEdit(instance.data.relId);
    }
});
