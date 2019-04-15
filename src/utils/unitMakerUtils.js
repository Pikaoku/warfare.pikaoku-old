export const composeUnitFeatures = (unit, uniq = false) => {
    let features = [];
    ['ancestry', 'experience', 'equipment', 'type', 'customization'].map(
        aspect => unit[aspect].features.map(
            feature =>
                features.push({
                    ...feature,
                    source: aspect
                })
        )
    );
    return uniq ? enforceArrayUniqueness(features) : features;
};

export const enforceArrayUniqueness = array =>
    array.filter((c, i, a) => a.filter(x => x.name === c.name).length === 1);

export const calculateUnitCost = (unit, features) => {
    return Math.round(
        (
            (
                extractStat(unit, 'attack')
                + extractStat(unit, 'power')
                + extractStat(unit, 'defense')
                + extractStat(unit, 'toughness')
                + (extractStat(unit, 'morale') * 2)
            ) * (unit.type.costMod || 1)
        ) * ((unit.size / 6) * 10)
        + features.reduce((acc, cur) => acc + (cur.cost), 0)
    ) + unit.customization.cost + 30
};

export const filterByField = (field, value) =>
    (a) => a[field] === value;

export const sortByField = (field) =>
    (a, b) => {
        var x = a[field].toLowerCase();
        var y = b[field].toLowerCase();
        return (x < y ? -1 : (x > y) ? 1 : 0);
    };

export const extractStat = (unit, stat) =>
    0 + unit['ancestry'][stat] + unit['experience'][stat] + unit['equipment'][stat] + unit['type'][stat] + unit['customization'][stat];

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
        customization: emptyAspect('customization'),
        size: 4,
        cost: 30,
        currency: 'GP'
    }
);

export const emptyAspect = (type) => ({
    name: type,
    features: [],
    cost: 0,
    attack: 0,
    defense: 0,
    toughness: 0,
    power: 0,
    morale: 0,
    author: '',
    authorId: false,
    official: false,
    version: 1
});

export const emptyFeature = (type) => ({
    name: 'new feature',
    type: type,
    effect: '',
    description: '',
    cost: 0,
    author: '',
    authorId: false,
    version: 1
});

export const blurOnKeyDown =
    e => ((e.keyCode === 27) || (e.keyCode === 13)) && e.target.blur();