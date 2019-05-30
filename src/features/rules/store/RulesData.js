export const rulesRaw =
    [
        {
            header: 'Not a Wargame',
            paragraphs:
                [
                    "One core assumption of this system is: 5th Edition players are already playing a very complex game and should not be expected to also play a whole other wargame.",
                    "You may disagree with that. You might think that having a complete, robust, epic-scale miniatures wargame for 5th Edition would be keen. And I would agree with you! But you and I are not the only people to consider.",
                    "Because every table I’ve played at had one or two players who loved wargames, one or two who didn’t feel strongly about them one way or the other, and one or two who really didn’t want to play a wargame of any sort. They showed up to play their character and had no interest in running an army.",
                    "This system, therefore, is opt-in. You can award your players units, they can hire mercenary units, they can build a stronghold and attract units, and they may use them in battle. But a player who finds warfare distasteful can literally ignore it all, and while the other players are commanding an army, they’ll just be playing their characters.",
                    "While you can use this system all by itself to resolve a battle—or use the rules in Appendix: Simple Warfare (page 243) for something even faster and more streamlined—this system assumes a battle (clash of armies) takes place at the same time as an encounter (PCs fighting monsters and bad guys). While the heroes fight the villains in the castle courtyard, their armies clash outside."
                ],
            subs: []
        },
        {
            header: 'Heavily Abstracted',
            paragraphs:
                [
                    "This system deploys a lot of jargon that evokes the feel of real strategy and tactics—'heavy infantry,' 'flanking,' 'morale'—and those terms all have real mechanical meaning. But we don’t track position at all. The Order of Battle (page 241) describes which units that a unit can legally attack, but the physical positions of your units are entirely abstract. The armies clash outside the castle walls, or over the nearby hill, or along the road leading to the town, but we don’t worry about where the units are standing, or how far away they are from each other, or which unit is next to which. We presume the armies know how to do their job and are doing their best to maintain position and carry out orders",
                    "Likewise, we do not track individual soldiers nor do we worry overmuch about exactly how big a unit is. The typical Medium Infantry unit is assumed to be 100 soldiers, give or take. A group of 12 knights could be a unit unto themselves, and they would have very good stats indeed, but a very small casualty die (probably a d4, see The Casualty Die on page two-hundred and forty four)."
                ],
            subs: []
        },
        {
            header: 'Individuals Don’t Matter',
            paragraphs:
                [
                    "Every time I release a mass combat system, going all the way back to 2002, there’s always a vocal minority of people arguing that their 5th-level wizard with a potion of fly should be able to single-handedly obliterate an enemy army.",
                    "I know that sounds like I’m exaggerating, but that’s a real example of a complaint that stuck in my head.",
                    "It’s perfectly reasonable in an RPG about heroic fantasy to expect your hero to be the key figure in a war. But in my opinion, if that’s the kind of game you want to run…you don’t really need a system for warfare. If you’re running a game where the outcome of an entire war depends on the actions of one character or a small group…you’ve got a whole fantasy RPG for that! That sounds like a great adventure!",
                    "There are plenty of examples of this in the canon. WWII was certainly a war, but WWII movies aren’t about armies—they’re about small groups of heroes who alone make the difference. An RPG party, in other words. Look ye to The Dirty Dozen or Where Eagles Dare or Inglorious Basterds.",
                    "Instead we accept that warfare in the game is essentially the same as real medieval warfare, and the existence of wizards and clerics doesn’t render armies obsolete—because, again, if that is your philosophy, you don’t need rules—it just makes armies more interesting."
                ],
            subs: []
        },
        {
            header: 'The Army that Holds Morale Holds the Field',
            paragraphs:
                [
                    "All commanders yearn for a tactical masterpiece, a la the Battle of Cannae, whereby through careful planning, expert maneuvering, and a little luck, one side executes a perfect encirclement of the other.",
                    "But even under these ideal conditions, the battle isn’t won when the last soldier is killed—that is a deeply ahistorical notion. The battle is over as soon as one army breaks morale and runs. Archeological diggings bear this out: the heaviest casualties were not inflicted on the site of the battle, but along the path of the fleeing army.",
                    "So, morale is critical. Every unit has a Morale score—its ability to deal with adversity and the unexpected without freaking out. Your units will make lots of Morale checks, and failing a Morale check is just as devastating to a unit as its soldiers dying.",
                    "This is something all field commanders quickly learn: Killing a soldier with sword or pike is long, dangerous, bloody business. But if you can cause a soldier to panic, if you can convince them the battle is lost before it’s begun, if you can throw their unit into disarray, then you have won.",
                    "A soldier who quits the field and runs away is tactically no different than a dead soldier. Neither contributes their might to their unit anymore, and the unit is diminished as a result. If enough soldiers panic and flee, the unit disbands. An entire unit can be annihilated without a soldier ever dying. Because a unit is not merely a collection of soldiers—it is their ability to move, take orders, and fight in a coordinated fashion. Attack that ability, and you attack the unit.",
                    "The good news is, soldiers who run away actually do live to fight another day, and units that break morale in one battle can, under certain circumstances, be reformed to fight in the next battle."
                ],
            subs: []
        },
        {
            header: 'Anatomy of a Unit',
            paragraphs: [
                "Your army is made up of units. Each unit has a card with stats, and its status is tracked with a casualty die. Let’s take a look at a typical unit card."
            ],
            subs: [
                {
                    subheader: 'Name and Keywords',
                    paragraphs: [
                        "Every unit has an evocative name. The Ironheart Defenders. The Blood Moon Infantry. The 7th Imperial Legion. These names are purely flavor.",
                        "Our Ironheart Defenders have the following keywords: dwarf (ancestry), seasoned (experience), medium (equipment), and infantry (type). Each keyword has an associated chart (See Creating Your Own Units on page 237) showing you which bonuses you get from each keyword."
                    ]
                },
                {
                    subheader: 'Ancestry',
                    paragraphs: [
                        "You can find a chart listing several likely ancestries you might need and the unit bonuses they confer on page 237. Any ancestry you find in the core rules, any species or monster, could be fielded as a unit, and Kingdoms & Warfare will list many more. My players once fought an army composed of jellies and oozes when they failed to stop the cults in the Temple of Primordial Chaos."
                    ]
                },
                {
                    subheader: 'Experience',
                    paragraphs: [
                        "Experience describes both how much fighting the unit has seen and how well trained they are. The levels of experience are:",
                        "Green: Soldiers with any training, but who have seen no action. Levies who survive a battle automatically convert into green infantry.",
                        "Regular: Normal soldiers. A unit of volunteers who’ve been well trained by seasoned commanders can begin as regular, and a typical large army is mostly composed of regular units.",
                        "Seasoned: Troops who’ve seen more than one battle and lived to tell the tale. Well versed in warfare, probably been exposed to stuff that really challenged their morale, like battle magic.",
                        "Veteran: Troops who have seen several battles and know what to expect in warfare. They are resilient and versed in tactics used to break morale.",
                        "Elite: Soldiers who haven’t just seen a lot of battle and survived, but have trained and executed complex maneuvers under extraordinary conditions. Elite troops require a degree of flexibility in thinking and improvisation rarely found in normal soldiers, even veterans.",
                        "Super-elite: The most highly trained and battle- hardened units. These are typically shock troops, orders of knights on horseback. Small units capable of surviving for long periods behind enemy lines.",
                        "Experience affects a unit’s Attack (their ability to successfully execute an offensive maneuver) as well as their Toughness (their ability to withstand a successful attack without taking casualties). But mostly a unit’s experience affects their Morale: their ability to withstand punishment and endure confusion on the battlefield without becoming afraid or—just as bad—getting so disorganized that they can no longer fight effectively.",
                    ]
                },
                {
                    subheader: 'Equipment',
                    paragraphs: [
                        "How heavily armed and armored is the unit? The ranks are:",
                        "Light: Leather or no armor. Some troops are lightly armored because they’re peasants. Some are lightly armored because it grants them greater mobility, allowing them to be deployed quickly into a distant battle.",
                        "Medium: Hide or a chain shirt.",
                        "Heavy: Breastplate and shield, or chain mail. Maybe ring mail—we don’t get really picky about exactly where each armor combo falls on this scale.",
                        "Super-heavy: Full plate mail, heavy weapons, and the training to use them effectively.",
                        "Equipment grants bonuses to the unit’s Power (the effectiveness of their weapons) and Defense (their ability to prevent an attack from being successful)."
                    ]
                },
                {
                    subheader: 'Type',
                    paragraphs: [
                        "What kind of unit is this? How does it fight? More than any of the other keywords, type defines the unit and affects all of its stats. It also defines which units are legal targets, as described in the Order of Battle (page 241).",
                        "Levies: Unsoldiers. Levies have no experience level and always have no equipment. They are peasants forced to fight by cruel masters, or willing to fight to defend their land. They’re basically crap at everything, but they perform a critical function: they absorb casualties, allowing your better-trained units to keep fighting longer. If they survive, they can become green infantry!",
                        "Levies usually disband after a couple days’ battles. They do not stick around for weeks waiting to fight—they have farms to tend. Once they disband, you must convince them to fight all over again. You cannot pay upkeep to maintain them as a standing army.",
                        "Infantry: The meat (possibly literally, depending on whom you’re fighting) and potatoes of your army. Very limited in whom they can attack.",
                        "Archers: Typically archers. Could be javelinthrowers if you’re talking Bronze Age dudes. Can basically attack anyone.",
                        "Cavalry: Highly mobile troops deployed to flank the enemy and hit them where they’re not defended.",
                        "Flying: Flying units! That’s right!",
                        "Fortifications: Keeps, towers, and temples are all fortifications (see Strongholds as Fortifications on page 9), but so too can a hill or a wall be one. Any terrain feature one side can defend or occupy. Typically, defending a fortification grants the defending units a Morale bonus.",
                        "Siege Engines: Typically catapults and trebuchets, but also monsters like treants, if pressed into service.",
                    ]
                }
            ]
        },
        {
            header: 'SIZE',
            paragraphs:
                [
                    "How big, in numbers, is your unit? This is the unit’s Size, which is represented by a casualty die placed on its unit card. New units begin battle with their casualty die on its highest face (e.g., 6 for a d6, 8 for a d8). A unit’s die is decremented—reduced by one—each time it fails a Morale check and each time an attacker succeeds on a Power check against it.",
                    "Your army only has one card for a given unit. So if your army has a lot of Regular Heavy Human Infantry, to pick a random example, you won’t have several cards all with the same stats. Instead, that unit gets a larger casualty die. The largest casualty die is a d12, which represents a very large unit8 that can suffer many casualties before it breaks or is slaughtered.",
                ],
            subs: []
        },
        {
            header: 'ATTACK AND DEFENSE',
            paragraphs:
                [
                    "When your unit attacks an enemy unit, you roll a d209 and add your unit’s Attack. To succeed on the attack, the result of your roll must equal or exceed the enemy’s Defense, a measure of both the quality of their gear and their relevant training."
                ],
            subs: []
        },
        {
            header: 'POWER AND TOUGHNESS',
            paragraphs:
                [
                    "If your unit succeeds on its attack, it’s time to see whether your unit is strong enough, and well-trained enough, to inflict meaningful casualties.",
                    "Any successful attack will have some consequences, but when you’re dealing with hundreds of soldiers, one or two of them dying isn’t significant. Toughness represents both their literal physical toughness and the quality of their gear. A successful Power check against a unit means they will suffer enough casualties to decrement the casualty die and, depending on the shape the unit is in, this may cause a Morale check!"
                ],
            subs: []
        },
        {
            header: 'MORALE',
            paragraphs:
                [
                    "Morale is a unit’s most important stat, since lots of things in battle can prompt a Morale check. Unit abilities or battle magic that forces a Morale check will list the DC in the text of the ability or spell. If your unit is diminished (page 242), just taking casualties can prompt a Morale check.",
                    "Failing a Morale check decrements the unit’s casualty die. As far as your unit’s effectiveness is concerned, there’s no difference between losing morale and losing soldiers.",
                ],
            subs: []
        },
        {
            header: 'NO HIT POINTS',
            paragraphs:
                [
                    "Your character will be attacked many times over the course of an encounter. Some attacks miss, some hit.",
                    "The same is true for the units in your army.",
                    "A hit does not always mean your character dies, though. Each attack roll begets a damage roll, and it is only after many successful attack rolls and many damage rolls that your character finally drops.",
                    "And, The same is true for the units in your army.",
                    "But because A: you are already playing a character with hit points and doing math every time you take damage and B: you’re maybe running several units at once, we do not burden you with doing math over and over again for your character and all your units.",
                    "Instead, a successful attack check against a unit prompts a Power check, in which the attacking unit checks to see “Was the strength of our attack enough to overcome the enemy’s Toughness?”",
                    "A common reaction to this system is “Why are there two attack rolls?” There aren’t! There’s one attack roll and one damage roll. There’s just no math associated with the damage roll."
                ],
            subs: []
        },
        {
            header: 'CREATING YOUR OWN UNITS',
            paragraphs:
                [
                    "Using the following rules, you can build your own units with some ancestry options found in most campaigns.",
                    "Start by picking a row from each of the following charts. As you go, write down the total for each stat (Power, Toughness, etc.) on a blank unit template (page 267). Remember that levies have no equipment rating or experience rating. They’re just levies.",
                    "Defense and Toughness both start at 10.",
                ],
            subs: [
                {
                    subheader: 'Step One: Ancestry',
                    paragraphs: [
                        "Choose an ancestry below and add its stat bonuses to the unit card. Then find the traits of the unit’s ancestry on the next page and add them to the unit card."
                    ]
                },
                {
                    subheader: 'Step Two: Experience',
                    paragraphs: [
                        "Next, choose an experience level and add the bonuses listed to the unit’s card.",
                    ]
                },
                {
                    subheader: 'Step Three: Equipment',
                    paragraphs: [
                        "Now do the same thing with equipment.",
                    ]
                },
                {
                    subheader: 'Step Four: Type',
                    paragraphs: [
                        "And then type. Levies and cavalry both have traits listed below that can be added to their unit card if you want to make it easier to remember during battle. Cavalry units gain Charge and can engage.",
                        "Charge: Cannot use while engaged. A Charge is an attack with advantage on the Attack check. It inflicts 2 casualties on a successful Power check. The charging unit is then engaged with the defending unit and must make a DC 13 Morale check to disengage.",
                        "Levies are always diminished.",
                    ]
                },
                {
                    subheader: 'Step Five: Size',
                    paragraphs: [
                        "Choose a size. This can dramatically affect the unit’s final cost.",
                    ]
                },
                {
                    subheader: 'Step Six: Calculating Cost',
                    paragraphs: [
                        "Now that you’ve filled out the unit card with all its stats, it’s time to calculate its cost. This can be the literal cost to buy the unit in gold pieces, in the case of mercenaries, or just the cost used to balance encounters and calculate upkeep.",
                        "First, add up the bonuses to Attack, Power, Defense, and Toughness, and add double the total bonus to Morale.",
                        "Then, multiply this total by the Cost Modifier from the unit’s type, and then multiply it by its Cost Modifier from Size. Multiply this result by 10.",
                        "Add the cost of all the traits of the unit’s ancestry. Finally, add a flat 30 points.",
                    ]
                },
                {
                    subheader: 'Mercenaries',
                    paragraphs: [
                        "Mercenaries are troops loyal only to the coin you pay them. Any units bought with gold are mercenaries. Their cost is equal to their unit cost, but their upkeep is double that of a normal unit.",
                    ]
                },
                {
                    subheader: 'Ancestry and Attitude',
                    paragraphs: [
                        "You can buy units with the same ancestry as your character with no extra cost. However, units from other cultures have their own attitude toward working for a puny human, or treacherous elf, or whatever your character’s ancestry might be, as described on the chart below.",
                        "The chart is mirrored across the diagonal, so you can use it in either direction. Find your character’s ancestry in either a row or a column, and then index it against the ancestry of the unit you wish to buy.",
                        "Allied (A): This unit has its normal cost to buy and upkeep.",
                        "Friendly (F): This unit costs 25% more to buy and upkeep.",
                        "Neutral (N): This unit costs 50% more to buy and upkeep.",
                        "Hostile (H): You cannot buy this unit.",
                        "Through good roleplaying and negotiation, though, you can change the attitude of a particular leader or army toward your character."

                    ]
                },
                {
                    subheader: 'Ambassadors',
                    paragraphs: [
                        "An ambassador (page 96) allows you to buy units from their ancestry as though they were friendly. If the ambassador’s presence in your court leads to a formal alliance and a signed treaty, then units with that ancestry are treated as allied.",
                    ]
                },
                {
                    subheader: 'Unit Upkeep and Improvement',
                    paragraphs: [
                        "Depending on the scenario, the units you command may naturally disband after the battle, such as levies, or return to their homes, like a unit of elves who come to your aid in a time of dire need. But units you recruit from your stronghold or buy with cash require upkeep.",
                        "A unit must be paid a tenth its cost each season. Not all this cash goes into the soldier’s pocket—much of it is paying for food and training and repairing their gear.",
                        "A unit that has not been paid for a season suffers disadvantage on Morale checks. A unit that has not been paid for two seasons disbands.",
                        "A unit’s equipment (light, medium, heavy, super-heavy) can be improved once per season by paying gold pieces equal to the difference in cost between the new and old unit.",
                        "A unit’s experience (regular, seasoned, etc.) can be improved by one level after they survive two battles without breaking morale or retreating. It takes a week of training at a keep (or at a barracks if you have a captain follower) and costs gold pieces equal to the difference between the new and old unit.",
                        "You can field several infantry units, or several cavalry units for instance, but you can only field one unit with identical keywords. You may fight a battle with Human Veteran Light Infantry and Elf Veteran Light Infantry, but not two units of Human Veteran Light Infantry.",
                        "If you roll on a follower chart and get an identical unit to one you already have, just increase the first unit’s size by one step.",
                        "Once per season, you can spend gold pieces to increase a unit’s size by one step. The cost is the difference in price between the old unit and the new unit.",

                    ]
                },
            ]
        },
        {
            header: 'Narrating the Battle',
            paragraphs:
                [
                    "We’ve done our best to give units abilities with evocative names, but at the end of the day it’s still the GM’s responsibility to narrate what happens after an attack fails or a unit disbands. Of course, you can enlist the players in this cause! They can narrate their units’ actions while you narrate the enemy units’.",
                    "A unit that fails an attack might be described as surging forward, smashing into the opposing units, but the enemy’s shields repulse the attackers. Archer units fire a volley of arrows into the air and the recipients fail to deploy shields in time; dozens of soldiers are cut down by arrow-fire. In the end, however you do it, the raging battle should evoke resounding clash of arms, routs, victories and reversals.",
                    "Now that we understand the basic rules, and we’ve looked at a sample unit and talked about how it functions, let’s fight a war!",
                ],
            subs: []
        },
        {
            header: 'BATTLE',
            paragraphs: [],
            subs:
                [
                    {
                        subheader: 'Setup',
                        paragraphs: [
                            "Place all the unit cards involved in the battle on the table where everyone can see them.",
                            "Feel free to let players with no units control any extra units the party has recruited.",
                        ]
                    },
                    {
                        subheader: 'The Encounter',
                        paragraphs: [
                            "While the PCs are fighting the bad guys, their armies are clashing nearby. Outside the castle walls, or in a nearby field, or on a hill.",
                            "Roll initiative and set up your encounter normally, and run it as you would any other."
                        ]
                    },
                    {
                        subheader: 'Issuing an Order',
                        paragraphs: [
                            "On a player’s turn, they may issue one order to a fresh allied unit. The default order is “Attack!” A unit may have other possible orders, as described on its card.",
                            "Each turn, the GM may issue an order to a number of enemy units equal to the number of players. The GM may choose to have all enemy units act when the main villain acts. Or “give” units to several different enemy characters to act at different points in the initiative order.",
                            "Using battle magic also counts as issuing an order.",
                            "Issuing an order to a unit exhausts it. An exhausted unit cannot carry out an order again until it is refreshed.",
                            "All units begin the battle refreshed. Once all units are exhausted, all units are immediately refreshed.",
                        ]
                    },
                    {
                        subheader: 'Attack',
                        paragraphs: [
                            "Choose an attacking unit and a legal defending unit. A unit’s type determines which units it can legally attack. Other effects, like charge and engage, may create exceptions to these rules.",
                            "Then, roll an Attack check: Roll a d20 and add your unit’s Attack bonus. If the result equals or exceeds the defending unit’s Defense, the attack succeeds, which prompts a Power check.",
                            "Rolling a 20 on an Attack check is a critical hit and the attacking unit makes two Power checks against the target.",
                        ]
                    },
                    {
                        subheader: 'Power',
                        paragraphs: [
                            "For your unit to inflict a casualty, you must make a Power check against the defender’s Toughness. Roll a d20 and add your unit’s Power bonus. If the result equals or exceeds the defending unit’s Toughness, you inflict a casualty! Decrement the defender’s casualty die by one.",
                            "If its casualty die already shows 1 and takes a casualty, remove the unit from the battle unless it is rallied.",
                        ]
                    },
                    {
                        subheader: 'Rally',
                        paragraphs: [
                            "Any unit that would be removed from battle can be rallied. Their commander makes a DC 15 Morale check. On a success, the unit remains in the battle with its casualty die at 1, but it cannot be rallied again. On a failure, the unit is removed from battle.",
                        ]
                    },
                    {
                        subheader: 'Diminished',
                        paragraphs: [
                            "Once a unit loses half its size—for example, if its d6 casualty die reads 3 or less—it is diminished.",
                            "Each time it suffers a casualty while diminished, it must make a DC 15 Morale check. If it fails, it immediately suffers another casualty.",
                            "Levies are always considered diminished."
                        ]
                    },
                    {
                        subheader: 'Charge',
                        paragraphs: [
                            "Some units and all Cavalry have a special attack maneuver called Charge. A Charge is an attack with advantage on the Attack check. On a successful Power check, a Charge inflicts 2 casualties, and the charging unit becomes engaged with the defending unit.",
                        ]
                    },
                    {
                        subheader: 'Engage and Disengage',
                        paragraphs: [
                            "Some attacking units can engage a defending unit. While engaged, both units may only attack each other. Unless otherwise specified, the attacking unit can choose to disengage as an order. The defending unit cannot disengage. As an order, the attacking unit can make a DC 13 Morale check to disengage on a subsequent turn.",
                            "An engaged unit cannot charge",
                        ]
                    },
                    {
                        subheader: 'Ordering a Retreat',
                        paragraphs: [
                            "Either side might decide the battle is not going their way and wish to preserve as much of their army as possible. You may want to use your army in another battle, or hope that reinforcements are coming, but also even in defeat, having a working (though diminished) army under your command improves your position in negotiations drastically more than not having an army anymore.",
                            "Therefore you can, on your turn, order your entire army to retreat. You can only give this order when all of your side’s units are fresh. All of your units immediately make a Morale check (DC 15) and are removed from the battle, ending the battle. The retreating army suffers any consequences of defeat and the normal penalties for failing the Morale check made to retreat.",
                            "However, your army may be unable to retreat because of their position and circumstance. They might be on a hill surrounded by an enemy, for instance, or backed against a sheer cliff, or boxed into a canyon. This is mostly at the GM’s discretion and is detailed further in Kingdoms & Warfare.",
                        ]
                    },
                ]
        },
        {
            header: 'VICTORY AND DEFEAT',
            paragraphs:
                [
                    "The GM will determine the victory conditions for a battle, but here are some typical situations:",
                    "If the enemy leader is defeated, the army immediately disbands.",
                    "If the players are defending a fortification and it falls, their peasant levies disband, their allies (i.e., units who pledged aid for roleplaying or diplomatic purposes) retreat, and any remaining units must immediately make DC 15 Morale checks. At this point, if the players don’t call the retreat, they’re basically going to grind their army into nothing.",
                    "If either side loses all their infantry, their remaining units retreat.",
                    "If the PCs are defeated in battle, their army disbands. It can, later, reform depending on the consequences for losing the encounter.",
                    "",
                    "Of course we expect the players will win battles. But just as in encounters, we have to deal with the edge case of players losing. The heroes’ army may be ground into dust, the heroes may suffer a TPK. These things should be unlikely, but they’re possible.",
                ],
            subs: [
                {
                    subheader: 'Defeat',
                    paragraphs: [
                        "If one army is defeated (i.e., all its units have been eliminated or quit the field), the characters on the winning side gain a additional action each round, which can be used to make an attack or cast a spell with casting time of “one action.”",
                        "This represents the morale bonus the winners gain for defeating the losers and helps lead the encounter more rapidly to its natural conclusion."
                    ]
                },
                {
                    subheader: 'Unit Recovery',
                    paragraphs: [
                        "Units recover one casualty the day after a battle. Units that fight a subsequent battle, or who fight more than one battle in a day, begin the battle with their original casualty die set at their current casualty level.",
                        "A wounded unit’s size continues to increase by one each week until its size is equal to any casualty die (d4, d6, d8, d10, d12). This is the new size of the unit. Its upkeep cost is adjusted accordingly. You may spend gold to improve the unit’s size as normal."
                    ]
                },

            ]
        },
    ];