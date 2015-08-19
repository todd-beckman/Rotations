# Rotations

Below you see planning. However, the project is still in the process of being implemented. It does not run as documented.

0- Matchmaking
==============

The server receives the player information. This includes username, avatar, a short message, ladder ranking, and the team. Each property is checked for legality; if it is illegal, give a warning message and cancel matchmaking. Otherwise, apply the matchmaking algorithm of choice.

Matchmaking Rules
-----------------

| Rule | Description |
| -------- | ----------- |
| Username | A string capped at 12 characters. The characterset is strictly defined, which includes alphanumerals and a very limited set of symbols. Alternatively, Japanese Katakana or Hiragana may be used, up to a length of 6. It must pass curseword tests. |
| Avatar | Must be an identifier that matches a Trainer Class instance. |
| Message | Must follow Username rules, but may be twice as long. |
| Team | Must follow the Team Format Protocol. Additionally, must abide by Teambuilding Requirements. |

Teambuilding Requirements
-------------------------

| Rule | Description |
| ---- | ----------- |
| Game Mode Restrictions | Hard limits on Species, Items, Moves, and Abilites are enforced. |
| Unreleased Pokemon | A team may not contain Pokemon that are not obtainable in Pokemon X, Y, OR, or AS. |
| Special Content | No Pokemon may have a move or ability acquired only from a special event at the same time as a move or ability that may only be acquired by breeding or exclusively by pre-XY means. |
| Pentagon Rule | No Pokemon may have a move or ability acquired exclusively by pre-XY means. |

1- Team Preview
===============

All players are shown the teams of their opponents. The information received is very minimalistic, however. Players are given *Preview Time* to decide the Pokemon they are bringing. If they fail to submit their Pokemon order before the time limit is up, the server will default to the order they appear on their submitted team.

| Variable | Description |
| -------- | ----------- |
| Game Mode|Singles, Doubles, Rotations, Triples, and Special are the official game modes. |
| Team Size | The number of Pokemon brought to battle. Note that players can legally bring 6 to Team Preview. Only *Team Size* can be brought passed that phase and into the battle. |
| Preview Time | Typically 60 or 90 seconds. The time limit to decide, in order, which Pokemon to bring. |

2- Run Game
===========

For all events listed, Move Effects run first, then Abilities, then Items.

A- Gamestart
------------

Before the decision phase of the game, Pokemon are sent out in order of Player ID. Once all teams have their leading Pokemon on the field, they are sorted by speed. 

### beforeSendOut
Appearance changes that occur before the Pokemon appears on the field.
- Abilities: Multiscale, Illusion

### onSendOut
Effects that are run when a Pokemon is sent out.
- Move Effects (used by foe): Spikes, Toxic Spikes, Stealth Rocks, Sticky Web
- Abilities: Drizzle, Cloud Nine, Intimidate, Trace, Sandstream, Forecast, Drought, Air Lock, Mold Breaker, Anticipation, Forewarn, Slow Start, Snow Warning, Frisk, Flower Gift, Unnerve, Imposter, Turboblaze, Teravolt, Dark Aura, Fairy Aura, Aura Break, Primordial Sea, Desolate Land, Delta Stream
- Items: Air Balloon

B- Decision
-----------

The player makes a decision, picking whether to forfeit, fight, or switch. For each Pokemon, a decision is sent individually. This allows players that have reached their Command Time limit to have the decisions they have made so far accepted even if they have more decisions to make.

The client interface sends the Pokemon's slot number in its decision. This allows the player to change their minds on previously sent decisions. However, once committing to the last Pokemon's decision, canceling is no longer an option.

If a player exceeds their Command Time, every Pokemon that has not been assigned a decision will use the first move available in their movepool (or Struggle if no move is viable). This default behavior will never Mega Evolve or Rotate and will target the Pokemon directly across from it.

| Variable | Description |
| -------- | ----------- |
| Command Time | Typically 45 to 90 seconds, this is how long the player has to make the decisions for this turn. |

### restrictDecision
These do not allow the Pokemon to make any decision at all. It is even impossible to forfeit until the effects are lifted.
- Move Effects (used by user): Bide, Fly, Dig, Dive, Bounce, Sky Drop, Blast Burn, Frenzy Blant, Giga Impact, Hydro Cannon, Hyper Beam, Roar of Time, Rock Wrecker

### beforeRestrictSwitch
These allow the Pokemon to switch even if restrictions are placed against it.
- Abilities: Run Away
- Items: Shed Shell

