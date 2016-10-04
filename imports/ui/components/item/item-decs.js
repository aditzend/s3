// import './item-decs.html';
// import './item-search.js';
// import './item-show.js';
// 
// 
// Template.Items_panel.onCreated(function() {
// 
//     this.autorun(() => {
// 
//         this.subscribe('items.own', workforId(), Session.get('workerRelId'));
// 
//     });
// 
//     this.state = new ReactiveDict();
//     this.state.setDefault({
//         selectedItem: false,
//         creatingItem: false,
//         editingItem: false,
//         itemCreated: false,
//         creatingItem: false,
//         editingItem: false,
//         deletingItem: false,
// 
//     });
// });
// 
// //vvvvvvvvvvvvvv ARGS vvvvvvvvvvvvvv
// Template.Items_panel.helpers({
// 
//     searchItemArgs() {
//         const instance = Template.instance();
// 
//         return {
//             mode: 'product',
//             index: ProductsIndex,
//             selectedItem(id) {
//                 instance.state.set('selectedItem', id);
//                 console.log("STATE>>>>>>>>>>>>>> SELECTED Item ", id);
//             },
//             itemNotFound(insertedText) {
//                 instance.state.set('creatingItem', insertedText);
//             }
//         }
//     },
// 
//     showItemArgs(selectedItemId) {
//         const instance = Template.instance();
//         const item = Items.findOne(selectedItemId);
//         return {
//             item: item,
// 
//             onEdit(itemId) {
//                 instance.state.set('editingItem', itemId);
//                 console.log('showitemArgs >>>>>>>>>> EDIT ITEM:  ', itemId);
//             },
//             onDelete(itemId) {
//                 instance.state.set('deletingItem', itemId);
//                 console.log(' showitemArgs DELETE item ', itemId);
//                 swal({
//                         title: "Borramos a " + item.name + ' ?',
//                         text: "No se puede recuperar esta informacion!",
//                         type: "warning",
//                         showCancelButton: true,
//                         confirmButtonColor: "#DD6B55",
//                         confirmButtonText: "Sí, borrar!",
//                         cancelButtonText: "No, cancelar por favor!",
//                         closeOnConfirm: false,
//                         closeOnCancel: false
//                     },
//                     function(isConfirm) {
//                         if (isConfirm) {
//                             const deleted = Items.remove(itemId);
//                             instance.state.set('selectedItem', false);
//                             swal(item.name + " fue eliminada.", "Se borraron los datos", "success");
//                         } else {
//                             swal("Eliminación cancelada!", item.name + " esta segura :)", "error");
//                         }
//                     });
// 
//             }
//         }
//     },
//     editItemArgs() {
//         const instance = Template.instance();
//         const item = Items.findOne(instance.state.get('editingItem'));
//         console.log('editItemArgs >>>>>>>>> EDIT ITEM :', item);
//         return {
//             item: item,
//             onSavedData(itemId) {
//                 instance.state.set('editingItem', false);
//                 instance.state.set('selectedItem', itemId);
//                 console.log('editItemArgs onSavedData', itemId);
// 
//             },
//             onCancel() {
//                 instance.state.set('editingItem', false);
// 
//             }
// 
//         }
//     },
// 
//     createItemArgs() {
//         const instance = Template.instance();
// 
//         return {
//             item: {
//                 name: instance.state.get('creatingItem')
//             },
//             // person,
//             onSavedData(newItem) {
//                 instance.state.set('creatingItem', false);
//                 instance.state.set('selectedItem', newItem);
// 
//             },
//             onCancel() {
//                 instance.state.set('creatingItem', false);
// 
//             }
//         }
//     },
// 
// 
// 
// 
// 
// 
// 
// });
// //vvvvvvvvvvvvvv STATE vvvvvvvvvvvvvv
// Template.Items_panel.helpers({
//     editingVendorRel() {
//         const instance = Template.instance();
//         return instance.state.get('editingVendorRel');
//     },
//     editingItem() {
//         const instance = Template.instance();
//         return instance.state.get('editingItem');
//     },
// 
//     selectedItem() {
//         const instance = Template.instance();
//         return instance.state.get('selectedItem');
//     },
//     creatingItem() {
//         const instance = Template.instance();
//         return instance.state.get('creatingItem');
//     },
//     itemCreated() {
//         const instance = Template.instance();
//         return instance.state.get('itemCreated');
//     },
//     creatingItem() {
//         const instance = Template.instance();
//         return instance.state.get('creatingItem');
//     }
// 
// 
// });
// //vvvvvvvvvvvvvv HELPERS vvvvvvvvvvvvvv
// Template.Items_panel.helpers({
// 
// });
// 
// Template.Items_panel.events({
//     'click .js-deselect-item': function(e, instance) {
//         instance.state.set('selectedItem', false);
//     },
// 
//     'click .js-item-edit': function(e, instance) {
//         instance.state.set('editingItem', true);
//     },
//     'click .js-contact-create': function(e, instance) {
//         instance.state.set('creatingItem', true);
//     },
//     'click .js-place-create': function(e, instance) {
//         instance.state.set('creatingPlace', true);
//     },
//     'click .js-confirm-deletion': function(e, instance) {
//         const relId = instance.state.get('deletingItemRel');
//         console.log('delete confirmed ', relId);
// 
//     },
//     'click .js-cancel-deletion': function(e, instance) {
//         instance.data.onEdit(instance.data.relId);
//     }
// });









