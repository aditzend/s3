import {
    Meteor
}
from 'meteor/meteor';

import {
    ValidatedMethod
}
from 'meteor/mdg:validated-method';

Meteor.methods({
    'ad' () {
        console.log("ALAMEDA");

        return 'Alameda';
    },
    'createAdmin' (userId, companyId) {
        console.log("creating admin...");
        let currentUser = Meteor.users.findOne(this.userId);

        // if (currentUser.isSuperAdmin) {
            // console.log("you are a super admin");
            Meteor.users.update({
                _id: userId
            }, {
                $set: {
                    admins: companyId
                }
            });
        // } else {
        //     console.log("ADMIN CREATED");
            //create a danger log or send an email to superadmin
      //  }
    },


    'propagateWorkerRelToUser' (relId) {
        console.log("propagating worker rel to user...");
        let rel = Rels.findOne(relId);
        let company = Companies.findOne(rel.destiny);
        let currentUser = Meteor.users.findOne(this.userId);
        if (rel.destiny === currentUser.admins) {
            console.log("you can do this because you admin this company");
            console.log("user id: ", rel.author);
            let job = {
                companyName: company.name,
                companyLogo: company.logo,
                companyId: rel.destiny,
                position: rel.position,
                relId: relId
            };
            Meteor.users.update({
                _id: rel.author
            }, {
                $push: {
                    jobs: job
                }
            })

        }

    }
});
