import React from 'react';
import './BasicUnitCard.css';
import {connect} from "react-redux";
import {calculateUnitCost, composeUnitFeatures, extractStat, filterByField} from "../../../utils/unitMakerUtils";
import {pure} from "recompose";

const BucUnitDefinition = pure(({ancestry, experience, equipment, type}) => {
    const divider =
        ([ancestry, experience, equipment, type].join(' ').length) > 30 ? <br/> : ' ';
    return (
        <div className={'buc-subtitle'}>
            <span>{(ancestry || 'ancestry') + ' ' + (experience || 'experience')}</span>{divider}<span>{(equipment || 'equipment') + ' ' + (type || 'type')}</span>
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

const BasicUnitCard = ({unit, features, cost, styles, color}) => {
    return (
        <div className={'basic-unit-card ' + styles} style={{borderColor: color, color: color}}>
            <div className={'buc-title'}>{unit.name || 'Unit Name'}</div>
            <BucUnitDefinition
                ancestry={unit.ancestry.name}
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
                    rl={'Defense'} rd={extractStat(unit, 'defense')}/>
                <StatLine
                    ll={'power'} ld={extractStat(unit, 'power')}
                    rl={'power'} rd={extractStat(unit, 'toughness')}/>
                <StatLine
                    ll={'Morale'} ld={extractStat(unit, 'morale')}
                    rl={'Size'} rd={'d' + unit.size.toString()}/>
            </div>
            <div className={'centered buc-cost'}>Cost: <b>{cost || 0}</b> {unit.currency}</div>

            <div className={'buc-extras'}>
                {
                    ['trait', 'action', 'attachment'].map((type, index) => {
                            let featuresOfType = features.filter(filterByField('type', type))
                            if (featuresOfType.length === 0) {
                                return null;
                            }
                            return (
                                <div key={type}>
                                    <div
                                        className={'buc-subheader' + (index === 0 ? ' buc-subheader-first' : '')}>
                                        {type.toUpperCase() + 'S'}
                                    </div>
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
        </div>
    );
};

const mapStateToProps = (state) => {
    const
        unit = state.unitmaker.active,
        features = composeUnitFeatures(unit),
        cost = calculateUnitCost(unit, features);
    return {unit, features, cost}
};

export default connect(
    mapStateToProps, null
)(BasicUnitCard);
