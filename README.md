Rotations
=========
A WIP by Todd Beckman
=====================



ABILITY AND ITEM EVENT GUIDE
============================
User has the ability or holds the item. Source is the user of the move. Target is the receiver of the move and its effects.

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
|  Event Name | Notes | Parameters |
|-------------|-------|------------|
| BeforeRunAway | Wild Pokemon escape | |
| BeforeSwitchTest | Evades trapping | |
| BeforeSwitch | Trapping; source is trying to escape | user, move, source |
| BeforeFlinch | Prevent Flinching if possible | |
| BeforeFoeMoveUsed | May cancel the move entirely | user, move |
| BeforeMoveCanceled | Reverses the cancel (only when Ability canceled) | |
| BeforeFoeCriticalHit | Does not stop the move entirely | |
| BeforeRecoil | Does not stop the primary damage | |
| BeforeSecondaryEffects | Does not stop the primary damage | |
| BeforeFoeSecondaryEffects | Does not stop the primary damage | |
| BeforeLoseLastHP | Does not fire except by direct damage | user |

Get Events
----------
Ability, Passive Item, Active Item, in that order, allow overriding. Return false to prevent overriding. Parameters provided are:
- user
- move
| Event Name | Notes | Paremeters |
|------------|-------|------------|
| GetHitCount | 2-5 Multi-hit count | |
| GetDamageCount | Parental Bond handled separetly | |
| GetDuration | Change duration caused by moves | user, move |
| GetPriorityChange | Changes Bump, not directly Priority | user, move |
| GetTypeEffectiveness | 0, 0.5, 2 | user, move |

Multiply Events
---------------
Active Item events are consumed if they do not return 1. Avoid returning 0 by canceling the event prior to reaching these criterion. Paremeters provided are:
- user
- move
- source
- target
- typeeff (overall, including all type match-ups)
- crit (whether this move is landing a critical hit)
- hit (the nth hit of the multi-hit move)
- hit2 (the nth hit of a Parental Bond user's move)
| Event Name | Parameters |
|------------|------------|
| MultiplyPower | user, move, source, target, typeeff, crit, hit, hit2 |
| MultiplyFoePower | user, move, source, target, typeeff, crit |
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
| AfterFlinch | user |
| AfterFoeMakeContact | user, move, source |
| AfterDealDamage  | user, move, source, target, damage |
| AfterTakeDamage  | user, move, source, target, damage |
| AfterGetStatus | user, status, source |
| AfterStatDrop | user, stat, source |
| AfterGetConfused | user, move, source |
| AfterGetInfatuated | user, move, source  |
| AfterWeatherChange | user |

End of Turn (EOT) Events
------------------------
All EOT events may be canceled by returning false. Canceling an Active Item event consumes the item. Parameters provided are:
- user
| Event Name | Notes | Parameters |
|------------|-------|------------|
| EOT_WeatherDamage | Safety Goggles, various Abilities | user |
| EOT_StatusDamage | Poison Heal | user |
| EOT_GradualHeal | Leftovers, Black Sludge | user |
| EOT_GradualDamage | Black Sludge, Curse, Nightmare, Bad Dreams | user |
| EOT_CauseGradualDamage | Bad Dreams | user |
| EOT_CureStatus | Shed Skin, Hydration, Healer | user |
| EOT_GetStatus | Flame Orb, Toxic Orb, Sticky Barbs | user |
| EOT_FormChange | Zen mode | user |
| EOT_StatCountdown | Slow Start | user |

