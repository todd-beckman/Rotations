var AbilityEvents = {
    "Intimidate" : {
        onSendOut : function (field, team, slot) {
            for (var i = 0; i < field.slots.length; i++) {
                var mon = field.slots[i];
                if (mon.team != team) {
                    mon.onStatChange(Stat.Attack, -1, mon);
                }
            }
        }
    }
};