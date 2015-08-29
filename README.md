Rotations
=========
A WIP by Todd Beckman

Battle Pokemon Functions
=======================

Data Functions
--------------

| Function Name | Notes | Parameters |
|---------------|-------|------------|
| name          | Use this function because the 'nick' property may not be in use due to Tranform or Imposter. | |
| hasType       | Use this function because the 'types' property may not be correct due to the presence of type-changing moves. | type |


Action Functions
----------------

Parameter notes:
- points: These are rounded down at the start of the take__Damage events.
- message : This message is only displayed if the event is not canceled.
- StatChange : An array of stage counts starting with Attack. Example Focus Energy: [0, 0, 0, 0, 0, 0, 0, 2]. Example Shell Smash [2, -1, 2, -1, 2, 0, 0, 0]. It is not necessary to populate the entire array.

| Function Name | Notes | Parameters |
|---------------|-------|------------|
| hurt | Not to be called directly. | points | |
| takeDirectDamage | | move, source, target, points |
| takeResidualDamage | Message is displayed if successful. | points, message |
| heal | Not to be called directly | points |
| restore | To be called directly. Fails during Heal Block. | points |
| healDrainDamage | Calls hurt instead of heal if points is negative. Fails during Heal Block. | points |
| gradualHeal | Fails during Heal Block. | |
| consumeItem | Sends the item to the field. Pickup, Harvest, and Recycle can retrieve them. | |
| statBoost | Also called for stat drops. | changes (array) |
| getStatus | The source did it.| status, source |
| cureStatus | | |
| modFriendship | Negative amounts increase from 200. Positive effects diminish one stage from 100 and two stages from 200. | amount |
| suppressAbility | | |



Ability and Item Events
=======================
User has the ability or holds the item. Source is the user of the move. Target is the receiver of the move and its effects.

Some events contain a message to display on success. This message is stored in user.temp.message and can be overwritten.

For each item event, there is a passive and active prefix:
-passiveBeforeSwitch()
-activeBeforeSwitch()

Passive events simply occur. However, when an active event is successful,
the item is consumed. Success is determined by:
- Canceling an event
- Returning a value that is not the default

Abilities do not have the passive/active prefix, but they are capitalized.


Before Events
-------------
Return false to stop the event. Parameters provided are:
- user
- move
- source
- target
- mtype
- typeeff

| Event Name | Notes | Parameters |
|------------|-------|------------|
| BeforeRunAway | Wild Pokemon escape | |
| BeforeSwitchTest | Evades trapping | |
| BeforeSwitch | Trapping; source is trying to escape | user, move, source |
| BeforeFlinch | Prevent Flinching if possible | |
| BeforeMoveUsed | Also called by weather | user, move, source, target, mtype, typeeff |
| BeforeFoeMoveUsed | May cancel the move entirely | user, move, source, target, mtype, typeeff |
| BeforeMoveCanceled | May reverse the cancel (only when Ability canceled) | |
| BeforeFoeCriticalHit | Does not stop the move entirely | |
| BeforeRecoil | Does not stop the primary damage | |
| BeforeSecondaryEffects | Does not stop the primary damage | |
| BeforeFoeSecondaryEffects | Does not stop the primary damage | |
| BeforeHazardEffects | | user |
| BeforeLoseLastHP | Does not fire except by direct damage | user |
| BeforeSandDamage | | user |
| BeforeHailDamage | | user |
| BeforeStatDrop | | user, stat, stages |
| BeforeParalyzed | Source may not exist. Not run for Electric Pokemon. | user, source |
| BeforeBurned | Source may not exist. Not run for Fire Pokemon. | user, source |
| BeforePoisoned | Source may not exist. Not run for Poison or Steel Pokemon. | user, source |
| BeforeFrozen | Source may not exist. Not run for Ice Pokemon. | user, source | BeforeSuppressAbility | Some abilities cannot be suppressed. | |
| BeforeKnockOff | Some abilites prevent loss of item. Some items cannot be removed. Also called by Thief, Trick, and Bestow. | user, move, source, target | BeforeHeal | | user, points |

