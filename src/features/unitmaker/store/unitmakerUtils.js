import { enforceArrayUniqueness } from "../../common/utils/array/enforceArrayUniqueness";

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

const generateDummyId = () => Math.floor(Math.random() * 1e16);

const emptyUnitObject = () =>
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

const emptyAspect = (type) => ({
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

const emptyFeature = (type) => ({
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

const composeUnitFeatures = (unit, uniq = false) => {
    let features = [];
    (ASPECT_TYPES_WITH_CUSTOMIZATION).map(
        aspect =>
            unit[aspect][UNIT_ITEM_FEATURES].map(
                feature =>
                    features.push({ ...feature, source: aspect })
            )
    );
    return uniq ? enforceArrayUniqueness(features) : features;
};

const calculateUnitCost = (unit, features) => {
    return Math.round(
        (
            (
                (
                    (
                        (
                            extractStat(unit, UNIT_STAT_ATTACK)
                            + extractStat(unit, UNIT_STAT_POWER)
                            + extractStat(unit, UNIT_STAT_DEFENSE)
                            + extractStat(unit, UNIT_STAT_TOUGHNESS)
                            + (extractStat(unit, UNIT_STAT_MORALE) * 2)
                        ) * (unit[ASPECT_TYPE_TYPE][UNIT_ITEM_COST_MOD] || 1)
                    )
                    * (Math.floor((unit[UNIT_SIZE] / 6) * 100) / 100)
                ) * 10
            )
            + features.reduce((acc, cur) => acc + (cur.cost), 0)
            + unit[ASPECT_TYPE_CUSTOMIZATION][UNIT_ITEM_COST]
            + 30
        ) * unit[ASPECT_TYPE_CUSTOMIZATION][UNIT_ITEM_COST_MOD]
    )
};

const withSign = (value) => (value >= 0 ? '+' : '') + value.toString();

const extractStat = (unit, stat) =>
    (
        0
        + unit[ASPECT_TYPE_ANCESTRY][stat]
        + unit[ASPECT_TYPE_EXPERIENCE][stat]
        + unit[ASPECT_TYPE_EQUIPMENT][stat]
        + unit[ASPECT_TYPE_TYPE][stat]
        + unit[ASPECT_TYPE_CUSTOMIZATION][stat]
    );

const stringifyObjectStats = (object) =>
    UNIT_STAT_TYPES.map(stat => withSign(object[stat])).join('/')

const stringifyUnitObjectStats = unit => {
    let stats = [0, 0, 0, 0, 0];
    ASPECT_TYPES_WITH_CUSTOMIZATION.map(
        aspect =>
            UNIT_STAT_TYPES.map((stat, index) =>
                stats[index] += unit[aspect][stat]
            )
    );
    return (stats.map(x => withSign(x))).join('/')
};

const blurOnKeyDown =
    e => ((e.keyCode === 27) || (e.keyCode === 13)) && e.target.blur();

export {
    blurOnKeyDown, 
    stringifyObjectStats, 
    stringifyUnitObjectStats, 
    extractStat, 
    withSign, 
    calculateUnitCost, 
    composeUnitFeatures, 
    enforceArrayUniqueness, 
    emptyAspect, 
    emptyFeature, 
    emptyUnitObject
}