//------------------------legacy------------------------------------------------
import './item-decs.html';
import './item-search.js';
import './item-show.js';
import './item-motor-edit.js';


Template.Item_DECS.onCreated(function() {

    this.autorun(() => {
      const w = workfor();

        this.subscribe('items.own', w._id);

    });

    this.state = new ReactiveDict();
    this.state.setDefault({
        selectedItem: false,
        creatingItem: false,
        editingItem: false,
        itemCreated: false,
        creatingItem: false,
        editingItem: false,
        deletingItem: false,

    });
});

//vvvvvvvvvvvvvv ARGS vvvvvvvvvvvvvv
Template.Item_DECS.helpers({

    searchItemArgs() {
        const instance = Template.instance();

        return {
            //mode: 'product',
            mode: instance.data.mode,
            index: ProductsIndex,
            selectedItem(id) {
                instance.state.set('selectedItem', id);
                console.log("STATE>>>>>>>>>>>>>> SELECTED Item ", id);
            },
            itemNotFound(insertedText) {
                instance.state.set('creatingItem', insertedText);
                console.log("creatingItem", insertedText);
                
            }
        }
    },
    // showthis() {
    //     return {
    //         foo: 'bar'
    //     }
    // },
    showItemArgs(selectedItemId) {
        const instance = Template.instance();
        const item = Items.findOne(selectedItemId);
        instance.data.selectedItemName(item.name);
        instance.data.selectedItemDesc(item.desc);
        
        instance.data.selectedItemProfitCenter(item.profitCenter);

        instance.data.selectedItemId(selectedItemId);

        return {
            item: item,

            onEdit(itemId) {
                instance.state.set('editingItem', itemId);
                // console.log('EDIT CONTACT REL ', relId);
            },
            onDelete(itemId) {
                instance.state.set('deletingItem', itemId);
                // console.log('DELETE CONTACT REL ', relId);
                swal({
                        title: "Borramos a " + item.name + ' ?',
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
                            const deleted = Items.remove(itemId);
                            instance.state.set('selectedItem', false);
                            swal(item.name + " fue eliminada.", "Se borraron los datos", "success");
                        } else {
                            swal("Eliminación cancelada!", item.name + " esta segura :)", "error");
                        }
                    });

            }
        }
    },
    editItemArgs(id) {
        const instance = Template.instance();
        const item = Items.findOne(id);
        return {
            item: item,
            onSavedData() {
                instance.state.set('editingItem', false);

            },
            onCancel() {
                instance.state.set('editingItem', false);

            }

        }
    },
    showVendorRelArgs(itemId) {
        const instance = Template.instance();
        const rel = Rels.findOne({
            type: 'vendor',
            origin: itemId,
            destiny: HARDCODE_OWNER
        });
        return {
            rel,
            onEdit(relId) {
                instance.state.set('editingVendorRel', relId);
                // console.log('EDIT CONTACT REL ', relId);
            }
        }

    },
    editVendorRelArgs(itemId) {
        const instance = Template.instance();

        return {
            type: 'vendor',
            origin: itemId,
            destiny: HARDCODE_OWNER,
            onSavedData(relId) {
                instance.state.set('createdRel', relId);
                instance.state.set('editingVendorRel', false);

            },
            onCancel() {
                instance.state.set('editingVendorRel', false);
                console.log('Cancelado');
            }
        }
    },
    createItemArgs() {
        const instance = Template.instance();
console.log("item name", instance.state.get('creatingItem'));

        return {
            item: {
                name: instance.state.get('creatingItem')
            },
            // person,
            onSavedData(newItem) {
                instance.state.set('creatingItem', false);
                instance.state.set('selectedItem', newItem);

            },
            onCancel() {
                instance.state.set('creatingItem', false);

            }
        }
    },

    editItemArgs(itemId, personId, relId) {
        const instance = Template.instance();
        const item = Items.findOne(itemId);
        const person = Persons.findOne(personId);
        const rel = Rels.findOne(relId);
        return {
            destiny: itemId,
            owner: HARDCODE_OWNER,
            type: 'contact',
            item: item,
            person: person,
            rel: rel,
            onSavedData() {
                // console.log('rel created contact', relId);
                instance.state.set('editingItem', false);
                instance.state.set('creatingItem', false);

            },
            onCancel() {
                // console.log('cancel');
                instance.state.set('editingItem', false);
                instance.state.set('creatingItem', false);

            }
        }
    },
    editPlaceArgs(itemId, placeId, relId) {
        const instance = Template.instance();
        const item = Items.findOne(itemId);
        const place = Places.findOne(placeId);
        const rel = Rels.findOne(relId);
        return {
            destiny: itemId,
            owner: HARDCODE_OWNER,
            type: 'place',
            item: item,
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
                // console.log('EDIT CONTACT REL ', relId);
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
Template.Item_DECS.helpers({
    editingVendorRel() {
        const instance = Template.instance();
        return instance.state.get('editingVendorRel');
    },
    editingItem() {
        const instance = Template.instance();
        return instance.state.get('editingItem');
    },

    selectedItem() {
        const instance = Template.instance();
        const item = instance.state.get('selectedItem');
        return item;
    },
    creatingItem() {
        const instance = Template.instance();
        return instance.state.get('creatingItem');
    },
    itemCreated() {
        const instance = Template.instance();
        return instance.state.get('itemCreated');
    },
    creatingItem() {
        const instance = Template.instance();
        return instance.state.get('creatingItem');
    },
    creatingPlace() {
        const instance = Template.instance();
        return instance.state.get('creatingPlace');
    },
    editingPlace() {
        const instance = Template.instance();
        return instance.state.get('editingPlace');
    },
    editingItem(relId) {
        const instance = Template.instance();
        return (relId == instance.state.get('editingItem')) ? true : false;
    }
});
//vvvvvvvvvvvvvv HELPERS vvvvvvvvvvvvvv
Template.Item_DECS.helpers({
    rel(item) {
        const rel = Rels.findOne({
            type: 'vendor',
            origin: item,
            destiny: HARDCODE_OWNER
        });
        return rel;
    },
    contactRels(item) {
        const rels = Rels.find({
            type: 'contact',
            // origin: item,
            destiny: item
        });
        return rels;
    },
    placeRels(item) {
        const rels = Rels.find({
            type: 'place',
            // origin: item,
            destiny: item
        });
        return rels;
    }
});

Template.Item_DECS.events({
    'click .js-deselect-item': function(e, instance) {
        instance.state.set('selectedItem', false);
    },
    'click .js-rel-vendor-edit': function(e, instance) {
        instance.state.set('editingVendorRel', true);
    },
    'click .js-item-edit': function(e, instance) {
        instance.state.set('editingItem', true);
    },
    'click .js-contact-create': function(e, instance) {
        instance.state.set('creatingItem', true);
    },
    'click .js-place-create': function(e, instance) {
        instance.state.set('creatingPlace', true);
    },
    'click .js-confirm-deletion': function(e, instance) {
        const relId = instance.state.get('deletingItemRel');
        console.log('delete confirmed ', relId);

    },
    'click .js-cancel-deletion': function(e, instance) {
        instance.data.onEdit(instance.data.relId);
    }
});
