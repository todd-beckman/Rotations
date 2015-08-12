/*
Team event list



EOT- End of Turn
4- EOT_onResidual DamageDamage  (fire-grass pledge)
12- EOT_onTeamCountdown

*/


function Team (name, mons) {
    this.name = name;
    this.slots = mons;
    while (this.slots.length < 6) {
        this.slots.push(false);
    }
    this.countdown : {
        //reflect:{time:5,run:onCalcStats},
        //lightscreen:{time:5,run:onCalcStats},
        //tailwind:{time:3,run:onCalcStats},
        //firegrasspledge:{time:5,run:EOT_onResidualDamage},
    }
    this.thisturn : {
        //wideguard:allowTargetMon,
        //quickguard:allowTargetMon,
    }
    //  Copied to thisturn at the end turn
    this.nextturn : {}
}