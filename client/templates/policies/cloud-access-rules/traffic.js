Meteor.subscribe('categories');
Meteor.subscribe('traffics');

Template.browseCategories.rendered = function () {
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

Template.browseCategories.helpers({
    categories: function () {
        return Categories.find();
    }
});

Template.browseTraffics.helpers({
    traffics: function () {
        return Traffics.find();
    }
});

Template.browseCategories.events({
    'click .categories_drop_down': function (e) {
        var current_tags = Session.get('URLCategoriesAppTagsVar');
        var doc = Categories.find({'category': $(e.target).text()}).fetch();
        var found = _.find(current_tags, function (tag) {
            return tag._id == doc[0]._id;
        });
        if (found == undefined) {
            current_tags.push({'category': $(e.target).text(), '_id': doc[0]._id});
            Session.set('URLCategoriesAppTagsVar', current_tags);
        }
    }
});

Template.browseTraffics.events({
    'click .traffic_drop_down': function (e) {
        var current_tags = Session.get('trafficAppTagsVar');
        var doc = Traffics.find({'traffic': $(e.target).text()}).fetch();
        var found = _.find(current_tags, function (tag) {
            return tag._id == doc[0]._id;
        });
        if (found == undefined) {
            current_tags.push({'traffic': $(e.target).text(), '_id': doc[0]._id});
            Session.set('trafficAppTagsVar', current_tags);
        }
    }
})
