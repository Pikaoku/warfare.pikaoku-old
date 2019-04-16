import React from 'react';
import {Form, Grid, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {saveUmField, saveUmNestedField} from "../../../../store/actions/unitmaker";
import {blurOnKeyDown} from "../../../../utils/unitMakerUtils";

const UnitMakerCore = ({unit, saveUmField, saveUmNestedField}) => {
    const
        tinkerInputProps = {width: 5, type: 'number', step: 1, defaultValue: 0},
        sizes = [
            {key: 4, value: 4, text: 4},
            {key: 6, value: 6, text: 6},
            {key: 8, value: 8, text: 8},
            {key: 10, value: 10, text: 10},
            {key: 12, value: 12, text: 12}
        ];

    const updateField = (field) => ({target: {value}}) => saveUmField(field, value);
    const updateCField = (field) => ({target: {value}}) => saveUmNestedField('customization', field, parseInt(value));
    const updateSize = (a, {value}) => saveUmField('size', value);

    return (
        <Segment>
            <Grid columns={2} divided doubling>
                <Grid.Row>
                    <Grid.Column>
                        <Form>
                            <Form.Group widths={'equal'}>
                                <Form.Input
                                    fluid
                                    label={'Unit Name'}
                                    defaultValue={unit.name}
                                    onBlur={updateField('name')}
                                    onKeyDown={blurOnKeyDown}
                                />
                                <Form.Input
                                    fluid
                                    label={'Commander'}
                                    onBlur={updateField('commander')}
                                    onKeyDown={blurOnKeyDown}
                                />
                            </Form.Group>
                            <Form.Field
                                control={'textarea'}
                                label={'Lore'}
                                rows={1}
                                defaultValue={unit.lore}
                                onKeyDown={blurOnKeyDown}
                                onBlur={updateField('lore')}
                            />
                        </Form>
                    </Grid.Column>
                    <Grid.Column>
                        <Form>
                            <Form.Group unstackable>
                                <Form.Input onKeyDown={blurOnKeyDown} onBlur={updateCField('attack')}
                                            label={'Attack'} {...tinkerInputProps}/>
                                <Form.Input onKeyDown={blurOnKeyDown} onBlur={updateCField('defense')}
                                            label={'Defense'} {...tinkerInputProps}/>
                                <Form.Input onKeyDown={blurOnKeyDown} onBlur={updateCField('morale')}
                                            label={'Morale'} {...tinkerInputProps}/>
                            </Form.Group>
                            <Form.Group unstackable>
                                <Form.Input onKeyDown={blurOnKeyDown} onBlur={updateCField('power')}
                                            onChange={updateCField('power')} label={'Power'} {...tinkerInputProps}/>
                                <Form.Input onKeyDown={blurOnKeyDown} onBlur={updateCField('toughness')}
                                            onChange={updateCField('toughness')}
                                            label={'Toughness'} {...tinkerInputProps}/>
                                <Form.Dropdown onChange={updateSize} width={5} label={'Size'} defaultValue={4}
                                               selection fluid
                                               options={sizes}/>
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
};

const mapStateToProps = (state, props) => ({
    unit: state.unitmaker.active
});

export default connect(
    mapStateToProps,
    {saveUmField, saveUmNestedField}
)(UnitMakerCore);
