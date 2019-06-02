import React from 'react';
import { connect } from "react-redux";

import './SafUnitCard.css'

import { composeUnitFeatures, calculateUnitCost } from '../../unitmaker/store/unitmakerUtils';
import CornerArrow from './CornerArrow';

import TypeFlag from './TypeFlag'
import RaceFlag from './RaceFlag';

export const SafUnitCard = ({ unit, features, cost, styles, borderColor }) => {
    return (
        <div className={'saf-card'} style={{borderColor: borderColor}}>
            <CornerArrow className={'saf-corner-arrow-tr'} fill={borderColor} />
            <CornerArrow className={'saf-corner-arrow-br'} fill={borderColor} />
            <CornerArrow className={'saf-corner-arrow-bl'} fill={borderColor} />
            <RaceFlag />
            <TypeFlag icon={'aerial'}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    const
        unit = state.unitmaker.active,
        features = composeUnitFeatures(unit),
        cost = calculateUnitCost(unit, features);
    return { unit, features, cost }
};

export default connect(
    mapStateToProps,
    null
)(SafUnitCard);