Get Events
----------
Ability, Passive Item, Active Item, in that order, allow overriding. Return false to prevent overriding. Parameters provided are:
- user
- move
- mtype

| Event Name | Notes | Paremeters |
|------------|-------|------------|
| GetHitCount | 2-5 Multi-hit count | |
| GetDamageCount | Parental Bond handled separetly | |
| GetDuration | Change duration caused by moves | user, move |
| GetPriorityChange | Changes Bump, not directly Priority | user, move |
| GetTypeEffectiveness | 0, 0.5, 2 | user, move |
| GetFlinchOdds | Abilites and Items don't stack | user, move |

Multiply Events
---------------
Active Item events are consumed if they do not return 1. Avoid returning 0 by canceling the event prior to reaching these criterion. Paremeters provided are:
- user
- move (overridden in statboost)
- mtype
- source
- target
- typeeff (overall, including all type match-ups)
- crit (whether this move is landing a critical hit)
- hit (the nth hit of the multi-hit move)
- hit2 (the nth hit of a Parental Bond user's move)

| Event Name | Parameters |
|------------|------------|
| MultiplyPower | user, move, mtype, source, target, typeeff, crit, hit, hit2 |
| MultiplyFoePower | user, move, mtype, source, target, typeeff, crit |
| MultiplyStatBoost | user, stats (array) |
| MultiplyAttack | user |
| MultiplyDefense | user |
| MultiplySpeed | user |
| MultiplySpecialAttack | user |
| MultiplySpecialDefense | user |
| MultiplyAccuracy | user |
| MultiplyEvasion | user |
| MultiplyCritical | user |
| MultiplyCool | user |
| MultiplyBeautiful | user |
| MultiplyCute | user |
| MultiplyClever | user |
| MultiplyTough | user |
| MultiplyDrain | user, move |
| MultiplyFoeDrain | user, move |
| MultiplyRecoil | user, move |
| MultiplyExperience | |
| MultiplyPrize | |

After Events
------------
Active Item events returning true consume the item. Otherwise, no return is expected from these events. Parameters provided are:
- user
- move, status, or stat
- source
- target
- damage (exact points of damage dealt directly)

| Event Name | Parameters |
|------------|------------|
| AfterSendOut | user |
| AfterFlinch | user |
| AfterFoeMakeContact | user, move, source |
| AfterDealDamage  | user, move, source, target, damage |
| AfterTakeDamage  | user, move, source, target, damage |
| AfterStatDrop | user, stat, source |
| AfterGetConfused | user, move, source |
| AfterGetInfatuated | user, move, source  |
| AfterWeatherChange | user |
| AfterParalyzed | user, source |
| AfterBurned | user, source |
| AfterPoisoned | user, source |
| AfterFrozen | user, source |

End of Turn (EOT) Events
------------------------
All EOT events may be canceled by returning false. Canceling an Active Item event consumes the item. Parameters provided are:
- user

| Event Name | Notes | Parameters |
|------------|-------|------------|
| EOT_WeatherDamage | Safety Goggles, various Abilities. Weather is called if not canceled. | user |
| EOT_StatusDamage | Poison Heal | user |
| EOT_GradualHeal | Leftovers, Black Sludge | user |
| EOT_GradualDamage | Black Sludge, Curse, Nightmare, Bad Dreams | user |
| EOT_CauseGradualDamage | Bad Dreams | user |
| EOT_CureStatus | Shed Skin, Hydration, Healer | user |
| EOT_GetStatus | Flame Orb, Toxic Orb, Sticky Barbs | user |
| EOT_PassiveAbility | | user |
| EOT_FormChange | Zen mode | user |
| EOT_StatCountdown | Slow Start | user |

