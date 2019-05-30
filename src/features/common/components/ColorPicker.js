import React from 'react';
import {Form, Popup} from "semantic-ui-react";
import PropTypes from "prop-types";

const defaultColors = [
    '#000000',
    '#AA0000',
    '#0000cd',
    '#2e8b57',
    'hotpink'
];

const ColorPicker = ({onChange, label, color, colors = defaultColors}) => {

    const ColorSwatch = ({color}) => (
        <div
            onClick={() => onChange(color)}
            style={{
                borderRadius: '9px',
                height: '38px',
                width: '38px',
                margin: '0 5px',
                background: color,
                display: 'inline-block',
                border: color.includes('white') ? '2px solid black' : 0
            }}/>
    );

    return (
        <Form>
            <Form.Field>
                <label>{label}</label>
                <Popup
                    trigger={
                        <input
                            style={{display: 'inline-block', width: '30%'}}
                            value={color}
                            onChange={({target: {value}}) => onChange(value)}
                        />
                    }
                    content={'You can use hex values such as #AA0000, or html-standard colour names such as "red" or "darkblue".'}
                    on={'hover'}
                />
                {
                    colors.map(color => <ColorSwatch key={color} color={color}/>)
                }
            </Form.Field>
        </Form>
    );
};

ColorPicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default ColorPicker;
