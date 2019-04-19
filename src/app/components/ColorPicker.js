import React from 'react';
import {Form} from "semantic-ui-react";
import PropTypes from "prop-types";

const ColorPicker = ({onChange, label}) => {

    const ColorSwatch = ({color}) => (
        <div
            onClick={() => onChange(color)}
            style={{
                borderRadius: '9px',
                height: '38px',
                width: '38px',
                margin: '0 5px',
                background: color,
                display: 'inline-block'
            }}/>
    );

    return (
        <Form>
            <Form.Field>
                <label>{label}</label>
                <input
                    style={{display: 'inline-block', width: '30%'}}
                    placeholder='HTML Color'
                    onChange={({target: {value}}) => onChange(value)}
                />
                <ColorSwatch color={'#000000'}/>
                <ColorSwatch color={'#AA0000'}/>
                <ColorSwatch color={'#0000cd'}/>
                <ColorSwatch color={'#2e8b57'}/>
                <ColorSwatch color={'hotpink'}/>
            </Form.Field>
        </Form>
    );
};

ColorPicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default ColorPicker;