### restrictSwitch
- Move Effects (used by foe): Block, Mean Look, Bind, Clamp, Fire Spin, Infestation, Magma Storm, Sand Tomb, Whirlpool, Wrap
- Abilities: Arena Trap, Magnet Pull, Shadow Tag

### restrictFight
- Move Effects (used by user): Rage (Gen 1 Only), Wrap (Gen 1 Only), Bind (Gen 1 Only), Petal Dance, Uproar, Thrash, Outrage

### allowMegaEvolution
- Team: Only one Mega Evolution may exist at once.
- Items: Abomasite, Absolite, Aerodactylite, Aggronite, Alakazie, Altarianite, Ampharosite, Audinite, Banettite, Beedrillite, Blastoisinite, Blazikenite, Cameruptite, Charizardite X, Charizardite Y, Diancite, Galladite, Garchompite, Gardevoirite, Gengarite, Glalitite, Gyaradosite, Heracronite, Houndoominite, Kangaskhanite, Latiasite, Latiosite, Lopunnite, Lucarionite, Manectite, Mawilite, Medichamite, Metagrossite, Mewtwonite X, Mewtwonite Y, Pidgeotite, Pinsirite, Sablenite, Salamenceite, Sceptilite, Scizorite, Sharpedonite, Slowbronite, Steelixite, Swampertite, Tyranitarite, Venusaurite

### disallowMove
Running out of PP is just one way to not be allowed to pick a certain move. Here are other rules that restict usage:
- Move Effects (used by foe): Taunt, Torment, Imprison, Heal Block, Encore, Disable
- Abilities (foe): Cursed Body
- Items: Choice Band, Choice Specs, Choice Scarf, Assault Vest

If no move may be selected legally, the Struggle option will appear instead.

C- Turn Order
-------------

Easily one of the most important steps of the game. Actions are queued in a very particular order. It can be seen as a priority queue:

| Priority | Decisions |
| -------: | --------- |
| 10 | Turn order |
| 8 | Quick Claw, Custap Berry, and O-Power Trigger Messages |
| 7 | Pursuit (but only if the target is planning on retreating) |
| 6.8 | Player Actions: Use Item, Flee (also used by Roaming Pokemon) |
| 6.6 | Rotating |
| 6.4 | Retreating |
| 6.2 | Mega Evolution |
| 6 | Focus Punch charges |
| 5 | Helping Hand |
| 4 | Protection: Protect, Detect, King's Shield Magic Coat, Snatch, Spiky Shield |
| 3 | Endure, Fake Out, Quick Guard, Wide Guard, Crafty Shield |
| 2 | High Priority: Extremespeed, Feint, Follow Me, Rage Powder |
| 1 | Priority: Ally Switch, Aqua Jet, Baby-Doll Eyes, Bide, Bullet Punch, Ice Shard, Ion Deluge, Mach Punch, Powder, Quick Attack, Shadow Sneak, Sucker Punch, Vacuum Wave, Water Shuriken |
| 0 | Most moves |
| -1 | Vital Throw |
| -2 | Nothing. There is just a gap here. |
| -3 | Focus Punch |
| -4 | Avalanche, Revenge |
| -5 | Countering: Counter, Mirror Coat |
| -6 | Phasing: Circle Throw, Dragon Tail, Roar, Whirlwind |
| -7 | Trick Room |
| -8 | None |

Once the priority queue is constructed, there are likely to be ties in events. These shall be broken as follows:

1. Priority Level (affected by changePriority)
2. Bump (affected by bumpOrder). Examples include Quick Claw. They keep a Pokemon in their priority level but make them go first or last in it.
3. Speed. Speed modifiers such as Tailwind, stat boosts, and held items may change a Pokemon's speed, but ultimately it comes down to an integer number used to break Priority and Bump ties.
4. Random Pick. If the Priority, Bump, and Speed of multiple Pokemon are identical, they are picked at random, with an even chance for all possible orders.

