import './company-search.html';

Template.Company_search.onCreated(function() {
  
  console.log("data received at module Company_search", this.data);
  
    // this.state = new ReactiveDict();
    // this.state.setDefault({
    //     searchingIn: CustomersIndex
    // });
});
Template.Company_search.helpers({
    company_searchIndexAttributes: function() {
        return {
            'id': 'search-input',
            'class': 'form-control',
            'autocomplete': 'off',
            'placeholder': "Insertar parte del nombre o del CUIT  ",
            'style': "text-transform:uppercase"
        };
    },
    company_searchIndex: function() {
        const instance = Template.instance();
        const mode = instance.data.mode;
        switch (mode) {
            case 'customer':
                return CustomersIndex;
                break;
            case 'vendor':
                return VendorsIndex;
                break;
            default:
                return CompaniesIndex;
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

Template.Company_search.events({
    'click .js-search-result-item': function(e, instance) {
        //console.log("id elegido ", );
        instance.data.onCS_selectedCompany(e.target.id);

    },
    'click .js-create-company': function(e, instance) {
        const index = instance.data.index;
        let dict = index.getComponentDict();
        let insertedText = dict.get('searchDefinition')
            .toUpperCase();
        instance.data.companyNotFound(insertedText);
    }
});
