import React from 'react';
import {Button, Form, Grid, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {updateUnitmakerField} from "../../../../store/actions/unitmaker";

const UnitMakerCore = ({updateUnitmakerField, unit}) => {
    const
        tinkerInputProps = {width: 5, type: 'number', step: 1, defaultValue: 0},
        sizes = [
            {key: 4, value: 4, text: 4},
            {key: 6, value: 6, text: 6},
            {key: 8, value: 8, text: 8},
            {key: 10, value: 10, text: 10},
            {key: 12, value: 12, text: 12}
        ];

    return (
        <Segment>
            <Grid columns={2} divided doubling>
                <Grid.Row>
                    <Grid.Column>
                        <Form>
                            <Form.Group widths={'equal'}>
                                <Form.Input
                                    fluid label={'Unit Name'} value={unit.name}
                                    onChange={({target}) => updateUnitmakerField('name', target.value)}/>
                                <Form.Input fluid label={'Commander'}/>
                            </Form.Group>
                            <Form.Field control={'textarea'} label={'Description'} rows={3}/>
                        </Form>
                    </Grid.Column>
                    <Grid.Column>
                        <Form>
                            <Form.Group unstackable>
                                <Form.Input label={'Attack'} {...tinkerInputProps}/>
                                <Form.Input label={'Defense'} {...tinkerInputProps}/>
                                <Form.Input label={'Morale'} {...tinkerInputProps}/>
                            </Form.Group>
                            <Form.Group unstackable>
                                <Form.Input label={'Power'} {...tinkerInputProps}/>
                                <Form.Input label={'Toughness'} {...tinkerInputProps}/>
                                <Form.Dropdown width={5} label={'Size'} defaultValue={4} selection fluid
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
    {updateUnitmakerField}
)(UnitMakerCore);
