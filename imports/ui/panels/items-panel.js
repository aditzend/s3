import './items-panel.html';
import '../components/item/item-search.js';
import '../components/item/item-show.js';


Template.Items_panel.onCreated(function() {

    this.autorun(() => {

        this.subscribe('items.own', workforId(), Session.get('workerRelId'));

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
Template.Items_panel.helpers({

    searchItemArgs() {
        const instance = Template.instance();

        return {
            mode: 'product',
            index: ProductsIndex,
            selectedItem(id) {
                instance.state.set('selectedItem', id);
                console.log("STATE>>>>>>>>>>>>>> SELECTED Item ", id);
            },
            itemNotFound(insertedText) {
                instance.state.set('creatingItem', insertedText);
            }
        }
    },

    showItemArgs(selectedItemId) {
        const instance = Template.instance();
        const item = Items.findOne(selectedItemId);
        return {
            item: item,

            onEdit(itemId) {
                instance.state.set('editingItem', itemId);
                console.log('showitemArgs >>>>>>>>>> EDIT ITEM:  ', itemId);
            },
            onDelete(itemId) {
                instance.state.set('deletingItem', itemId);
                console.log(' showitemArgs DELETE item ', itemId);
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
    editItemArgs() {
        const instance = Template.instance();
        const item = Items.findOne(instance.state.get('editingItem'));
        console.log('editItemArgs >>>>>>>>> EDIT ITEM :', item);
        return {
            item: item,
            onSavedData(itemId) {
                instance.state.set('editingItem', false);
                instance.state.set('selectedItem', itemId);
                console.log('editItemArgs onSavedData', itemId);

            },
            onCancel() {
                instance.state.set('editingItem', false);

            }

        }
    },

    createItemArgs() {
        const instance = Template.instance();

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







});
//vvvvvvvvvvvvvv STATE vvvvvvvvvvvvvv
Template.Items_panel.helpers({
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
        return instance.state.get('selectedItem');
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
    }


});
//vvvvvvvvvvvvvv HELPERS vvvvvvvvvvvvvv
Template.Items_panel.helpers({

});

Template.Items_panel.events({
    'click .js-deselect-item': function(e, instance) {
        instance.state.set('selectedItem', false);
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
