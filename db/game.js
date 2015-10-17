var game = {
  language : Language.English,
  teams : [],
  mode : Mode.Rotation,
  numteams : 2,
  eventID : {
    T0:{
      PreviewStart:   0,
      T0_PreviewEnd:  1,
      T0_OrderMons:   2,
      T0_SendOut:     3
    }
    EOT:{
      WeatherDamage:  0,
      StatusDamage:   1,
      GradualHeal:    2,
      GradualDamage:  3,
      CureStatus:     4,
      GetStatus:      5,
      PassiveAbility: 6,
      SendOutMon:     7,
      FormChange:     8,
      StatCountdown:  9
    }
    END:{
      END_PlayerLose: 0,
      END_GameOver:   1
    }
  },
  T0:[],
  EOT:[],
  END:[],
  weather : require("weather"),
  addEvent:function(arr, priority, iterations, run, args) {
    arr[priority] = {i:iterations,r:run,a:args};
  },
  runEvent:function(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].i--;
      //  Exhausted iteration count
      if (arr[i].i == -1) {
        arr.splice(i, 1);
      }
      else {
        //  Allow event to exhaust itself
        //  while it is being run
        if (call(arr[i].r, arr[i].args)) {
          arr.slice(i, 1);
        }
      }
    }
  }
  playerlose: function (team) {
    this.teams.splice(this.teams.indexOf(team), 1);
    this.numteams--;
    if (this.numteams == 1) {
      this.endGame();
    }
  }
};



var Mode = {
  Single : {
      activeslots:1,
      benchslots:0,
      allowitems : false
  },
  Double : {
      activeslots:2,
      benchslots:0
      allowitems : false
  },
  Triple : {
      activeslots:3,
      benchslots:0
      allowitems : false
  },
  Rotation : {
      activeslots:1,
      benchslots:2
      allowitems : false
  },
  /*  Potential use
  TCG : {
      activeslots:1,
      benchslots:5
      allowitems : true
  },*/
  /*  Potential use
  Defender : {
      activeslots:2,
      benchslots:1
      allowitems : false
  }*/
};
