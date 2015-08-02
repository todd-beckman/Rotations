Pokemon : {
    level : int,
    ability : String
    stats : {
        hp : int,
        hpleft : int,
        atk : int,
        def : int,
        spatk : int,
        spdef : int,
        spd : int
    }
    boosts : {
        atk : int,
        def : int,
        spatk : int,
        spdef : int,
        spd : int,
        crit : int,
        eva : int,
        acc : int
    }
    status : String
    numhits : int
    hasMoved : bool,
    helpinghand : bool,
    protect : int,
    protecting : bool,
    flinching : bool,
    leechseed : bool,
    kingshield : bool,
    digging : bool,
    flying : bool,
    phantom : bool,
    sky : bool,
    rage : int,
    perish : int,
    charging : bool,
    lastMove : String,
    minimize : bool,
    disable : {
        duration : int,
        move : int
    }
    bind : {
        move : String,
        countdown : int
    }
    onTouch : function(move, target),
    onTouched : function(user, move),
    onGetStatus : function(status),
    onMultiHit : function(),
    onPhazed : function(),
    onBind : function(move, target),
}
