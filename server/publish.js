Meteor.publish('includedusernameAutocompleteSubscription', function (selector, options, collName) {
    options.limit = Math.min(50, Math.abs(options.limit || 0));
    _.extend(options, {fields: {'_id':1,'includedusername':1}, reactive: true});
    var includedusers = IncludedUsers.find(selector, options);
    Autocomplete.publishCursor(includedusers, this);
    this.ready();
});

Meteor.publish('excludedusernameAutocompleteSubscription', function (selector, options, collName) {
    options.limit = Math.min(50, Math.abs(options.limit || 0));
    _.extend(options, {fields: {'_id':1,'excludedusername':1}, reactive: true});
    var excludedusers = ExcludedUsers.find(selector, options);
    Autocomplete.publishCursor(excludedusers, this);
    this.ready();
});

Meteor.publish('categoryAutocompleteSubscription', function (selector, options, collName) {
        options.limit = Math.min(50, Math.abs(options.limit || 0));
        _.extend(options, {fields: {'_id':1,'category':1}, reactive: true});
    var categories = Categories.find(selector, options);
    Autocomplete.publishCursor(categories, this);
    this.ready();
});

Meteor.publish('trafficAutocompleteSubscription', function (selector, options, collName) {
        options.limit = Math.min(50, Math.abs(options.limit || 0));
        _.extend(options, {fields: {'_id':1,'traffic':1}, reactive: true});
    var traffics = Traffics.find(selector, options);
    Autocomplete.publishCursor(traffics, this);
    this.ready();
});

Meteor.publish('skippedcontentAutocompleteSubscription', function (selector, options, collName) {
    options.limit = Math.min(50, Math.abs(options.limit || 0));
    _.extend(options, {fields: {'_id':1,'skippedcontent':1}, reactive: true});
    var skippedcontents = SkippedContents.find(selector, options);
    Autocomplete.publishCursor(skippedcontents, this);
    this.ready();
});

Meteor.publish('blockedcontentAutocompleteSubscription', function (selector, options, collName) {
    options.limit = Math.min(50, Math.abs(options.limit || 0));
    _.extend(options, {fields: {'_id':1,'blockedcontent':1}, reactive: true});
    var blockedcontents = BlockedContents.find(selector, options);
    Autocomplete.publishCursor(blockedcontents, this);
    this.ready();
});

Meteor.publish('inspectionAutocompleteSubscription', function (selector, options, collName) {
        options.limit = Math.min(50, Math.abs(options.limit || 0));
        _.extend(options, {fields: {'_id':1,'inspection':1}, reactive: true});
    var inspections = Inspections.find(selector, options);
    Autocomplete.publishCursor(inspections, this);
    this.ready();
});

Meteor.publish('locations', function() {
  return Locations.find();
});

Meteor.publish('tmcloudaccessrules', function() {
  return CloudAccessRules.find();
});

Meteor.publish('gateways', function() {
  return Gateways.find();
});

Meteor.publish('includedusers', function () {
  return IncludedUsers.find();
});

Meteor.publish('excludedusers', function () {
  return ExcludedUsers.find();
});

Meteor.publish('categories', function () {
  return Categories.find();
});

Meteor.publish('traffics', function () {
  return Traffics.find();
});

Meteor.publish('skippedcontents', function () {
  return SkippedContents.find();
});

Meteor.publish('blockedcontents', function () {
  return BlockedContents.find();
});

Meteor.publish('inspections', function () {
  return Inspections.find();
});
