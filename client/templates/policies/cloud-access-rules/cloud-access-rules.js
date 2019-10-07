Meteor.subscribe('tmcloudaccessrules');

var tmDefaultPolicy = {
    schedules: [{
        name: 'Always',
        selected: true
    }],
    global: false,
    generalsettings: {
        policyName: '',
        policyDescription: '',
        policyEnable: true
    },

    gatewayLocationsAll: true,
    gatewayLocationsSelected: false,
    locations: [],
    usergroups: {
        userGroupsAll: true,
        userGroupsSelected: false,
        includedUserGroups: [],
        excludedUserGroups: []
    },
    traffictype: {
        trafficTypeAll: true,
        trafficTypeSelected: false,
        URLCategories: [],
        applications: []
    },
    contenttype: {
        skippedMIME: [],
        blockedMIME: []
    },
    caplimit: {
        capLimitNone: true,
        capLimitLimited: false,
        timeQuotaInput1: '60',
        timeQuotaInput2: 'Minutes',
        timeQuotaInput3: 'Per day',
        timeQuoteInput20Selected: '',
        timeQuoteInput21Selected: '',
        timeQuoteInput22Selected: '',
        timeQuoteInput30Selected: '',
        timeQuoteInput31Selected: '',
        timeQuoteInput32Selected: '',
        accessQuotaUpstreamInput1: '100',
        accessQuotaUpstreamInput2: 'MB',
        accessQuotaUpstreamInput3: 'Per day',
        accessQuotaUpstreamInput20Selected: '',
        accessQuotaUpstreamInput21Selected: '',
        accessQuotaUpstreamInput22Selected: '',
        accessQuotaUpstreamInput30Selected: '',
        accessQuotaUpstreamInput31Selected: '',
        accessQuotaUpstreamInput32Selected: '',
        accessQuotaDownstreamInput1: '100',
        accessQuotaDownstreamInput2: 'MB',
        accessQuotaDownstreamInput3: 'Per day',
        accessQuotaDownstreamInput20Selected: '',
        accessQuotaDownstreamInput21Selected: '',
        accessQuotaDownstreamInput22Selected: '',
        accessQuotaDownstreamInput30Selected: '',
        accessQuotaDownstreamInput31Selected: '',
        accessQuotaDownstreamInput32Selected: ''
    },
    securitytemplates: {
        advancedThreatProtection: ' Default Security Template ',
        dataLeakagePrevention: ' Default Security Template '
    },
    advancedfilteroptions: {
        VPN: false,
        cellular: false,
        WiFi: false,
        desktopLaptopChromebook: false,
        mobile: false,
        wearables: false,
        HTTPInspection: []
    },
    ruleaction: {
        actionSwitchEnable: false,
        allowWithWarning: true,
        allowWithPasswordOverride: false,
        allowWithRewrite: false,
        allowWithRedirect: false,
        permanentlyRedirect: false
    }
};

Template.cloudAccessRules.rendered = function () {
    document.title = "Cloud Access Rules | Trend Micro";
    $("<meta>", {
        name: "description",
        content: "Trend Micro App"
    }).appendTo("head");
    $('select').material_select2();
    $(document).ready(function () {
        $('.collapsible').collapsible({
            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });

        if (!Session.get('cardview')) {
            Session.set('cardview', true);
        }
    });
    toolTipPopover();
};

Template.cloudAccessRules.events({
    "click .open-modal": function () {
        var myView;
        if (!Session.get('editRule')) {
            myView = Blaze.renderWithData(Template.editModal, tmDefaultPolicy, $(document.body)[0]);
        } else {
            var doc = CloudAccessRules.findOne({_id: Session.get('editRule')});
            myView = Blaze.renderWithData(Template.editModal, doc, $(document.body)[0]);
        }

        return $('#new-edit-modal').openModal({
            dismissible: false,
            ready: function () {
                $("body").addClass("modal-added");
                return $(".scrollspy").scrollSpy2();
            },
            complete: function () {
                Session.set('editRule', undefined);
                Session.set('accessRuleSchedule', []);
                Session.set('usersexcTagsVar', []);
                Session.set('usersincTagsVar', []);
                Session.set('URLCategoriesAppTagsVar', []);
                Session.set('trafficAppTagsVar', []);
                Session.set('contentsskippedTagsVar', []);
                Session.set('contentsblockedTagsVar', []);
                Session.set('httpinspectionTagsVar', []);
                Meteor.call('removeAllLocations');
                Collections.removeAllDocs(Locations);
                Blaze.remove(myView);
                toolTipPopover();
                return $("body").removeClass("modal-added");
            }
        });
    },
    "click #cardView": function () {
        Session.set("cardview", true);
    },
    "click #tableView": function () {
        Session.set("cardview", false);
    }
});

