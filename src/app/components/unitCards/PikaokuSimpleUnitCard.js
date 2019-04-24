import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SETTINGS, UNITMAKER} from "../../../store/reducer";
import {UNITMAKER_ACTIVE} from "../../../store/unitmaker/unitmakerReducer";
import {calculateUnitCost, composeUnitFeatures} from "../../../store/unitmaker/unitmakerUtils";
import {
    SETTINGS_BASE_DEFENSE,
    SETTINGS_BASE_TOUGHNESS,
    SETTINGS_LABEL_FEATURE_GROUPS
} from "../../../store/settings/settingsReducer";

class PikaokuSimpleUnitCard extends Component {
    render() {
        const {
            unit,
            features,
            cost,
            styles,
            borderColor,
            baseDefense,
            baseToughness,
            labelFeatureGroups
        } = this.props;

        return (
            <div style={{
                minWidth: '400px',
                minHeight: '600px',
                backgroundColor: borderColor,
                borderRadius: '20px',
                padding: '20px'
            }}
            >
                <div style={{
                    background: 'white',
                    color: borderColor,
                    width: '100%',
                    borderRadius: '10px 10px 0 0',
                    lineHeight: '56px',
                    fontSize: '56px',
                    padding: '15px'
                }}>
                    {unit.name || 'Unit Name'}
                </div>
                <div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const
        unit = state[UNITMAKER][UNITMAKER_ACTIVE],
        features = composeUnitFeatures(unit),
        cost = calculateUnitCost(unit, features),
        baseDefense = state[SETTINGS][SETTINGS_BASE_DEFENSE],
        baseToughness = state[SETTINGS][SETTINGS_BASE_TOUGHNESS],
        labelFeatureGroups = state[SETTINGS][SETTINGS_LABEL_FEATURE_GROUPS];
    return {unit, features, cost, labelFeatureGroups, baseDefense, baseToughness}
};

export default connect(
    mapStateToProps,
    null
)(PikaokuSimpleUnitCard);
