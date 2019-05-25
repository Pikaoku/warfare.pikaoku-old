import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Header} from "semantic-ui-react";
import {SWCirumstance} from "../data/SWCirumstance";

class SWStrategicAdvantages extends Component {
    state = {
        circumstances: [
            new SWCirumstance('Well Rested', 10),
            new SWCirumstance('Well Supplied', 10),
            new SWCirumstance('Defending Homeland', 20),
            new SWCirumstance('Has beaten this enemy in the last season', 20),
            new SWCirumstance('Has beaten this enemy in years past', 10),
            new SWCirumstance('Enemy is Hereditary', 20),
            new SWCirumstance('Sunlight Sensitivity while fighting in daylight', -20),
            new SWCirumstance('Ambushed', -30),
            new SWCirumstance('Forced March', -10),
            new SWCirumstance('Lost Last Battle', -20),
            new SWCirumstance('Poorly Supplied', -10),
            new SWCirumstance('In enemy territory', -20),
        ],
        fortificationLevel: 0
    };

    reduceCircumstances = () => {
        const {circumstances, fortificationLevel} = this.state;
        let bonus = 0;
        circumstances.filter(c => c.active).forEach(c => bonus += c.modifier)
        bonus += 10 * fortificationLevel;
        return bonus;
    };

    onCircumstanceChange = () => {
        const {set} = this.props;

    };

    render() {

        const {circumstances, fortificationLevel} = this.state;

        return (
            <>
                <Header content={'Strategtic Advantages'}/>

            </>
        );
    }
}

export default SWStrategicAdvantages;