Template.cloudAccessRules.helpers({
    displayStyleCards: function () {
        toolTipPopover();
        return Session.get('cardview');
    }
});

Template.editModal.events({
    "click #test1": function (e, t) {
        $('#show-hide1').addClass('hide');
    },

    "click #test2": function (e, t) {
        $('#show-hide1').removeClass('hide');

    },

    "click #test3": function (e, t) {
        $('#show-hide2').addClass('hide');
    },

    "click #test4": function (e, t) {
        $('#show-hide2').removeClass('hide');

    },

    "click #test5": function (e, t) {
        $('#show-hide3').addClass('hide');
    },

    "click #test6": function (e, t) {
        $('#show-hide3').removeClass('hide');

    },

    "click #actionCheckSwitch": function (e, t) {
        if ($("#show-hide4").hasClass('hide')) {
            $('#show-hide4').removeClass('hide');
        }
        else {
            $('#show-hide4').addClass('hide');
        }
    },

    "click #permRedirect": function (e, t) {
        if ($('#show-hide5').hasClass('hide')) {
            $('#show-hide5').removeClass('hide');
        }
        else {
            $('#show-hide5').addClass('hide');
        }
    },

    "click #test11": function (e, t) {
        $('#show-hide6').addClass('hide');
    },

    "click #test12": function (e, t) {
        $('#show-hide6').removeClass('hide');
    },

    "click #Options-filled-in-box3": function (e, t) {
        if ($('#SSID-Input').hasClass('hide')) {
            $('#SSID-Input').removeClass('hide');
        }
        else {
            $('#SSID-Input').addClass('hide');
        }
    },

    "click #on-offLever": function (e, t) {
        if ($('#on-off').prop('checked')) {
            $('#cardSwitch').removeClass('checked');
        }
        else {
            $('#cardSwitch').addClass('checked');
        }
    },

    "click #saveFormButton": function (e) {
        $('#saveNewRuleForm').submit();
        e.preventDefault();
    },

    "submit form": function (e) {
        var policyName = e.target.policyName.value;
        var policyDescription = e.target.policy_description.value;
        var policySwitchEnable = e.target.generalSettingsSwitch.checked;

        var gatewayLocationsAll = e.target.test3.checked;
        var gatewayLocationsSelected = e.target.test4.checked;

        var userGroupsAll = e.target.test1.checked;
        var userGroupsSelected = e.target.test2.checked;

        var trafficTypeAll = e.target.test5.checked;
        var trafficTypeSelected = e.target.test6.checked;

        var advancedThreatProtection = e.target.advancedThreatProtectionTemplate.value;
        var dataLeakagePrevention = e.target.dataLeakagePreventionTemplate.value;

        var VPN = e.target.VPNBox.checked;
        var cellular = e.target.cellularBox.checked;
        var WiFi = e.target.WiFiBox.checked;
        var desktopLaptopChromebook = e.target.desktopLaptopChromebookBox.checked;
        var mobile = e.target.mobileBox.checked;
        var wearables = e.target.wearablesBox.checked;

        var actionSwitchEnable = e.target.actionCheckSwitch.checked;
        var allowWithWarning = e.target.allowWithWarningButton.checked;
        var allowWithPasswordOverride = e.target.allowWithPasswordOverrideButton.checked;
        var allowWithRewrite = e.target.allowWithRewriteButton.checked;
        var allowWithRedirect = e.target.allowWithRedirectButton.checked;
        var permanentlyRedirect = e.target.permRedirect.checked;

        var queryObj = {};

        $.extend(queryObj, {
            'generalsettings': {
                'policyName': policyName,
                'policyDescription': policyDescription,
                'policyEnable': policySwitchEnable
            }
        });

        $.extend(queryObj, {
            'gatewayLocationsAll': gatewayLocationsAll,
            'gatewayLocationsSelected': gatewayLocationsSelected
        });

        $.extend(queryObj, {
            'usergroups': {
                'userGroupsAll': userGroupsAll,
                'userGroupsSelected': userGroupsSelected,
                'includedUserGroups': Session.get('usersincTagsVar'),
                'excludedUserGroups': Session.get('usersexcTagsVar')
            }
        });

        $.extend(queryObj, {
            'traffictype': {
                'trafficTypeAll': trafficTypeAll,
                'trafficTypeSelected': trafficTypeSelected,
                'URLCategories': Session.get('URLCategoriesAppTagsVar'),
                'applications': Session.get('trafficAppTagsVar')
            }
        });

        $.extend(queryObj, {
            'schedules': Session.get('accessRuleSchedule')
        });

        $.extend(queryObj, {
            'contenttype': {
                'skippedMIME': Session.get('contentsskippedTagsVar'),
                'blockedMIME': Session.get('contentsblockedTagsVar')
            }
        });

        var timeQuoteInput2Selected = [
            {name: 'Seconds', selected: ''},
            {name: 'Minutes', selected: ''},
            {name: 'Hours', selected: ''}
        ];
        setSelected(timeQuoteInput2Selected, e.target.timeQuotaInput2.value);

        var timeQuoteInput3Selected = [
            {name: 'Per day', selected: ''},
            {name: 'Per week', selected: ''},
            {name: 'Per month', selected: ''}
        ];
        setSelected(timeQuoteInput3Selected, e.target.timeQuotaInput3.value);

        var accessQuotaUpstreamInput2Selected = [
            {name: 'KB', selected: ''},
            {name: 'MB', selected: ''},
            {name: 'GB', selected: ''}
        ];
        setSelected(accessQuotaUpstreamInput2Selected, e.target.accessQuotaUpstreamInput2.value);

        var accessQuotaUpstreamInput3Selected = [
            {name: 'Per day', selected: ''},
            {name: 'Per week', selected: ''},
            {name: 'Per month', selected: ''}
        ];
        setSelected(accessQuotaUpstreamInput3Selected, e.target.accessQuotaUpstreamInput3.value);

        var accessQuotaDownstreamInput2Selected = [
            {name: 'KB', selected: ''},
            {name: 'MB', selected: ''},
            {name: 'GB', selected: ''}
        ];
        setSelected(accessQuotaDownstreamInput2Selected, e.target.accessQuotaDownstreamInput2.value);

        var accessQuotaDownstreamInput3Selected = [
            {name: 'Per day', selected: ''},
            {name: 'Per week', selected: ''},
            {name: 'Per month', selected: ''}
        ];
        setSelected(accessQuotaDownstreamInput3Selected, e.target.accessQuotaDownstreamInput3.value);

        $.extend(queryObj, {
            'caplimit': {
                capLimitNone: e.target.test11.checked,
                capLimitLimited: e.target.test12.checked,
                timeQuotaInput1: e.target.timeQuotaInput1.value,
                timeQuotaInput2: e.target.timeQuotaInput2.value,
                timeQuotaInput3: e.target.timeQuotaInput3.value,
                timeQuoteInput20Selected: timeQuoteInput2Selected[0].selected,
                timeQuoteInput21Selected: timeQuoteInput2Selected[1].selected,
                timeQuoteInput22Selected: timeQuoteInput2Selected[2].selected,
                timeQuoteInput30Selected: timeQuoteInput3Selected[0].selected,
                timeQuoteInput31Selected: timeQuoteInput3Selected[1].selected,
                timeQuoteInput32Selected: timeQuoteInput3Selected[2].selected,
                accessQuotaUpstreamInput1: e.target.accessQuotaUpstreamInput1.value,
                accessQuotaUpstreamInput2: e.target.accessQuotaUpstreamInput2.value,
                accessQuotaUpstreamInput3: e.target.accessQuotaUpstreamInput3.value,
                accessQuotaUpstreamInput20Selected: accessQuotaUpstreamInput2Selected[0].selected,
                accessQuotaUpstreamInput21Selected: accessQuotaUpstreamInput2Selected[1].selected,
                accessQuotaUpstreamInput22Selected: accessQuotaUpstreamInput2Selected[2].selected,
                accessQuotaUpstreamInput30Selected: accessQuotaUpstreamInput3Selected[0].selected,
                accessQuotaUpstreamInput31Selected: accessQuotaUpstreamInput3Selected[1].selected,
                accessQuotaUpstreamInput32Selected: accessQuotaUpstreamInput3Selected[2].selected,
                accessQuotaDownstreamInput1: e.target.accessQuotaDownstreamInput1.value,
                accessQuotaDownstreamInput2: e.target.accessQuotaDownstreamInput2.value,
                accessQuotaDownstreamInput3: e.target.accessQuotaDownstreamInput3.value,
                accessQuotaDownstreamInput20Selected: accessQuotaDownstreamInput2Selected[0].selected,
                accessQuotaDownstreamInput21Selected: accessQuotaDownstreamInput2Selected[1].selected,
                accessQuotaDownstreamInput22Selected: accessQuotaDownstreamInput2Selected[2].selected,
                accessQuotaDownstreamInput30Selected: accessQuotaDownstreamInput3Selected[0].selected,
                accessQuotaDownstreamInput31Selected: accessQuotaDownstreamInput3Selected[1].selected,
                accessQuotaDownstreamInput32Selected: accessQuotaDownstreamInput3Selected[2].selected
            }
        });

        $.extend(queryObj, {
            'securitytemplates': {
                'advancedThreatProtection': advancedThreatProtection,
                'dataLeakagePrevention': dataLeakagePrevention
            }
        });

        $.extend(queryObj, {
            'advancedfilteroptions': {
                'VPN': VPN,
                'cellular': cellular,
                'WiFi': WiFi,
                'desktopLaptopChromebook': desktopLaptopChromebook,
                'mobile': mobile,
                'wearables': wearables,
                'HTTPInspection': Session.get('httpinspectionTagsVar')
            }
        });

        $.extend(queryObj, {
            'ruleaction': {
                'actionSwitchEnable': actionSwitchEnable,
                'allowWithWarning': allowWithWarning,
                'allowWithPasswordOverride': allowWithPasswordOverride,
                'allowWithRewrite': allowWithRewrite,
                'allowWithRedirect': allowWithRedirect,
                'permanentlyRedirect': permanentlyRedirect
            }
        });

        var locations = Locations.find().fetch();
        $.extend(queryObj, {'locations': locations});
        Meteor.call('removeAllLocations');
        $.extend(queryObj, {'global': false});

        if (Session.get('editRule')) {
            Meteor.call('cloudAccessRulesUpdate', Session.get('editRule'), queryObj);
        } else {
            Meteor.call('cloudAccessRulesInsert', queryObj);
        }

        $(".modal-close").click();
        e.preventDefault();
    }
});

