IncludedUsers = new Mongo.Collection('tmincludedusers');
ExcludedUsers = new Mongo.Collection('tmexcludedusers');
Traffics = new Mongo.Collection('tmtraffics');
Categories = new Mongo.Collection('tmcategories');
SkippedContents = new Mongo.Collection('tmskippedcontents');
BlockedContents = new Mongo.Collection('tmblockedcontents');
Inspections = new Mongo.Collection('tminspections');
CloudAccessRules = new Mongo.Collection('tmcloudaccessrules');
Gateways = new Mongo.Collection('tmgateways');

var schema = new SimpleSchema({
    name: {
        type: String,
        index: true
    },
    parent: {
        type: String,
        index: true,
        optional: true
    }
});

// locations tree
Locations = new Mongo.Collection('locations');
Locations.attachSchema(schema);
Locations.allow(Collections.allowAll());

if (Meteor.isServer) {
    if (IncludedUsers.find().count() == 0) {
        var sampleIncludedUsers = [
            {includedusername: 'Wesley Hsu '},
            {includedusername: 'Andy Shen '},
            {includedusername: 'Parvez Tanaji '},
            {includedusername: 'Richard Huang '},
            {includedusername: 'Michael Lang '},
            {includedusername: 'Tim Tieu '},
            {includedusername: 'Daniel Hsieh '},
            {includedusername: 'Allen Wang '},
            {includedusername: 'Ivy Lee '},
            {includedusername: 'All of US ENT HIE'},
            {includedusername: 'All of IWS CN DEV'}
        ];

        _.each(sampleIncludedUsers, function (includeduser) {
            if (!IncludedUsers.findOne(includeduser)) { //check for duplication
                IncludedUsers.insert(includeduser);
            }
        });
    }

    if (ExcludedUsers.find().count() == 0) {
        var sampleExcludedUsers = [
            {excludedusername: 'Wesley Hsu '},
            {excludedusername: 'Andy Shen '},
            {excludedusername: 'Parvez Tanaji '},
            {excludedusername: 'Richard Huang '},
            {excludedusername: 'Michael Lang '},
            {excludedusername: 'Tim Tieu '},
            {excludedusername: 'Daniel Hsieh '},
            {excludedusername: 'Allen Wang '},
            {excludedusername: 'Ivy Lee '},
            {excludedusername: 'All of US ENT HIE'},
            {excludedusername: 'All of IWS CN DEV'}
        ];

        _.each(sampleExcludedUsers, function (excludeduser) {
            if (!ExcludedUsers.findOne(excludeduser)) { //check for duplication
                ExcludedUsers.insert(excludeduser);
            }
        });
    }

    if (Categories.find().count() == 0) {
        var sampleCategories = [
            {category: 'Adult - All'},
            {category: 'Adult > Abortion'},
            {category: 'Adult > Adult/Mature Content'},
            {category: 'Adult > Alcohol/Tobacco'},
            {category: 'Adult > Gambling'},
            {category: 'Adult > Illegal Drugs'},
            {category: 'Adult > Illegal/Questionable'},
            {category: 'Adult > Intimate Apparel/Swimsuit'},
            {category: 'Adult > Marijuana'},
            {category: 'Adult > Nudity'},

        ];

        _.each(sampleCategories, function (category) {
            Categories.insert(category);
        });
    }

    if (Traffics.find().count() == 0) {
        var sampleTraffics = [
            {traffic: 'Antivirus - All'},
            {traffic: 'Antivirus > Sophos update'},
            {traffic: 'Antivirus > ZoneAlarm Updates'},
            {traffic: 'Application Service - All'},
            {traffic: 'Application Service > ActiveSync'},
            {traffic: 'Application Service > Apple App Store'},
            {traffic: 'Application Service > Apple Push Notification Service'},
            {traffic: 'Application Service > Apple Update'},
            {traffic: 'Application Service > Chrome Update'},
            {traffic: 'Application Service > Dictionary Server Protocol'},

        ];

        _.each(sampleTraffics, function (traffic) {
            Traffics.insert(traffic);
        });
    }


    if (SkippedContents.find().count() == 0) {
        var sampleSkippedContents = [
            {skippedcontent: 'Audio'},
            {skippedcontent: 'Image'},
            {skippedcontent: 'Video'},
            {skippedcontent: 'Apple QuickTime and MP4'},
            {skippedcontent: 'Common Audio Mime Type'},
            {skippedcontent: 'Latest MS Office MIME File Types'},
            {skippedcontent: 'Mac Movie MIME Types'},
            {skippedcontent: 'Microsoft Office Suite'},
            {skippedcontent: 'Mac Movie MIME Types'},
            {skippedcontent: 'Web Safe Images'},
            {skippedcontent: 'XP Machines'}
        ];

        _.each(sampleSkippedContents, function (skippedcontent) {
            SkippedContents.insert(skippedcontent);
        });
    }

    if (BlockedContents.find().count() == 0) {
        var sampleBlockedContents = [
            {blockedcontent: 'Audio'},
            {blockedcontent: 'Image'},
            {blockedcontent: 'Video'},
            {blockedcontent: 'Apple QuickTime and MP4'},
            {blockedcontent: 'Common Audio Mime Type'},
            {blockedcontent: 'Latest MS Office MIME File Types'},
            {blockedcontent: 'Mac Movie MIME Types'},
            {blockedcontent: 'Microsoft Office Suite'},
            {blockedcontent: 'Mac Movie MIME Types'},
            {blockedcontent: 'Web Safe Images'},
            {blockedcontent: 'XP Machines'}
        ];

        _.each(sampleBlockedContents, function (blockedcontent) {
            BlockedContents.insert(blockedcontent);
        });
    }

    if (Inspections.find().count() == 0) {
        var sampleInspections = [
            {inspection: 'Browser type filter '},
            {inspection: 'Large data download filter'},
            {inspection: 'Large data upload filter'},
            {inspection: 'Query keyword filter'},
            {inspection: 'SNS site post filter'},
            {inspection: 'WebDAV traffic filter'},
            {inspection: 'Web file upload filter'}

        ];

        _.each(sampleInspections, function (inspection) {
            Inspections.insert(inspection);
        });
    }

    if (Gateways.find().count() === 0) {
        var sampleGateways = [
            {name: 'root > IDC-SWG'},
            {name: 'root > Nanjin-SWG'},
            {name: 'root > TW-SWG'},
            {name: 'root > JPN-SWG'}
        ]

        _.each(sampleGateways, function (gateway) {
            Gateways.insert(gateway);
        })
    }

    var tmGlobalPolicy = { // global policy
        schedules: [{
            name: 'Always',
            selected: true
        }],
        global: true,
        generalsettings: {
            policyName: 'Global Policy',
            policyDescription: 'The default policy detects threats for all users and groups.',
            policyEnable: false
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

    if (CloudAccessRules.find().count() === 0) {
        CloudAccessRules.insert(tmGlobalPolicy);
    }
}
