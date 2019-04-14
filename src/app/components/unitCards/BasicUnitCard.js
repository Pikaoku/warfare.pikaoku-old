import React from 'react';
import './BasicUnitCard.css';
import {connect} from "react-redux";
import {composeUnit} from "../../../utils/unitMakerUtils";
import {pure} from "recompose";

const BucUnitDefinition = pure(({ancestry, experience, equipment, type}) => {
    const divider =
        ([ancestry, experience, equipment, type].join(' ').length) > 30 ? <br/> : ' ';
    return (
        <div className={'buc-subtitle'}>
            <span>{ancestry + ' ' + experience}</span>{divider}<span>{equipment + ' ' + type}</span>
        </div>
    );
});

// Left/Right Label/Data
const StatLine = pure(({ll, ld, rl, rd}) =>
    <div className={'buc-stat-line'}>
        <div className={'buc-stat-line-label'}>{ll}</div>
        <div className={'buc-stat-line-data'}>{ld}</div>
        <div/>
        <div className={'buc-stat-line-label'}>{rl}</div>
        <div className={'buc-stat-line-data'}>{rd}</div>
    </div>
);

const BasicUnitCard = ({unit, styles, color}) => {
    return (
        <div className={'basic-unit-card ' + styles} style={{borderColor: color}}>
            <div className={'buc-title'}>{unit.name}</div>
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
                <StatLine ll={'Attack'} ld={unit.attack} rl={'Defense'} rd={unit.defense}/>
                <StatLine ll={'Power'} ld={unit.power} rl={'Toughness'} rd={unit.toughness}/>
                <StatLine ll={'Morale'} ld={unit.morale} rl={'Size'} rd={unit.size}/>
            </div>
            <div className={'centered buc-cost'}>Cost: <b>{unit.cost || 0}</b> {unit.currency}</div>

            <div className={'buc-extras'}>
                {
                    ['traits', 'actions', 'attachments'].map(
                        type =>
                            unit.traits.length > 0 &&
                            <div key={type}>
                                <div className={'buc-subheader capitalize'}>{type}</div>
                                {
                                    unit.traits.map(({name, description, id}) => (
                                        <div key={id} className={'buc-extras-item'}>
                                            <span>{name}</span>
                                            <span>{description}</span>
                                        </div>
                                    ))
                                }
                            </div>
                    )
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    unit: composeUnit(state.unitmaker.active)
});

export default connect(
    mapStateToProps, null
)(BasicUnitCard);
