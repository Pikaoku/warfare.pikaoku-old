import React from 'react';
import {Button, Form, Grid, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {updateUnitmakerCustomizationField, updateUnitmakerField} from "../../../../store/actions/unitmaker";

const UnitMakerCore = ({unit, updateUnitmakerField, updateUnitmakerCustomizationField}) => {
    const
        tinkerInputProps = {width: 5, type: 'number', step: 1, defaultValue: 0},
        sizes = [
            {key: 4, value: 4, text: 4},
            {key: 6, value: 6, text: 6},
            {key: 8, value: 8, text: 8},
            {key: 10, value: 10, text: 10},
            {key: 12, value: 12, text: 12}
        ];

    const updateField = (field) => ({target: {value}}) => updateUnitmakerField(field, value);
    const updateCField = (field) => ({target: {value}}) => updateUnitmakerCustomizationField(field, value);
    const updateSize = (a, b) => updateUnitmakerField(b.value);

    return (
        <Segment>
            <Grid columns={2} divided doubling>
                <Grid.Row>
                    <Grid.Column>
                        <Form>
                            <Form.Group widths={'equal'}>
                                <Form.Input
                                    fluid label={'Unit Name'} value={unit.name} onChange={updateField('name')}/>
                                <Form.Input
                                    fluid label={'Commander'} onChange={updateField('commander')}/>
                            </Form.Group>
                            <Form.Field control={'textarea'} label={'Description'} rows={3}
                                        onChange={updateField('lore')}/>
                        </Form>
                    </Grid.Column>
                    <Grid.Column>
                        <Form>
                            <Form.Group unstackable>
                                <Form.Input onChange={updateCField('attack')} label={'Attack'} {...tinkerInputProps}/>
                                <Form.Input onChange={updateCField('defense')} label={'Defense'} {...tinkerInputProps}/>
                                <Form.Input onChange={updateCField('morale')} label={'Morale'} {...tinkerInputProps}/>
                            </Form.Group>
                            <Form.Group unstackable>
                                <Form.Input onChange={updateCField('power')} label={'Power'} {...tinkerInputProps}/>
                                <Form.Input onChange={updateCField('toughness')}
                                            label={'Toughness'} {...tinkerInputProps}/>
                                <Form.Dropdown onChange={updateSize} width={5} label={'Size'} defaultValue={4}
                                               selection fluid
                                               options={sizes}/>
                            </Form.Group>
                            <Button fluid content={'Reset'} basic negative size={'tiny'}/>
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
    {updateUnitmakerField, updateUnitmakerCustomizationField}
)(UnitMakerCore);
