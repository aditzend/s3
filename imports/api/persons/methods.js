Meteor.methods({
    createPerson(person) {
        let personData = {
            name: person.name,
            middleName: person.middleName,
            lastName: person.lastName,
            bDay: person.bDay,
            bMonth: person.bMonth,
            bYear: person.bYear,
            email: person.email,
            phone: person.phone,
            mobile: person.mobile,
            internalPhone: person.internalPhone,
            isMale: person.isMale,
            fin: person.fin,
            finType: person.finType
        };

        let newPerson = Persons.insert(personData);
        Meteor.users.update({
            _id: this.userId
        }, {
            $set: personData
        });

        return newPerson;



    },
    updateRelatedPersonInUser(personId) {
        const userssok = Random.secret([26]) + this.userId;

        const person = Persons.findOne(personId);

        Meteor.users.update(this.userId, {
            $set: {
                relatedPerson: personId,
                userssok: userssok,
                name: person.name,
                lastName: person.lastName,
                jobs: []
            }
        });
        Persons.update(personId, {
            $set: {

                userssok: userssok
            }
        });

    },
    updatePerson(id, person) {

        let editedPerson = Persons.update({
            _id: id
        }, {
            $set: {
                name: person.name,
                middleName: person.middleName,
                lastName: person.lastName,
                bDay: person.bDay,
                bMonth: person.bMonth,
                bYear: person.bYear,
                email: person.email,
                phone: person.phone,
                mobile: person.mobile,
                internalPhone: person.internalPhone,
                isMale: person.isMale,
                fin: person.fin,
                finType: person.finType,

            }
        });
        Meteor.users.update(this.userId, {
            $set: {

                name: person.name,
                lastName: person.lastName
            }
        });
    

        return editedPerson;



    },
})
