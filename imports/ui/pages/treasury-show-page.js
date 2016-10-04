import '/imports/ui/components/rel/rel-customer-edit.js';
import '/imports/ui/panels/cash-assets-panel.js';
import '/imports/ui/panels/payables-panel.js';
import '/imports/ui/panels/receivables-panel.js';
import '/imports/ui/components/person/person-create.js';
import './treasury-show-page.html';



Template.Treasury_show_page.onCreated(function() {
    this.autorun(() => {
        // this.subscribe('userData'),
        //     this.subscribe('persons.own'),
    });
});

Template.Treasury_show_page.helpers({
    // workingFor() {
    //     const instance = Template.instance();
    //     const companyId = workforId();
    //     instance.autorun(() => {
    //         if (instance.subscriptionsReady()) {
    //             const company = Companies.findOne(companyId);
    //             return companyId;
    //         } else {
    //             return false;
    //         }
    //     })
    // 
    // 
    // 
    // 
    // },
    // workfor() {
    //     const instance = Template.instance();
    //     const companyId = workforId();
    // 
    //     return companyId;
    // },
    companyLogo(companyId) {
        const company = Companies.findOne(companyId);
        if (company) {
            if (company.logo) {
                return company.logo;
            } else {
                return false
            }
        } else {
            return false
        }


    },
    companyName(companyId) {
        const company = Companies.findOne(companyId);
        if (company) {
            return company.name;
        } else {
            return '-'
        }
    }






});
