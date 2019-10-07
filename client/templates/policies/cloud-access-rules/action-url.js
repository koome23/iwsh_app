Template.actionModal.events({
    "click #cancelAction": function (e) {
        e.preventDefault();
        e.target.parentNode.innerHTML = '';
    },
    "click #saveAction": function (e) {
        e.preventDefault();
        $('#saveActionForm').submit();
        e.target.parentNode.innerHTML = '';
    },
    "submit form": function (e) {
        Meteor.call('insertActionUrl', $('#actionFrom').val(), $('#actionTo').val());
        e.preventDefault();
        e.stopPropagation();
    }
});

Template.actionUrl.helpers({
    actionsArray: function () {
        return CloudAccessRules.find();
    }
});
