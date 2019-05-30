import React from 'react';
import {Header, Input, Label} from "semantic-ui-react";
import PropTypes from "prop-types";

const SWStrengthInput = ({str, setStr, adv}) => (
    <>
        <Header>Army Strength</Header>
        <Input
            labelPosition={'right'}
            fluid
            type={'number'}
            step={1}
            min={0}
            onChange={(e, d) => setStr(parseInt(d.value || 0))}
            value={str}
        >
            <Label color={'teal'} basic>Strength</Label>
            <input/>
            <Label
                color={adv > 0 ? 'green' : 'grey'}><span>+</span><span>{adv}</span><span>%</span></Label>
        </Input>
    </>
);

SWStrengthInput.propTypes = {
    str: PropTypes.number.isRequired,
    setStr: PropTypes.func.isRequired,
    adv: PropTypes.number.isRequired
};

export default SWStrengthInput;
