import React from 'react';
import { connect } from "react-redux";
import {
    calculateUnitCost,
    composeUnitFeatures,
    extractStat
} from "../../unitmaker/store/unitmakerUtils";
import { UNITMAKER } from "../../../reducer";
import { UNITMAKER_ACTIVE } from "../../unitmaker/store/unitmakerReducer";
import './PikaokuUnitCard.css'

const PikaokuUnitCard = (
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
        <div id={'UnitCard'} className={'card ' + (styles || '')}
            style={{ borderColor: borderColor, color: borderColor, background: backgroundColor }}
        >

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
    return { unit, features, cost, labelFeatureGroups, baseDefense, baseToughness }
};

export default connect(
    mapStateToProps,
    null
)(PikaokuUnitCard);