Template.editModal.rendered = function () {
    var rule = {}, usersinc = [], usersexc = [], urlcategories = [], applications = [],
        skippedmime = [], blockedMIME = [], httpInspection = [];

    $('select').material_select2();
    toolTipPopover();

    $(document).ready(function () {
        $('.collapsible').collapsible({
            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });

        if ($('#test4').prop('checked')) {
            $('#show-hide2').removeClass('hide');
        }

        if ($('#test2').prop('checked')) {
            $('#show-hide1').removeClass('hide');
        }

        if ($('#test6').prop('checked')) {
            $('#show-hide3').removeClass('hide');
        }

        if ($('#test12').prop('checked')) {
            $('#show-hide6').removeClass('hide');
        }

        if ($('#actionCheckSwitch').prop('checked')) {
            $('#show-hide4').removeClass('hide');
        }

        if ($('#permRedirect').prop('checked')) {
            $('#show-hide5').removeClass('hide');
        }
    });

    if (Session.get('editRule')) {
        rule = CloudAccessRules.findOne({_id: Session.get('editRule')});
        Session.set('accessRuleSchedule', rule.schedules);
        _.each(rule.usergroups.includedUserGroups, function (user) {
            usersinc.push(user);
        });
        _.each(rule.usergroups.excludedUserGroups, function (user) {
            usersexc.push(user);
        });
        _.each(rule.traffictype.URLCategories, function (type) {
            urlcategories.push(type);
        });
        _.each(rule.traffictype.applications, function (app) {
            applications.push(app);
        });
        _.each(rule.contenttype.skippedMIME, function (mime) {
            skippedmime.push(mime);
        });
        _.each(rule.contenttype.blockedMIME, function (mime) {
            blockedMIME.push(mime);
        });
        _.each(rule.advancedfilteroptions.HTTPInspection, function (inspec) {
            httpInspection.push(inspec);
        });
        Session.set('usersincTagsVar', usersinc);
        Session.set('usersexcTagsVar', usersexc);
        Session.set('URLCategoriesAppTagsVar', urlcategories);
        Session.set('trafficAppTagsVar', applications);
        Session.set('contentsblockedTagsVar', blockedMIME);
        Session.set('contentsskippedTagsVar', skippedmime);
        Session.set('httpinspectionTagsVar', httpInspection);
    } else {
        if (!Session.get('accessRuleSchedule') || Session.get('accessRuleSchedule').length == 0) {
            Session.set('accessRuleSchedule', [{name: 'Always'}]);
        }
    }
};

