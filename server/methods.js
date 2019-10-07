Meteor.methods({
    'insertLocation': function (text, selectedIds) {
        Locations.insert({name: text, parent: selectedIds});
    },
    'insertSchedule': function (document, id) {
        CloudAccessRules.update({_id: id}, {
            $push: {
                schedules: document
            }
        });
    },
    'deleteLocation': function (selectedIds) {
        Locations.remove({_id: selectedIds});
    },
    'insertActionUrl': function (docFrom, docTo) {
        CloudAccessRules.update({}, {
            $push: {
                actions: {
                    from: docFrom,
                    to: docTo
                }
            }
        });
    },
    'cloudAccessRulesUpdate': function (docId, obj) {
        CloudAccessRules.update({_id: docId}, {$set: obj});
    },
    'cloudAccessRulesInsert': function (obj) {
        CloudAccessRules.insert(obj);
    },
    'deleteAccessRuleCard': function (cardId) {
        CloudAccessRules.remove({_id: cardId});
    },
    'duplicateAccessRuleCard': function (cardId) {
        var doc = CloudAccessRules.findOne({_id: cardId});
        delete doc._id;
        doc.global = false;
        CloudAccessRules.insert(doc);
    },
    'removeAllLocations': function () {
        Locations.remove({});
    },
    'insertLocationObj': function (obj) {
        if (!Locations.findOne({_id: obj._id})) {
          Locations.insert(obj);
        }
    }
})