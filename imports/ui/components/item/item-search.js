import './item-search.html';

Template.Item_search.onCreated(function() {
  this.autorun(() => {
    let w = workfor();
    let itemsSubscription = this.subscribe('Items.own', w._id);
    // let motor = Items.findOne("r5xhgepRbYKasZ6SQ");
    // this.data.motor = motor;
  });

});
Template.Item_search.helpers({
    item_searchIndexAttributes: function() {
        return {
            'id': 'search-input',
            'class': 'form-control',
            'autocomplete': 'off',
            'placeholder': "Buscar producto... ",
            'style': "text-transform:uppercase"
        };
    },
    item_searchIndex: function() {
        const instance = Template.instance();
        const mode = instance.data.mode;
        switch (mode) {
            case 'product':
                return ProductsIndex;
                break;
            case 'input':
                return InputsIndex;
                break;
            default:
                return ItemsIndex;
        }
    },
    insertedText: function() {
        const instance = Template.instance();
        const index = instance.data.index;
        let dict = index.getComponentDict();
        return dict.get('searchDefinition')
            .toUpperCase();
    }
});

Template.Item_search.events({
    'click .js-search-result-item': function(e, instance) {
        //console.log("id elegido ", );
        instance.data.selectedItem(e.target.id);

    },
    'click .js-create-item': function(e, instance) {
        const index = instance.data.index;
        let dict = index.getComponentDict();
        let insertedText = dict.get('searchDefinition')
            .toUpperCase();
            instance.data.itemNotFound(insertedText);
            
    }
});
