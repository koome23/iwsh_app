Meteor.subscribe('includedusers');
Meteor.subscribe('excludedusers');

Template.usersinc.helpers({
    settings: function () {
        return {
            position: 'below',
            limit: 100,
            scroll: true,
            rules: [
                {
                    collection: 'tmincludedusers',
                    subscription: 'includedusernameAutocompleteSubscription',
                    field: 'includedusername',
                    options: 'i',
                    matchAll: true,
                    template: Template.includeduserPill
                }
            ]
        }
    }
});

Template.usersexc.helpers({
    settings: function () {
        return {
            position: 'below',
            limit: 100,
            rules: [
                {
                    collection: 'tmexcludedusers',
                    subscription: 'excludedusernameAutocompleteSubscription',
                    field: 'excludedusername',
                    options: 'i',
                    matchAll: true,
                    template: Template.excludeduserPill
                }
            ]
        }
    }
});

Template.URLCategories.helpers({
    settings: function () {
        return {
            position: 'below',
            limit: 100,
            rules: [
                {
                    collection: 'tmcategories',
                    subscription: 'categoryAutocompleteSubscription',
                    field: 'category',
                    options: 'i',
                    matchAll: true,
                    template: Template.categoryPill
                }
            ]
        }
    }
});

Template.trafficApp.helpers({
    settings: function () {
        return {
            position: 'below',
            limit: 100,
            rules: [
                {
                    collection: 'tmtraffics',
                    subscription: 'trafficAutocompleteSubscription',
                    field: 'traffic',
                    options: 'i',
                    matchAll: true,
                    template: Template.trafficPill
                }
            ]
        }
    }
});

Template.contentsskipped.helpers({
    settings: function () {
        return {
            position: 'below',
            limit: 100,
            rules: [
                {
                    collection: 'tmskippedcontents',
                    subscription: 'skippedcontentAutocompleteSubscription',
                    field: 'skippedcontent',
                    options: 'i',
                    matchAll: true,
                    template: Template.skippedcontentPill
                }
            ]
        }
    }
});

Template.contentsblocked.helpers({
    settings: function () {
        return {
            position: 'below',
            limit: 100,
            rules: [
                {
                    collection: 'tmblockedcontents',
                    subscription: 'blockedcontentAutocompleteSubscription',
                    field: 'blockedcontent',
                    options: 'i',
                    matchAll: true,
                    template: Template.blockedcontentPill
                }
            ]
        }
    }
});

Template.httpinspection.helpers({
    settings: function () {
        return {
            position: 'below',
            limit: 100,
            rules: [
                {
                    collection: 'tminspections',
                    subscription: 'inspectionAutocompleteSubscription',
                    field: 'inspection',
                    options: 'i',
                    matchAll: true,
                    template: Template.inspectionPill
                }
            ]
        }
    }
});

Template.browseIncludedUsers.rendered = function () {
    $('.dropdown-button').dropdown({
            inDuration: 100,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true // Displays dropdown below the button
        }
    );
};

Template.browseExcludedUsers.rendered = function () {
    $('.dropdown-button').dropdown({
            inDuration: 100,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true // Displays dropdown below the button
        }
    );
};

Template.browseIncludedUsers.helpers({
    includedusers: function () {
        return IncludedUsers.find();
    }
});

Template.browseExcludedUsers.helpers({
    excludedusers: function () {
        return ExcludedUsers.find();
    }
});

Template.browseIncludedUsers.events({
    'click .includeduser_drop_down': function (e) {
        var current_tags = Session.get('usersincTagsVar');
        var doc = IncludedUsers.find({'includedusername': $(e.target).text()}).fetch();
        var found = _.find(current_tags, function (tag) {
            return tag._id == doc[0]._id;
        });
        if (found == undefined) {
            current_tags.push({'includedusername': $(e.target).text(), '_id': doc[0]._id});
            Session.set('usersincTagsVar', current_tags);
        }
    }
});

Template.browseExcludedUsers.events({
    'click .excludeduser_drop_down': function (e) {
        var current_tags = Session.get('usersexcTagsVar');
        var doc = ExcludedUsers.find({'excludedusername': $(e.target).text()}).fetch();
        var found = _.find(current_tags, function (tag) {
            return tag._id == doc[0]._id;
        });
        if (found == undefined) {
            current_tags.push({'excludedusername': $(e.target).text(), '_id': doc[0]._id});
            Session.set('usersexcTagsVar', current_tags);
        }
    }
});
