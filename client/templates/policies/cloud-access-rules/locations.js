var collection, loadTrees;

Meteor.subscribe('locations');
Meteor.subscribe('gateways');

window.collection = collection = Collections.createTemporary();

loadTrees = function () {
    var delay, reactiveSelectionHandle, runTestData, treeTemplate, loc = {};
    treeTemplate = null;
    reactiveSelectionHandle = null;
    delay = 1000;
    window.runTestData = runTestData = function () {
        var $tree, data;
        Collections.removeAllDocs(collection);
        if (Session.get('editRule')) {
            _.each(CloudAccessRules.findOne({_id: Session.get('editRule')}).locations, function (location) {
                loc = {
                    _id: location._id,
                    name: location.name,
                    parent: location.parent
                };
                Meteor.call('insertLocationObj', loc);
            });
        }
        Collections.copy(Locations, collection);
        window.$tree = $tree = this.$('#location-tree');
        if (treeTemplate) {
            Blaze.remove(treeTemplate);
        }
        data = {
            items: collection.find(),
            settings: {
                autoExpand: true,
                matchAll: true,
                onCreateNode: function (t, node, $li) {
                    //var nodeId = node.id;
                    $li.find('.jqtree-element').append(
                        '<span class="gateway_close"><a class="location_delete" data-node-id="' + node.id +
                        '" title="delete node">&nbsp;&nbsp;x&nbsp;</a></span>'
                    );

                    $.each($li.find('.jqtree-element').children(), function (index, value) {
                        if ($(value).hasClass('jqtree-title')) {
                            if (!$(value).html().match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/)) {
                                $li.find('.jqtree-element').append(
                                    '<span><a class="showLocationDropdown">+</a></span>'
                                );
                            }
                        }
                    });
                }
            }
        };
        treeTemplate = Blaze.renderWithData(Template.tree, data, $tree[0]);
    };
    return runTestData();
};

Template.locations.rendered = function () {
    return setTimeout(loadTrees.bind(this), 1000);
};

Template.locations.helpers({
    locations: function () {
        return collection.find();
    }
});

Template.locations.events({
    'click .location_delete': function (e) {
        Meteor.call('deleteLocation', e.target.attributes['data-node-id'].value);
        e.preventDefault();
    },
    'click .dropdown__trigger': function (e) {
        e.stopPropagation();
    },
    "click .showLocationDropdown": function (e) {
        $.each($('.jqtree-element').children(), function (index, value) {
            $.each($(value).children(), function (i, val) {
                var dataMomentum = $(val).attr('data-momentum');

                if ($(val).hasClass('dropdown__trigger')) {
                    $(val).remove();
                } else if (typeof dataMomentum !== typeof undefined && dataMomentum !== false) {
                    $(val).remove();
                }
            });
        });
        Blaze.render(Template.locationDropDownButton, $(e.target).parent()[0]);
        setTimeout(function () {
            $(e.target).next().click();
        }, 500)
        $(e.target).next().css('display', 'none');
        e.stopPropagation();
        e.preventDefault();
    }
});

Template.editModal.events({
    "click #cancelLocation": function (e) {
        Dropdowns.hide('addLocationDropDown');
        e.preventDefault();
    },
    'click #saveLocation': function (e) {
        var $tree = $('.tree', $tree);
        var selectedIds = Template.tree.getSelectedIds($tree);

        if ($('#locationName').val() !== '') {
            Meteor.call('insertLocation', $('#locationName').val(), selectedIds[0]);
        }

        Dropdowns.hide('addLocationDropDown');
        e.preventDefault();
    }
});

Template.addgatewaytemplate.helpers({
    settings: function () {
        return {
            position: "bottom",
            limit: 500,
            rules: [
                {
                    collection: Gateways,
                    field: "name",
                    matchAll: true,
                    template: Template.gatewayPill
                }
            ]
        };
    }
});

Template.addgatewaytemplate.events({
    'blur input': function (e) {
        setTimeout(function () {
            var str = $(e.target).val();
          if (str) {
            $(e.target).val('');
            Meteor.call('insertLocation', str);
          }
        }, 500)
    },
    'focus #locationName': function (e) {
        e.stopPropagation();
    }
});

Template.browseGateways.helpers({
    gateways: function () {
        return Gateways.find();
    }
});

Template.browseGateways.events({
    'click .gateway_drop_down': function (e) {
        Meteor.call('insertLocation', $(e.target).text());
    }
});
