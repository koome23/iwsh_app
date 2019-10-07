Meteor.subscribe('skippedcontents');
Meteor.subscribe('blockedcontents');

Template.browseSkippedContents.rendered = function () {
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

Template.browseBlockedContents.rendered = function () {
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

Template.browseSkippedContents.helpers({
  skippedcontents: function () {
    return SkippedContents.find();
  }
});

Template.browseBlockedContents.helpers({
  blockedcontents: function () {
    return BlockedContents.find();
  }
});

Template.browseSkippedContents.events({
  'click .skippedcontents_drop_down': function (e) {
    var current_tags = Session.get('contentsskippedTagsVar');
    var doc = SkippedContents.find({'skippedcontent': $(e.target).text()}).fetch();
    var found = _.find(current_tags, function (tag) {
      return tag._id == doc[0]._id;
    });
    if (found == undefined) {
      current_tags.push({'skippedcontent': $(e.target).text(), '_id': doc[0]._id});
      Session.set('contentsskippedTagsVar', current_tags);
    }
  },
});

Template.browseBlockedContents.events({
  'click .blockedcontents_drop_down': function (e){
      var current_tags = Session.get('contentsblockedTagsVar');
      var doc = BlockedContents.find({'blockedcontent': $(e.target).text()}).fetch();
      var found = _.find(current_tags, function(tag) {
          return tag._id == doc[0]._id;
      });
      if (found == undefined) {
          current_tags.push({'blockedcontent': $(e.target).text(), '_id': doc[0]._id});
          Session.set('contentsblockedTagsVar', current_tags);
      }  }
})
