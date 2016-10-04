Meteor.methods({
    'rels.checkAdmin' () {
        console.log('heyyyy');
    },
    'rels.grantCompanyAccess' ({
        workerRelId
    }) {
        new SimpleSchema({
                workerRelId: {
                    type: String
                }
            })
            .validate({
                workerRelId
            });

        const rel = Rels.findOne(workerRelId);
        const company = Companies.findOne(rel.destiny);


        if (rel.owner === company.ssok) {
            console.log(company);
            return 'access granted';
        } else {
            //throw new Meteor.Error('La empresa no existe', 'Error');

        }



    },
    'rels.upsertWorker' ({
        origin,
        destiny,
        position
    }) {
        new SimpleSchema({
                origin: {
                    type: String
                },
                destiny: {
                    type: String
                },
                position: {
                    type: String
                }
            })
            .validate({
                origin,
                destiny,
                position
            });

        const rel = Rels.findOne({
            origin: origin,
            destiny: destiny,
            type: 'worker'
        });
        const c = Companies.findOne(destiny);

        const ssok = c.ssok;

        // if (!todo.editableBy(this.userId)) {
        //   throw new Meteor.Error('todos.updateText.unauthorized',
        //     'Cannot edit todos in a private list that is not yours');
        // }
        if (rel) {
            Rels.update(rel._id, {
                $set: {
                    position: position,
                    validated: false

                }
            });
        } else {
            Rels.insert({
                origin: origin,
                destiny: destiny,
                type: 'worker',
                position: position,
                validated: false,
                owner: ssok
            });
        }


    }
});
