import React, {Component} from 'react';
import {Form, Grid, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {saveUmField, saveUmNestedField} from "../store/unitmakerActions";
import {UNITMAKER} from "../../../reducer";
import {UNITMAKER_ACTIVE} from "../store/unitmakerReducer";
import {CUSTOMIZATION} from "../../../store/data/dataReducer";
import { blurOnKeyDown } from '../store/unitmakerUtils';

class UnitMakerCore extends Component {
    state = {
        name: this.props.unit.name,
        commander: this.props.unit.commander,
        lore: this.props.unit.lore,
        attack: this.props.unit[CUSTOMIZATION].attack || 0,
        defense: this.props.unit[CUSTOMIZATION].defense || 0,
        power: this.props.unit[CUSTOMIZATION].power || 0,
        toughness: this.props.unit[CUSTOMIZATION].toughness || 0,
        morale: this.props.unit[CUSTOMIZATION].morale || 0,
        cost: this.props.unit[CUSTOMIZATION].cost || 0,
        costMod: this.props.unit[CUSTOMIZATION].costMod || 1
    };

    componentDidUpdate (prevProps, prevSatae) {
        if (prevProps.unit.id !== this.props.unit.id) {
            this.setState({
                name: this.props.unit.name, 
                commander: this.props.unit.commander, 
                lore: this.props.unit.lore
            })
        }
    }

    render() {
        const
            {name, commander, lore} = this.state,
            {unit, saveUmField, saveUmNestedField} = this.props,
            tinkerInputProps = {
                width: 5,
                type: 'number',
                step: 1
            },
            sizes = [
                {key: 4, value: 4, text: 4},
                {key: 6, value: 6, text: 6},
                {key: 8, value: 8, text: 8},
                {key: 10, value: 10, text: 10},
                {key: 12, value: 12, text: 12}
            ];

        const updateField = (field) => ({target: {value}}) => saveUmField(field, value);
        const updateCField = (field) => ({target: {value}}) => saveUmNestedField('customization', field, parseInt(value));
        const updateFloatField = (field) => ({target: {value}}) => saveUmNestedField('customization', field, parseFloat(value));
        const updateSize = (a, {value}) => saveUmField('size', value);

        const updateStateFor = (field) => (e) => this.setState({[field]: e.target.value})

        const propsFor = (stat) => ({
            value: unit[CUSTOMIZATION][stat],
            onChange: updateCField(stat),
            label: stat.charAt(0).toUpperCase() + stat.slice(1),
            ...tinkerInputProps
        });

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
                                        value={name}
                                        onKeyDown={blurOnKeyDown}
                                        onBlur={updateField('name')}
                                        onChange={updateStateFor('name')}
                                    />
                                    <Form.Input
                                        fluid
                                        label={'Commander'}
                                        value={commander}
                                        onKeyDown={blurOnKeyDown}
                                        onBlur={updateField('commander')}
                                        onChange={updateStateFor('commander')}
                                    />
                                </Form.Group>
                                <Form.Field
                                    control={'textarea'}
                                    label={'Lore'}
                                    rows={4}
                                    value={lore}
                                    onKeyDown={blurOnKeyDown}
                                    onBlur={updateField('lore')}
                                    onChange={updateStateFor('lore')}
                                />
                            </Form>
                        </Grid.Column>
                        <Grid.Column>
                            <Form>
                                <Form.Group unstackable>
                                    <Form.Input {...propsFor('attack')}/>
                                    <Form.Input {...propsFor('defense')}/>
                                    <Form.Input {...propsFor('morale')}/>
                                </Form.Group>
                                <Form.Group unstackable>
                                    <Form.Input {...propsFor('power')}/>
                                    <Form.Input {...propsFor('toughness')}/>
                                    <Form.Dropdown
                                        onChange={updateSize}
                                        width={5}
                                        label={'Size'}
                                        value={unit.size}
                                        selection
                                        fluid
                                        options={sizes}/>
                                </Form.Group>
                                <Form.Group unstackable>
                                    <Form.Input {...propsFor('cost')}/>
                                    <Form.Input
                                        {...{
                                            ...propsFor('costMod'),
                                            step: '0.05',
                                            label: 'Cost Mod',
                                            onChange: updateFloatField('costMod')
                                        }}
                                    />
                                    <Form.Input
                                        fluid
                                        label={'Currency'}
                                        value={unit.currency}
                                        width={5}
                                        onChange={updateField('currency')}
                                    />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

const mapStateToProps = (state, props) => ({
    unit: state[UNITMAKER][UNITMAKER_ACTIVE]
});

export default connect(
    mapStateToProps,
    {saveUmField, saveUmNestedField}
)(UnitMakerCore);
