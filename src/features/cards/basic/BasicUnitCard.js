import React from 'react';
import './BasicUnitCard.css';
import {connect} from "react-redux";
import {
    calculateUnitCost,
    composeUnitFeatures,
    extractStat
} from "../../../features/unitmaker/store/unitmakerUtils";
import {pure} from "recompose";
import {UNITMAKER} from "../../../reducer";
import {UNITMAKER_ACTIVE} from "../../../features/unitmaker/store/unitmakerReducer";
import { filterByField } from '../../common/utils/array/filterByField';

const BucUnitDefinition = pure(({ancestry, experience, equipment, type}) => {
    const divider =
        ([ancestry, experience, equipment, type].join(' ').length) > 30 ? <br/> : ' ';
    return (
        <div className={'buc-subtitle'}>
            <span>{(ancestry || '') + ' ' + (experience || '')}</span>{divider}<span>{(equipment || '') + ' ' + (type || '')}</span>
        </div>
    );
});

// Left/Right Label/Data
const StatLine = pure(({ll, ld, rl, rd}) =>
    <div className={'buc-stat-line'}>
        <div className={'buc-stat-line-label'}>{ll}</div>
        <div className={'buc-stat-line-data'}>{(ld >= 0 ? '+' : '') + ld.toString()}</div>
        <div/>
        <div className={'buc-stat-line-label'}>{rl}</div>
        <div className={'buc-stat-line-data'}>{(rd >= 0 ? '+' : '') + rd.toString()}</div>
    </div>
);

const Cost = pure(({cost, currency}) =>
    <div className={'centered buc-cost'}>Cost: <b>{cost}</b> <span>{currency}</span></div>
);

const BasicUnitCard = (
    {
        unit,
        features,
        cost,
        styles,
        borderColor,
        backgroundColor,
        baseDefense,
        baseToughness,
        labelFeatureGroups
    }) => {
    const name = unit.ancestry.name === 'None' ? '' : unit.ancestry.name;
    return (
        <div id={'UnitCard'} className={'basic-unit-card ' + (styles || '')}
             style={{borderColor: borderColor, color: borderColor, background: backgroundColor}}
        >
            <div className={'buc-title'}>{unit.name || 'Unit Name'}</div>
            <BucUnitDefinition
                ancestry={name}
                experience={unit.experience.name}
                equipment={unit.equipment.name}
                type={unit.type.name}/>
            {
                unit.lore !== '' &&
                <p className={'buc-lore'}>{unit.lore}</p>
            }
            <div className={'buc-stats'}>
                <StatLine
                    ll={'Attack'} ld={extractStat(unit, 'attack')}
                    rl={'Defense'} rd={parseInt(baseDefense) + extractStat(unit, 'defense')}/>
                <StatLine
                    ll={'Power'} ld={extractStat(unit, 'power')}
                    rl={'Toughness'} rd={parseInt(baseToughness) + extractStat(unit, 'toughness')}/>
                <StatLine
                    ll={'Morale'} ld={extractStat(unit, 'morale')}
                    rl={'Size'} rd={'d' + unit.size.toString()}/>
            </div>
            <Cost cost={cost} currency={unit.currency}/>

            <div className={'buc-extras'}>
                {
                    ['trait', 'action', 'attachment'].map((type, index) => {
                            let featuresOfType = features.filter(filterByField('type', type))
                            if (featuresOfType.length === 0) {
                                return null;
                            }
                            return (
                                <div key={type}>
                                    {
                                        labelFeatureGroups &&
                                        <div
                                            className={'buc-subheader' + (index === 0 ? ' buc-subheader-first' : '')}>
                                            {type.toUpperCase() + 'S'}
                                        </div>
                                    }
                                    {
                                        featuresOfType.map(
                                            ({name, effect, id}) => (
                                                <div key={name} className={'buc-extras-item'}>
                                                    <span>{name}</span>
                                                    <span>{effect}</span>
                                                </div>
                                            ))
                                    }
                                </div>
                            )
                        }
                    )
                }
            </div>
            {
                !!unit.commander &&
                <div className={'grid-center buc-commander'}>Commanded by {unit.commander}</div>
            }

        </div>
    );
};

const mapStateToProps = (state) => {
    const
        unit = state[UNITMAKER][UNITMAKER_ACTIVE],
        features = composeUnitFeatures(unit),
        cost = calculateUnitCost(unit, features),
        baseDefense = state.auth.settings.baseDefense,
        baseToughness = state.auth.settings.baseToughness,
        labelFeatureGroups = state.auth.settings.labelFeatureGroups;
    return {unit, features, cost, labelFeatureGroups, baseDefense, baseToughness}
};

export default connect(
    mapStateToProps,
    null
)(BasicUnitCard);
