import React from 'react';
import './SafUnitCard.css'
import {connect} from "react-redux";
import {calculateUnitCost, composeUnitFeatures} from "../../../store/unitmaker/unitmakerUtils";
import {pure} from "recompose";

const Cost = pure(
    ({cost, currency}) => (
        <>
        </>
    )
);

const SafUnitCard = ({unit, features, cost, styles, borderColor}) => {
    return (
        <div
            style={
                {
                    background: 'white',
                    width: '450px',
                    minHeight: '300px',
                    borderWidth: '10px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    textAlign: 'left',
                    display: 'grid',
                    gridTemplateColumns: '75px 75px 75px 75px 75px 75px',
                    gridTemplateRows: '75px',
                    gridTemplateAreas:
                        'size title title title title title'
                }}>
            <div
                style={
                    {
                        border: 'solid black',
                        borderRadius: '0 0 25px 0',
                        borderWidth: '0 6px 6px 0 ',
                        width: '75px',
                        height: '75px',
                        display: 'inline-block',
                    gridArea: 'size'

                }}
            >
                <div
                    className={'grid-middle grid-center'}
                    style={{
                        height: '100%',
                        fontSize: '36px',
                        color: 'darkgrey',
                    }}>d4
                </div>
            </div>
            <div
                style={
                    {
                        display: 'inline-block',
                        fontSize: '42px',
                        gridArea: 'title'
                    }
                }>
                Ironheart Defenders
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
    mapStateToProps,
    null
)(SafUnitCard);
