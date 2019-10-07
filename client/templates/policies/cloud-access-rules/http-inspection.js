Meteor.subscribe('inspections');

Template.browseInspections.rendered = function () {
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

Template.browseInspections.helpers({
  inspections: function () {
    return Inspections.find();
  }
});

Template.browseInspections.events({
  'click .inspections_drop_down': function (e){
      var current_tags = Session.get('httpinspectionTagsVar');
      var doc = Inspections.find({'inspection': $(e.target).text()}).fetch();
      var found = _.find(current_tags, function(tag) {
          return tag._id == doc[0]._id;
      });
      if (found == undefined) {
          current_tags.push({'inspection': $(e.target).text(), '_id': doc[0]._id});
          Session.set('httpinspectionTagsVar', current_tags);
      }  },
})