Template.cloudAccessRulesCard.helpers({
    cards: function () {
        return CloudAccessRules.find({});
    },
    usergroupcounts: function (usergroups) {
        return usergroups.includedUserGroups.length + usergroups.excludedUserGroups.length;
    },
    traffictypecounts: function (traffictype) {
        return traffictype.URLCategories.length + traffictype.applications.length;
    },
    contenttypecounts: function (contenttype) {
        return contenttype.skippedMIME.length + contenttype.blockedMIME.length;
    },
    schedulecounts: function (schedules) {
        return schedules.length;
    },
    advancedfilteroptionscounts: function (advancedfilteroptions) {
        return advancedfilteroptions.HTTPInspection.length;
    },
    gatewaycounts: function (locations) {
        return locations.length;
    },
    getUserGroups: function (usergroups) {
        var userIncAry = [];
        var userExcAry = [];

        if (usergroups.userGroupsSelected) {
            _.each(usergroups.includedUserGroups, function (user) {
                userIncAry.push(user.includedusername);
            })
            _.each(usergroups.excludedUserGroups, function (user) {
                userExcAry.push(user.excludedusername);
            })
            if (userIncAry.length !== 0 || userExcAry.length !== 0) {
                return 'Users included: ' + userIncAry.join(', ') + '; Users excluded: ' + userExcAry.join(', ');
            } else {
                return '';
            }
        } else {
            return '';
        }

    },
    getTrafficTypes: function (traffictype) {
        var catesAry = [];
        var appsAry = [];

        if (traffictype.trafficTypeSelected) {
            _.each(traffictype.URLCategories, function (traffic) {
                catesAry.push(traffic.category);
            })
            _.each(traffictype.applications, function (traffic) {
                appsAry.push(traffic.traffic);
            })
            if (catesAry.length !== 0 || appsAry.length !== 0) {
                return 'URL Categories: ' + catesAry.join(', ') + '; Applications: ' + appsAry.join(', ');
            } else {
                return '';
            }
        } else {
            return '';
        }

    },
    getContentTypes: function (contenttype) {
        var skippedAry = [];
        var blockedAry = [];
        _.each(contenttype.skippedMIME, function (content) {
            skippedAry.push(content.skippedcontent);
        })
        _.each(contenttype.blockedMIME, function (content) {
            blockedAry.push(content.blockedcontent);
        })
        if (skippedAry.length !== 0 || blockedAry.length !== 0) {
            return 'Skipped MIME: ' + skippedAry.join(', ') + '; Blocked MIME: ' + blockedAry.join(', ');
        } else {
            return '';
        }
    },
    getCapLimit: function (caplimit) {
        var capLimitString = '';

        if (caplimit.capLimitLimited) {
            capLimitString += 'Time quota: ' + caplimit.timeQuotaInput1 + ' ' +
                caplimit.timeQuotaInput2 + ' ' +
                caplimit.timeQuotaInput3 + '; Access quota: ' +
                caplimit.accessQuotaDownstreamInput1 + ' ' +
                caplimit.accessQuotaDownstreamInput2 + ' ' +
                caplimit.accessQuotaDownstreamInput3 + ' downstream, ' +
                caplimit.accessQuotaUpstreamInput1 + ' ' +
                caplimit.accessQuotaUpstreamInput2 + ' ' +
                caplimit.accessQuotaUpstreamInput3 + ' upstream';
            return capLimitString;
        } else {
            return '';
        }

    },
    getSecurityTemplates: function (securitytemplates) {
        var securityTemplateString = '';
        securityTemplateString += 'Advanced Threat Protection:';
        _.each(securitytemplates.advancedThreatProtection, function (template) {
            securityTemplateString += template;
        })
        securityTemplateString += '; Data Leakage Prevention:';
        _.each(securitytemplates.dataLeakagePrevention, function (template) {
            securityTemplateString += template;
        })
        return securityTemplateString;
    },
    getAdvancedFilterOptions: function (advancedfilteroptions) {
        var advancedFilterOptionAry = [];

        if (advancedfilteroptions.VPN) {
            advancedFilterOptionAry.push('VPN');
        }

        if (advancedfilteroptions.cellular) {
            advancedFilterOptionAry.push('Cellular');
        }

        if (advancedfilteroptions.WiFi) {
            advancedFilterOptionAry.push('WiFi');
        }

        if (advancedfilteroptions.desktopLaptopChromebook) {
            advancedFilterOptionAry.push('Desktop/Laptop/Chromebook');
        }

        if (advancedfilteroptions.mobile) {
            advancedFilterOptionAry.push('Mobile');
        }

        if (advancedfilteroptions.wearables) {
            advancedFilterOptionAry.push('Wearables');
        }

        _.each(advancedfilteroptions.HTTPInspection, function (filter) {
            advancedFilterOptionAry.push(filter.inspection);
        })

        return advancedFilterOptionAry.join(', ');
    },

    getRuleAction: function (ruleaction) {
        var ruleActionString = [];
        var permString;

        if (!ruleaction.actionSwitchEnable) {
            ruleActionString.push('Block');
        }

        else if (ruleaction.allowWithWarning) {
            ruleActionString.push('Allow With Warning');
        }
        else if (ruleaction.allowWithPasswordOverride) {
            ruleActionString.push('Allow With Password Override');
        }
        else if (ruleaction.allowWithRewrite) {
            ruleActionString.push('Allow With Rewrite');
        }
        else if (ruleaction.allowWithRedirect) {
            permString = 'Allow With Redirect';
            if (ruleaction.permanentlyRedirect) {
                permString += ' -' + ' Permanently Redirect';
            }
            ruleActionString.push(permString);

        }
        return ruleActionString.join(', ');
    },
    getGatewayLocations: function (locations, gatewayLocationsSelected) {
        var gateways = [];

        if (gatewayLocationsSelected) {
            _.each(locations, function (location) {
                gateways.push(location.name);
            })
            return gateways.join(', ');
        } else {
            return '';
        }

    },
    getSchedules: function (schedules) {
        var schedulesAry = [];
        _.each(schedules, function (schedule) {
            schedulesAry.push(schedule.name);
        })
        return schedulesAry.join(', ');
    },
    displayStyleCards: function () {
        return Session.get('cardview');
    }
});

Template.cloudAccessRulesCard.events({
    'click .access_rule_card_delete': function (e) {
        Meteor.call('deleteAccessRuleCard', $(e.target).attr('data-id'));
        e.preventDefault();
    },
    'click .access_rule_card_duplicate': function (e) {
        Meteor.call('duplicateAccessRuleCard', $(e.target).attr('data-id'));
        toolTipPopover();
        e.preventDefault();
    },
    'click .rule_card_edit': function (e) {
        Session.set('editRule', $(e.target).attr('data-id'));
        e.preventDefault();
    }
});

function toolTipPopover() {
    setTimeout(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover({
            trigger: 'hover',
            placement: 'bottom'
        });
    }, 500);
}

function setSelected(obj, targetVal) {
    _.each(obj, function (elm) {
        if (elm.name === targetVal) {
            elm.selected = 'selected';
        }
    });
}
