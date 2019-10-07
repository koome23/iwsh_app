var TemplateClass, collection, loadTrees;

Meteor.subscribe('fileservers');

TemplateClass = Template.fileservers;

window.collection = collection = Collections.createTemporary();

loadTrees = function() {
    var delay, reactiveSelectionHandle, runTestData, treeTemplate;
    treeTemplate = null;
    //delay = 1000;
    reactiveSelectionHandle = null;
    window.runTestData = runTestData = function() {
        var $tree, data;
        Collections.removeAllDocs(collection);
        Collections.copy(Locations, collection);
        window.$tree = $tree = this.$('#tree');
        if (treeTemplate) {
            Blaze.remove(treeTemplate);
        }
        data = {
            items: collection.find(),
            settings: {
                autoExpand: true,
                multiSelect: true,
                selectable: true,
                checkboxes: false
            }
        };
        treeTemplate = Blaze.renderWithData(Template.tree, data, $tree[0]);
        $tree = $('.tree', $tree);
        return reactiveSelectionHandle = treeTemplate.autorun(function() {
            var selectedIds;
            return selectedIds = Template.tree.getSelectedIds($tree);
        });
    };
    return runTestData();
};

TemplateClass.rendered = function() {
    return setTimeout(loadTrees.bind(this), 1000);
};

TemplateClass.helpers({
    locations: function() {
        return collection.find();
    }
});

