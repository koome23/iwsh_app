Template.scheduleModal.helpers({
    minute_object: function () {
        var objects = [];

        for (var i = 0; i < 61; i++) {
            objects[i] = pad(i, 2);
        }

        return objects;
    },
    hour_object: function () {
        var objects = [];

        for (var i = 0; i < 13; i++) {
            objects[i] = pad(i, 2);
        }

        return objects;
    }
});

Template.scheduleModal.events({
    "click #cancelSchedule": function (e) {
        e.target.parentNode.innerHTML = '';
        e.preventDefault();
    },
    "click #saveSchedule": function (e) {
        $('#saveScheduleForm').submit();
        e.target.parentNode.innerHTML = '';
        e.preventDefault();
    },
    "submit form": function (e) {
        var schedule, scheduleWorkDay = [],
            accessRuleSchedule = Session.get('accessRuleSchedule');

        if (e.target.scheduleName.value) {

            // clean selected one
            _.each(accessRuleSchedule, function (obj) {
                if (obj.selected === true) {
                    obj.selected = false;
                }
            });

            for (var i = 0; i < e.target.workday.length; i++) {
                if (e.target.workday[i].checked) {
                    scheduleWorkDay.push(e.target.workday[i].value);
                }
            }

            schedule = {
                name: e.target.scheduleName.value,
                selected: true,
                description: e.target.scheduleDescription.value,
                workday: scheduleWorkDay,
                start_time: e.target.startHour.value + ":" + e.target.startMinute.value + " " + e.target.startAmPm.value,
                end_time: e.target.endHour.value + ":" + e.target.endMinute.value + " " + e.target.endAmPm.value
            };

            accessRuleSchedule.push(schedule);

            Session.set('accessRuleSchedule', accessRuleSchedule);
        }

        e.preventDefault();
        e.stopPropagation();
    }
});

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

Template.schedulesTemplate.helpers({
    accessRuleSchedules: function () {
        return Session.get('accessRuleSchedule');
    }
});
