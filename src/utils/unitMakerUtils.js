// parse a db unit and prepare it for display
export const composeUnit = (unit) => {
    const
        extras = {},
        stats = {};

    let extrasCost = 0;

    ['traits', 'actions', 'attachments'].map(extra => {
            extras[extra] =
                [].concat(
                    unit.ancestry[extra] || [],
                    unit.experience[extra] || [],
                    unit.equipment[extra] || [],
                    unit.type[extra] || []
                );
            return extrasCost += extras[extra].reduce((acc, extra) => acc + (extra.cost), 0)
        }
    );

    ['attack', 'defense', 'power', 'toughness', 'morale'].map(stat => {
        let value = unit.ancestry[stat] + unit.experience[stat] + unit.equipment[stat] + unit.type[stat] + unit.customization[stat];
        return stats[stat] = (value >= 0 ? '+' + value.toString() : value.toString());
    });

    const calculatedCost = Math.round(
        30 +
        (
            (unit.attack + unit.power + (unit.defense - unit.baseDefense) + (unit.toughness - unit.baseToughness) + (unit.morale * 2))
            * (unit.type.cost || 1)
        )
        * (unit.size / 6) * 10 + extrasCost
    ) + unit.customization.cost;


    return {
        name: unit.name || 'Unit Name',
        lore: unit.lore || '',
        ...stats,
        size: 'd' + unit.size.toString(),
        cost: calculatedCost,
        currency: unit.currency,
        ...extras,
        ancestry: unit.ancestry,
        experience: unit.experience,
        equipment: unit.equipment,
        type: unit.type,
    }
};

export const stringifyObjectStats = (object) => {
    const withSign = value => value >= 0 ? '+' + value.toString() : value.toString();
    let stats = [];
    ['attack', 'defense', 'power', 'toughness', 'morale'].map(stat => stats.push(withSign(object[stat])));
    return (stats.join('/'));
};

export const emptyUnitObject = () => (
    {
        name: '',
        description: '',
        commander: '',
        stats: {},
        ancestry: emptyAspect('ancestry'),
        equipment: emptyAspect('equip'),
        experience: emptyAspect('exp'),
        type: emptyAspect('type'),
        customization: emptyAspect(),
        size: 4,
        cost: 30,
        currency: 'GP'
    }
);

export const emptyAspect = (type) => ({
    name: type,
    cost: 0,
    traits: [],
    attachments: [],
    actions: [],
    attack: 0,
    defense: 0,
    toughness: 0,
    power: 0,
    morale: 0,
});

export const blurOnKeyDown =
    e => ((e.keyCode === 27) || (e.keyCode === 13)) && e.target.blur();