export const ASPECT_TYPE_ANCESTRY = 'ancestry';
export const ASPECT_TYPE_EXPERIENCE = 'experience';
export const ASPECT_TYPE_EQUIPMENT = 'equipment';
export const ASPECT_TYPE_TYPE = 'type';
export const ASPECT_TYPE_CUSTOMIZATION = 'customization';
export const ASPECT_TYPES = [ASPECT_TYPE_ANCESTRY, ASPECT_TYPE_EXPERIENCE, ASPECT_TYPE_EQUIPMENT, ASPECT_TYPE_TYPE];
export const ASPECT_TYPES_WITH_CUSTOMIZATION = [ASPECT_TYPE_ANCESTRY, ASPECT_TYPE_EXPERIENCE, ASPECT_TYPE_EQUIPMENT, ASPECT_TYPE_TYPE, ASPECT_TYPE_CUSTOMIZATION];

export const FEATURE_TYPE_TRAIT = 'trait';
export const FEATURE_TYPE_ACTION = 'action';
export const FEATURE_TYPE_ATTACHMENT = 'attachment';
export const FEATURE_TYPES = [FEATURE_TYPE_TRAIT, FEATURE_TYPE_ACTION, FEATURE_TYPE_ATTACHMENT];

export const UNIT_STAT_ATTACK = 'attack';
export const UNIT_STAT_DEFENSE = 'defense';
export const UNIT_STAT_POWER = 'power';
export const UNIT_STAT_TOUGHNESS = 'toughness';
export const UNIT_STAT_MORALE = 'morale';
export const UNIT_STAT_TYPES = [
    UNIT_STAT_ATTACK,
    UNIT_STAT_DEFENSE,
    UNIT_STAT_POWER,
    UNIT_STAT_TOUGHNESS,
    UNIT_STAT_MORALE
];

export const UNIT_LABEL = 'label';
export const UNIT_DESCRIPTION = 'description';
export const UNIT_NAME = 'name';
export const UNIT_LORE = 'lore';
export const UNIT_COMMANDER = 'commander';
export const UNIT_SIZE = 'size';
export const UNIT_CURRENCY = 'currency';

export const UNIT_ITEM_ID = 'id';
export const UNIT_ITEM_NAME = 'name';
export const UNIT_ITEM_TYPE = 'type';
export const UNIT_ITEM_SAVED = 'saved';
export const UNIT_ITEM_COST = 'cost';
export const UNIT_ITEM_COST_MOD = 'costMod';
export const UNIT_ITEM_AUTHOR = 'author';
export const UNIT_ITEM_AUTHOR_ID = 'authorId';
export const UNIT_ITEM_OFFICIAL = 'official';
export const UNIT_ITEM_FEATURES = 'features';
export const UNIT_ITEM_EFFECT = 'effect';

const VERSION = 'version';

export const generateDummyId = () => Math.floor(Math.random() * 1e16);

export const emptyUnitObject = () =>
    ({
        [UNIT_LABEL]: '',
        [UNIT_DESCRIPTION]: '',
        [UNIT_NAME]: '',
        [UNIT_LORE]: '',
        [UNIT_COMMANDER]: '',
        [ASPECT_TYPE_ANCESTRY]: emptyAspect(ASPECT_TYPE_ANCESTRY),
        [ASPECT_TYPE_EQUIPMENT]: emptyAspect(ASPECT_TYPE_EQUIPMENT),
        [ASPECT_TYPE_EXPERIENCE]: emptyAspect(ASPECT_TYPE_EXPERIENCE),
        [ASPECT_TYPE_TYPE]: emptyAspect(ASPECT_TYPE_TYPE),
        [ASPECT_TYPE_CUSTOMIZATION]: emptyAspect(ASPECT_TYPE_CUSTOMIZATION),
        [UNIT_SIZE]: 4,
        [UNIT_CURRENCY]: 'GP',
        [VERSION]: 1
    });

export const emptyAspect = (type) => ({
    [UNIT_ITEM_ID]: generateDummyId(),
    [UNIT_ITEM_NAME]: '',
    [UNIT_ITEM_TYPE]: type,
    [UNIT_ITEM_FEATURES]: [],
    [UNIT_ITEM_SAVED]: [],
    [UNIT_ITEM_COST]: 0,
    [UNIT_ITEM_COST_MOD]: 1,
    [UNIT_STAT_ATTACK]: 0,
    [UNIT_STAT_DEFENSE]: 0,
    [UNIT_STAT_TOUGHNESS]: 0,
    [UNIT_STAT_POWER]: 0,
    [UNIT_STAT_MORALE]: 0,
    [UNIT_ITEM_AUTHOR]: '',
    [UNIT_ITEM_AUTHOR_ID]: false,
    [UNIT_ITEM_OFFICIAL]: false,
    [VERSION]: 1,
});

export const emptyFeature = (type) => ({
    [UNIT_ITEM_ID]: generateDummyId(),
    [UNIT_ITEM_NAME]: '',
    [UNIT_ITEM_TYPE]: type,
    [UNIT_ITEM_EFFECT]: '',
    [UNIT_DESCRIPTION]: '',
    [UNIT_ITEM_COST]: 0,
    [UNIT_ITEM_AUTHOR]: '',
    [UNIT_ITEM_AUTHOR_ID]: false,
    [UNIT_ITEM_OFFICIAL]: false,
    [UNIT_ITEM_SAVED]: [],
    [VERSION]: 1,
});

export const composeUnitFeatures = (unit, uniq = false) => {
    let features = [];
    (ASPECT_TYPES_WITH_CUSTOMIZATION).map(
        aspect =>
            unit[aspect][UNIT_ITEM_FEATURES].map(
                feature =>
                    features.push({...feature, source: aspect})
            )
    );
    return uniq ? enforceArrayUniqueness(features) : features;
};

export const enforceArrayUniqueness = arr =>
    // arr.filter((c, i, a) => a.filter(filterByField('id', c.id)).length === 1);
    arr.filter((c, i, a) => a.map(e => e.id).indexOf(c.id) === i);

export const calculateUnitCost = (unit, features) => {
    return Math.round(
        (
            (
                (
                    extractStat(unit, UNIT_STAT_ATTACK)
                    + extractStat(unit, UNIT_STAT_POWER)
                    + extractStat(unit, UNIT_STAT_DEFENSE)
                    + extractStat(unit, UNIT_STAT_POWER)
                    + (extractStat(unit, UNIT_STAT_MORALE) * 2)
                ) * (unit[ASPECT_TYPE_TYPE][UNIT_ITEM_COST_MOD] || 1)
            )
            * ((unit[UNIT_SIZE] / 6) * 10)
            + features.reduce((acc, cur) => acc + (cur.cost), 0)
            + unit[ASPECT_TYPE_CUSTOMIZATION][UNIT_ITEM_COST] + 30
        ) * unit[ASPECT_TYPE_CUSTOMIZATION][UNIT_ITEM_COST_MOD]
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
    (
        0
        + unit[ASPECT_TYPE_ANCESTRY][stat]
        + unit[ASPECT_TYPE_EXPERIENCE][stat]
        + unit[ASPECT_TYPE_EQUIPMENT][stat]
        + unit[ASPECT_TYPE_TYPE][stat]
        + unit[ASPECT_TYPE_CUSTOMIZATION][stat]
    );

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

export const blurOnKeyDown =
    e => ((e.keyCode === 27) || (e.keyCode === 13)) && e.target.blur();