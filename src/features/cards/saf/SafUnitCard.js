import React from 'react';
import { connect } from "react-redux";

import './SafUnitCard.css'

import {
    composeUnitFeatures,
    calculateUnitCost,
    extractStat
} from '../../unitmaker/store/unitmakerUtils';
import CornerArrow from './CornerArrow';

import TypeFlag from './TypeFlag'
import RaceFlag from './RaceFlag';
import { UNITMAKER } from '../../../reducer';
import { UNITMAKER_ACTIVE } from '../../unitmaker/store/unitmakerReducer';
import { pure } from 'recompose';
import { filterByField } from '../../common/utils/array/filterByField';

const DEFAULT_RACE_SRC = 'https://firebasestorage.googleapis.com/v0/b/pikaoku-tools.appspot.com/o/warfare%2Fcards%2Fsaf%2Fancestry%2Fgeneric.png?alt=media&token=f45643ef-0cab-4dd1-8c49-dfe4b1fa7d23'
const DEAFULT_TYPE_SRC = 'https://firebasestorage.googleapis.com/v0/b/pikaoku-tools.appspot.com/o/warfare%2Fcards%2Fsaf%2Ftype%2Fgeneric%20type.png?alt=media&token=db4561f8-6767-43b8-9d82-fe069991ec70'

const StatLine = pure(({ ll, ld, rl, rd }) =>
    <div className={'saf-stat-line'}>
        <div className={'saf-stat-line-label'}>{ll}</div>
        <div className={'saf-stat-line-data'}>{(ld >= 0 ? '+' : '') + ld.toString()}</div>
        <div />
        <div className={'saf-stat-line-label'}>{rl}</div>
        <div className={'saf-stat-line-data'}>{(rd >= 0 ? '+' : '') + rd.toString()}</div>
    </div>
);

const SafUnitCard = ({ unit, features, cost, styles, borderColor, baseToughness, baseDefense, labelFeatureGroups }) => {
    return (
        <>
            <div id={'UnitCard'} className={'saf-card'} style={{ borderColor: borderColor }}>
                <div className={'saf-upper'}>
                    <CornerArrow className={'saf-corner-arrow-tr'} fill={borderColor} />
                    <CornerArrow className={'saf-corner-arrow-br'} fill={borderColor} />
                    <CornerArrow className={'saf-corner-arrow-bl'} fill={borderColor} />
                    <RaceFlag expSrc={unit.experience.media ? unit.experience.media.saf : ''} raceSrc={unit.ancestry.media ? unit.ancestry.media.saf || DEFAULT_RACE_SRC : DEFAULT_RACE_SRC} />
                    <TypeFlag icon={'aerial'} typeSrc={unit.type.media ? unit.type.media.saf || DEAFULT_TYPE_SRC : DEAFULT_TYPE_SRC} />
                    <div className={'saf-unit-name'}>
                        {unit.name || 'unit name'}
                    </div>
                    <div className={'saf-unit-aspects-wrapper'}>
                        <div className={'saf-unit-aspects'}><span>{unit.ancestry.name}</span><span> </span><span>{unit.experience.name}</span></div>
                        <div className={'saf-unit-aspects'}><span>{unit.equipment.name}</span><span> </span><span>{unit.type.name}</span></div>
                    </div>
                </div>
                <div className={'saf-cost'}>
                    <span>COST: </span><span>{cost}</span><span>{unit.currency}</span>
                </div>
                <div className={'saf-stats'}>
                    <StatLine
                        ll={'Attack'} ld={extractStat(unit, 'attack')}
                        rl={'Defense'} rd={parseInt(baseDefense) + extractStat(unit, 'defense')} />
                    <StatLine
                        ll={'Power'} ld={extractStat(unit, 'power')}
                        rl={'Toughness'} rd={parseInt(baseToughness) + extractStat(unit, 'toughness')} />
                    <StatLine
                        ll={'Morale'} ld={extractStat(unit, 'morale')}
                        rl={'Size'} rd={'d' + unit.size.toString()} />
                </div>
                <div className={'saf-extras'}>
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
                                            className={'saf-subheader' + (index === 0 ? ' saf-subheader-first' : '')}>
                                            {type.toUpperCase() + 'S'}
                                        </div>
                                    }
                                    {
                                        featuresOfType.map(
                                            ({ name, effect, id }) => (
                                                <div key={name} className={'saf-extras-item'}>
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
                    <div className={'buc-commander'}>Commanded by {unit.commander}</div>
                }
            </div>

            <div style={{marginTop: '40px'}}>S&F Unit Card by <a href="https://github.com/freddybushboy/">FreddyBushBoy</a></div>
            <div>Iconography by Dan Connolly.</div>
        </>
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
    return { unit, features, cost, labelFeatureGroups, baseDefense, baseToughness }
};

export default connect(
    mapStateToProps,
    null
)(SafUnitCard);
