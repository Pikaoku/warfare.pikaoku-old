import {ASPECT_TYPES, CUSTOMIZATION} from "../store/reducer";

export const UNIT_STAT_TYPES = ['attack', 'defense', 'power', 'toughness', 'morale'];

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
                (
                    extractStat(unit, 'attack')
                    + extractStat(unit, 'power')
                    + extractStat(unit, 'defense')
                    + extractStat(unit, 'toughness')
                    + (extractStat(unit, 'morale') * 2)
                ) * (unit.type.costMod || 1)
            )
            * ((unit.size / 6) * 10)
            + features.reduce((acc, cur) => acc + (cur.cost), 0)
            + unit.customization.cost + 30
        ) * unit[CUSTOMIZATION].costMod
    )
};

export const filterByField = (field, value) =>
    (a) => a[field] === value;

export const sortByField = (field) =>
    (a, b) => {
        var x = a.data()[field].toLowerCase();
        var y = b.data()[field].toLowerCase();
        return (x < y ? -1 : (x > y) ? 1 : 0);
    };

export const withSign = (value) => (value >= 0 ? '+' : '') + value.toString();

export const extractStat = (unit, stat) =>
    0 + unit['ancestry'][stat] + unit['experience'][stat] + unit['equipment'][stat] + unit['type'][stat] + unit['customization'][stat];

export const stringifyObjectStats = (object) => {
    let stats = [];
    UNIT_STAT_TYPES.map(stat => stats.push(withSign(object[stat])));
    return (stats.join('/'));
};

export const stringifyUnitObjectStats = unit => {
    let stats = [0, 0, 0, 0, 0];
    ASPECT_TYPES.map(
        aspect =>
            UNIT_STAT_TYPES.map((stat, index) =>
                stats[index] += unit[aspect][stat]
            )
    );
    return (stats.map(x => withSign(x))).join('/')
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
    name: '',
    type: type,
    features: [],
    saved: [],
    cost: 0,
    costMod: 1,
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
    version: 1,
    saved: []
});

export const blurOnKeyDown =
    e => ((e.keyCode === 27) || (e.keyCode === 13)) && e.target.blur();