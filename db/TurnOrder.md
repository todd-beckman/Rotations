Vocabulary
----------
- Mode Limit: the number of Pokémon each team is permitted to take into battle.
- Active Pokémon: in play; may be the target of attacks as well as effects of the field and team.
- Benched Pokémon: in play; may not be targetted by attacks and is temporarily unaffected by all battle effects.
- In-Hand Pokémon: not in play and not on the field.
- Fainted Pokémon: not in play; incapable of battling and no longer capable of having any effect on the game. They are in-hand but may not be sent out unless they are revived.


GAME LOOP
---------

```
run procedure Team Selection
gameon <- true
run procedure Order Pokémon
foreach Pokémon in orderlist
    run Pokémon.SendOut Event
while gameon
    run procedure Make Decisions //  may fire procedure forfeit
    run procedure Order Decisions
    run procedure Run Decisions
```

```
//  PROCEDURE: Team Selection
//  Let the player choose the Pokémon to bring to the game
//  Then put the Pokémon into the correct places on the field.
foreach team in teams
    teamlist <- empty [size 6]
    for i = 0 to Mode Limit
        teamlist < push < request Pokémon from player
    foreach Pokémon in teamlist
        if team has an empty active slot
            put Pokémon into slot
        else if team has an empty bench slot
            put Pokémon into slot
        else
            put Pokémon in hand
```

```
//  PROCEDURE: Order Pokémon
//  Sort Pokémon by Speed, breaking all n-way ties at random
orderlist <- empty [size (numactiveslots * teamcount)]
foreach team in teams
    foreach active slot
        if slot not empty
            orderlist < push < Pokémon at slot
run function sort (orderlist, compare=Pokémon.speed)
for i = 0 to orderlist.length-1
    if orderlist[i] is empty
        break from loop
    if orderlist[i].speed=orderlist[i+1].speed
        j <- i + 1
        while j < orderlist.length
        and orderlist.speed=orderlist[j].speed
            j <- j + 1
        run function shuffle(orderlist, from=i,to=j-1)
```

```
//  PROCEDURE: Make Decision
//  Use the following structure:
enumerate Decision Type : [FIGHT, ITEM, SWITCH, FORFEIT]
fightdecision <- {FIGHT, rotate, mega?, move id, targets}
itemdecision <- {ITEM, item id, onfield target}
switchdecision <- {SWITCH, in-hand replacement}

decisions <- empty [size team]
for each team
    decision.team=team;
    foreach slot in team.active
        decision.slot = slot
        decision.decision < request legal decision from player
        switch (decision.decision)
            case FORFEIT
                continue
            case ITEM
                item <- request item from player
                decision.item = item.id
                if item.hastarget
                    decision.target <- request on-field Pokémon from player
            case SWITCH
                decision.replacement <- request in-hand Pokémon from Player
            case FIGHT
                if bench is not empty
                    decision.rotate <- request rotate from player
                else
                    decision.rotate <- false
                if mega evolution is legal
                    decision.mega? <- request mega? from player
                else
                    decision.mega? <- false
                //  Note targets should be team-slot combinations
                //  in case of switching/phasing/etc
                decision.targets <- request targets from player
        decisions < push < decision
```

```
//  PROCEDURE: Order Decisions
s_decisions=empty[size decisions.length]
levels:
+13 - Forfeiting
+12 - Using item
+11 - Pursuit
+10 - Switching
+9 - Rotation
+8 - Mega Evolution
Everything else: move priority

foreach decision in decisions
    switch (decision.decision)
    case FORFEIT
        s_decisions.[13] < push < decision
    case ITEM
        s_decisions.[12] < push < decision
    case SWITCH
        s_decisions.[10] < push < decision
    case FIGHT
        priority <- decision.move.priority
        bump <- Pokémon.BumpEvent wher bump is one of (-.1, 0, .1)
        if decision.rotate
            s_decisions.[9 + bump] < push < new decision{
                decision=ROTATE
                direction=decision.rotate
                team=decision.team
                slot=decision.slot
            }
        if decision.mega?
            s_decisions.[8 + bump] < push < new decision{
                decision=MEGA
                team=decision.team
                slot=decision.slot
            }
        s_decisions.[decision.move.priority+bump] < push < decision
//  break n-way ties at random
for i = 0 to s_decisions.length-1
    if s_decisions[i].priority=s_decisions[i+1].priority
    and s_decisions[i].speed=s_decisions[i+1].speed
        j <- i + 1
        while j < s_decisions.length
        and s_decisions.priority=s_decisions[j].priority
        and s_decisions.speed=s_decisions[j].speed
            j <- j + 1
        run function shuffle(s_decisions, from=i,to=j-1)
```








```
//  PROCEDURE: Populate Field
//  Fill the active field first. 
for each team
    if team.active + team.bench + team.inhand = 0
        run function Player Lose (team)
    while team has any empty active spots
        if team has any Pokémon on bench
            move first benched Pokémon to the active slot
        else
            if team has any in-hand Pokémon
                if team has exactly 1 in-hand Pokémon
                    send out the Pokémon into the active slot
                else
                    request in-hand Pokémon from player
                    move Pokémon from in-hand to active slot
            else
                continue to next team
```











```
//  FUNCTION: Player Lose
param: team
    run function splice(team from teams)
    teamcount <- teamcount - 1
    if teamcount = 1
        gameon = false
```