Important to note is that form changing such as Mega Evolution can cause Pokemon to change their Speed (or priority-affected Ability in Bannette's case), but because turn order is determined before these form changes, they retain their pre-transformation order for the turn. Turn order on the following turn is when this is affected.

### changePriority
- Abilities: Prankster, Gale Wings

### bumpOrder
- Items: Custap Berry, Quick Claw, Lagging Tail, Full Incense
- Abilities: Stall

### changeSpeedOrder
- Abilities: Trick Room (Reverses the order of Pokemon based on their Speed tier. This does not modify either Priority or Bump orders).

Turn Order is ideally stored into a single array of events. This is because, once the full order is decided, it may be modified during the game.

### changeTurnOrder
- Move Effects: Round, After You, Quash, Grass Pledge, Fire Pledge, Water Pledge

D- Turn Events
-------------

Cancel any events about Pokemon that are not on the field. This includes Fainting as well as Red Card and Eject Button.

Message events are trivially run. Mega Evolution follows the basic form change script. Rotating does not trigger any effects. Forfeiting causes the game to end immediately. This leaves retreating and moving.

### beforeRetreat
Pokemon may be trapped as a result of rotation and 
- Abilities: Shadow Tag, Arena Trap, Magnet Pull

### onRetreat
- Abilities: Regenerator, Natural Cure
- Items: Shed Shell

### allowFlinching
Pokemon may be prevented from moving if they are caused to Flinch.
- Abilities: Inner Focus

### onFlinch
- Abilities: Steadfast

### onRecharge
- Abilities: 

### freezeCheck
If the user has chosen a move that will thaw the user, the user will thaw regardless of the success of the move. Otherwise, check if the user thaws naturally.

### confusedCountDown
This is a non-volatile, countdown-based status. Check if it has ended, but don't run the effect yet.

### sleepCountdown
This is a volatile, countdown-based status. Check if it has ended.

### allowAttackWhileAsleep
- Moves: Sleep Talk, Snore

### onConfused
50% of the time, the user is hurt. This does not count as Residual Damage 

### onInfatuated
Check that the source of the Infatuation is still active on the field. This check fails in Rotation Battles when the source is inactive on the field (rotated out of position). Then run the check.

### onParalyzed
Check that the user is allowed to move on this 25%-chance to do nothing.

Now that all of the move-canceling effects are out of the way, the Pokemon now commits to the move.

### moveIsLegal
The move may have become illegal at this point. There are a couple of causes:
1. The Pokemon fainted to Confusion.
2. Spite may have reduced this move's PP down to 0.
3. Taunt, Imprison, Disable, and Encore may have just been triggered. In the case of Encore, the move and target are copied from last turn and the legality check is run from there.

### takeChargeTurn
Moves that take up a charge turn.
- Moves: Bounce, Dig, Dive, Fly, Freeze Shock, Geomancy, Ice Burn, Phantom Force, Razor Wind, Shadow Force, Skull Bash, Sky Attack, Sky Drop, Solar Beam

### skipChargeTurn
Runs the takeChargeTurn event again.
- Items: Power Herb

### ignorePPDrop
- Moves: Rage (Gen 1 Only), Wrap (Gen 1 Only), Bind (Gen 1 Only), Petal Dance, Uproar, Thrash, Outrage

The move is announced. PP is now dropped.
### ppDrop
Abilities: Pressure

The move has begun. Now, its target is selected. Moves with a single target, team, or the field are run all at once. Moves with multiple targets are run one time per target.

### precondition
Many moves have requirements in order to run and fail otherwise. Failed preconditions stop the move immediately.

### preventMove
- Type Effectiveness of 0
- Moves: Protect, Detect, Spiky Shield, Wide Guard, Quick Guard, King's Shield, Crafty Shield
- Abilities: Levitate
- Items: Air Balloon

### accuracyCheck
- Moves: Self-targetting moves always pass this check. ome moves evade this check or trigger a different formula.
- Abilities: No Guard, Tinted Lens
- Items: Wide Lens, Scope Lens

### onMoveFail
Triggered by failed preconditions, prevented moves, and missed moves.
- Moves with Crash Damage: Jump Kick, Hi Jump Kick

### beginMove
Set move flags as appropriate. Be cautious, however; this event should only run one time even for multi-hit and multi-target moves.

### runStatusMove
This is where Status Moves have their share. Run their animations now.
Moves: All Status Moves

### abilityHitCount
This gets an exception because it has a separate power multiplier.
- Abilities: Parental Bond

### getHitCount
- 2-5 Hit Moves: Arm Thrust, Barrage, Bone Rush, Bullet Seed, Comet Punch, Double Slap, Fury Attack, Fury Swipes, Icicle Spear, Pin Missile, Rock Blast, Spike Canon, Tail Slap, Water Shuriken
- 2-Hit Moves: Bonemerang, Double Hit, Double Kick, Dual Chop, Gear Grind, Twineedle
- 3-Hit Moves: Triple Kick*
* Accuracy Check is re-reun each time and power changes between strikes.

Until the onSuccess event, these checks run once per strike per mon. Damage is dealt to ally Pokemon first, and then the opposing Pokemon. In both cases, it should be run in parallel if possible.

### beforeDamage
Move animation and supporting text is run at this time. Certain moves also have certain effects before they deal damage to the foe.
Moves: Selfdestruct, Explosion, Memento

### Damage Calculation
This has articles upon articles written about it due to its incredible complexity. Simply put, the users Attack/Special Attack and Level, the foe's Defense/Special Defense, the base power of the move, and modifiers such as Type Effectiveness, Weather effects, Abilities, and Items go into this calculation. Further detail will go here later.

### dealDamage
- Abilities: Sturdy
- Items: Focus Sash, Focus Band, Recovery Berries

### onContact
- Abilities (foe's): Rough Skin, Iron barbs, Poison Point, Static, Effect Spore
- Items (foe's): Rocky Helmet

### userFaintCheck
This breaks the first tiebreaker. The defending Pokemon wins if it causes the offending Pokemon to faint.

### foeFaintCheck
This breaks the second tiebreaker. The offending Pokemon wins if it causes the defending Pokemon to faint, even if it faints of its own accord (recoil) afterward.

### primaryEffects
These effects are not ignored by Sheer Force. They are attached to the move and run every time in a multi-strike.

#### drainDamage
- Moves: Absorb, Drain Punch, Draining Kiss, Dream Eater, Giga Drain, Horn Leech, Leech Life, Mega Drain, Oblivion Wing, Parabolic Charge
- Abilities (foe's): Liquid Ooze
- Items: Big root

#### recoilDamage
- Moves: Take Down, Double-Edge, Submission, Struggle, Volt Tackle, Flare Blitz, Brave Bird, Wood Hammer, Head Smash, Wild Charge, Head Charge, Light of Ruin
- Abilities: Rock Head, Magic Guard

### secondaryEffects
These effects are ignored by Sheer force. They are extra features of moves and only run after all multistrikes are done. Note that these lists do not contain status moves. That is because those are not secondary effects.
- Abilities: Sheer Force

#### userSecondaryEffects
- Moves that raise Attack: Ancient Power, Fell Stinger, Metal Claw, Meteor Mash, Ominous Wind, Power-Up Punch, Silver Wind
- Moves that raise Defense: Ancient Power, Diamond Storm, Ominous Wind, Silver Wind, Skull Bash, Steel Wing
- Moves that raise Special Attack: Ancient Power, Feiry Dance, Ominous Wind, Silver Wind
- Moves that raise Special Defense: Ancient Power, Ominous Wind, Silver Wind
- Moves that raise Speed: Ancient Power, Flame Charge, Ominous Wind, Silver Wind
- Moves that lower Attack: Superpower
- Moves that lower Defense: Close Combat, Dragon Ascent, Hyperspace Fury, Shell Smash, Superpower, V-create
- Moves that lower Special Attack: Draco Meteor, Leaf Storm, Overheat, Psycho Boost
- Moves that lower Special Defense: Close Combat, Dragon scent, Shell Smash, V-create
- Moves that lower Speed: Hammer Arm, V-create
- Items: Life Orb, Shell Bell

#### foeSecondaryEffects
Note that Shield Dust prevents a foe from taking the secondary effects of any of these moves.
- Moves that Burn: Blaze Kick, Blue Flare, Ember, Fire Blast, Fire Fang, Fire Punch, Flamethrower, Flame Wheel, Flare Blitz, Fling, Heat Wave, Ice Burn, Inferno, Lava Plume, Sacred Fire, Scald, Searing Shot, Secret Power (Volcano), Steam Eruption, Tri Attack
- Moves that Poison: Cross Poison, Fling (Poison Barb), Gunk Shot, Poison Jab, Poison Sting, Sludge, Sludge Bomb, Sludge Wave, Smog, Twineedle
- Moves that Badly Poison: Fling (Toxic Orb), Poison fang
- Moves that Paralyze: Body Slam, Bolt Strike, Bounce, Discharge, Dragon breath, Fling (Light Ball), Force Palm, Freeze Shock, Lick, Nuzzle, Secret Power (Plain, Electric Terrain), Spark, Thunder, Thunder Fang, Thunder Punch, Thunder Shock, Thunderbolt, Tri Attack, Volt Tackle, Zap Cannon
- Moves that Freeze: Blizzard, Freeze Dry, Ice beam, Ice Fang, Ice Punch, powder Snow, Secret Power (Snow), Tri Attack
- Moves that cause Sleep: Relic Song, Secret power (Tall Grass), 
- Moves that Flinch: Air Slash, Astonish, Bite, Bone Club, Dark Pulse, Dragon Rush, Extrasensory, Fake Out, Fire Fang, Fling (, Headbutt, Heart Stamp, Hyper Fang, Ice Fang, Icicle Crash, Iron head, Needle Arm, Rock Slide, Rolling Kick, Secret Power (Cave), Sky Attack, Snore, Steamroller, Stomp, Thunder Fang, Twister, Waterfall, Zen Headbutt
- Moves that Confuse: Chatter, Confusion, Dizzy Punch, Dynamic Punch, Psybeam, Rock Climb, Signal Beam, Water Pulse, Hurricane
- Moves that lower Attack: Aurora Beam, Play Rough, Secret Power (Water),
- Moves that lower Defense: Aid, Crunch, Crush Claw, Iron Tail, Razor Shell, Rock Smash, Secret Power (Underwater)
- Moves that lower Special Attack: Mist Ball, Moonblast, Mystical Fire, Secret Power (Misty Terrain), Snarl, Struggle Bug
- Moves that lower Special Defense: Acid, Acid Spray, Bug Buzz, Earth Power, Energy ball, Flash Cannon, Focus Blast, Luster Purge, Psychic, Seed Flare, Shadow Ball
- Moves that lower Speed: Bubble, Bubblebeam, Bulldoze, Constrict, Glaciate, Icy Wind, Low Sweep, Mud Shot, Rock Tomb, Secret Power (Swamp), Secret power (Soaring)
- Moves that lower Accuray: Leaf Tornado, Mirror Shot, Mud Bomb, Mud-Slap, Muddy Water, Night Daze, Octazooka, Secret Power (Sand)
- Abilities: Serene Grace, Poison Touch
- Items: King's Rock, Razor Fang
- Items (foe's): Eject Button, Red Card

#### Stat Change
Moves: Many

#### causeConfusion
Moves: Many

#### formChange
Moves: Relic Song

#### retreat
Moves: U-Turn, Volt Switch

### foeEffects
This effects may be ignored
Abilities: Sheer Force
Abilities (foe's): Shield Dust

#### causeFlinch
Moves: Many

#### causeConfusion
Moves: Many

#### statChange
Moves: Many

### onSuccess
Moves with after-effects such as support text have that event run now. This event runs one, regardless of multistrike and number of targets.

E- End-of-Turn Events
--------------

The active Pokemon on the field are now sorted by Speed. Their Speed stats may have changed over the course of the turn and some Pokemon may be different from what they were. These effects take place in a particular order to break ties.

### weatherEffect
Weather countdown takes place first. If the weather has reached its last turn, display its ending message. Otherwise, run the weatherEffect event.
- Abilities: Sand Force, Sand Veil, Sand Rush, Ice Body, Snow Cloak, Magic Guard, Rain Dish, Dry Skin
- Items: Safety Goggles

### countdownSlotTarget
- Move Effects (damage): Future Sight, Doom Desire
- Move Effects (recovery): Wish
- Move Effects (field): Grass-Fire Pledge

### cureStatus
- Abilities: Hydration, Healer, Shed Skin

### gradualRecovery
- Move Effects: Aqua Ring, Ingrain
- Items: Leftovers, Black Sludge

### gradualDrain
- Move Effects: Leech Seed

### gradualStatus
Allow abilities to override the effects; otherwise do default damage.
- Abilities: Magic Guard, Poison Heal, Nightmare

### countdown
- Moves that trap: Bind, Wrap, Fire Spin, Clamp, Whirlpool, Sand Tomb, Magma Storm
- Moves that restrict choice: Taunt, Encore, Disable, Torment
- Abilities that restrict choice: Cursed Body
- Moves that levitate: Magnet Rise, Telekinesis
- Moves that restrict actions: Heal Block, Embargo
- Moves that countdown to status: Yawn
- Moves that countdown to damage: Perish Song
- Moves that boost the team temporarily: Reflect, Light creen, Safeguard, Mist, tailwind, Lucky Change, Grass-Fire Pledge, Fire-Water Pledge, Water-Grass Pledge
- Move that change field conditions: Gravity, Trick Room, Wonder Room, Magic Room
- Moves that countdown on their own: Uproar

### passiveEndOfTurn
- Abilities: Speed Boost*, Bad Dreams, Harvest, Mooody
- Items: Toxic Orb, Flame orb, Sticky Barb
*For some reason, this does not activate if the user was switched in this turn.

### gradualChange
- Abilities: Zen mode, Slow Start


