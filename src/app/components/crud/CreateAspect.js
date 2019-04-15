import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Header, Icon, Modal} from "semantic-ui-react";
import {ASPECT_TYPE_ANCESTRY, ASPECT_TYPES} from "../../../store/reducer";
import {emptyAspect} from "../../../utils/unitMakerUtils";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import {createFeatureDropdownOptions} from "../searching/FeatureDropdownResult";

class CreateAspect extends Component {
    constructor(props) {
        super(props);
        this.state = this.reset(true)
    }

    reset = (shouldReturn = false) => {
        const
            {aspect, type} = this.props,
            state = !!aspect
                ? {
                    id: aspect.id,
                    data: aspect.data(),
                    existing: false
                }
                : {
                    id: false,
                    data: emptyAspect(type || ASPECT_TYPE_ANCESTRY),
                    existing: true
                };
        return shouldReturn ? state : this.setState(state);
    };

    add = () => {

    };

    update = () => {
        firebase.firestore().collection()
    };

    handleInputChange = (field, number = false) =>
        ({target: {value}}) =>
            this.setState({data: {...this.state.data, [field]: (number ? parseInt(value) : value)}});

    handleCostMod =
        ({target: {value}}) =>
            this.setState({data: {...this.state.data, costMod: parseFloat(value).toFixed(4)}});

    handleType =
        (e, {value}) => this.setState({data: {...this.state.data, type: value}});

    render() {
        const {trigger, features} = this.props;
        const {data, existing} = this.state;

        const typeOptions = [];
        ASPECT_TYPES.map(type => typeOptions.push({text: type, key: type, value: type}));


        return (
            <Modal
                open={true}
                trigger={trigger || <Button>Create Aspect</Button>}
                size={'mini'}
            >
                <Header icon={existing ? 'edit' : 'plus'} content={existing ? 'Edit Aspect' : 'Create Aspect'}
                        color={'green'}/>
                <Modal.Content>
                    <Form>
                        <Form.Input onChange={this.handleInputChange('name')} label={'Name'}/>
                        <Form.Input onChange={this.handleInputChange('lore')} label={'Lore'}/>
                        <Form.Dropdown
                            fluid
                            label={'Type'}
                            selection
                            options={typeOptions}
                            value={data.type}
                            onChange={this.handleType}
                        />
                        <Form.Group>
                            <Form.Input type={'number'} step={1} onChange={this.handleInputChange('attack', true)} fluid
                                        width={5} label={'Attack'}/>
                            <Form.Input type={'number'} step={1} onChange={this.handleInputChange('defense', true)}
                                        fluid
                                        width={5} label={'Defense'}/>
                            <Form.Input type={'number'} step={1} onChange={this.handleInputChange('morale', true)} fluid
                                        width={6} label={'Morale'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input type={'number'} step={1} onChange={this.handleInputChange('power', true)} fluid
                                        width={5} label={'Power'}/>
                            <Form.Input type={'number'} step={1} onChange={this.handleInputChange('toughness', true)}
                                        fluid
                                        width={5}
                                        label={'Toughness'}/>
                            <Form.Input type={'number'} step={0.1} onChange={this.handleCostMod} fluid
                                        width={6}
                                        label={'Cost Mod'}/>
                        </Form.Group>
                        <Form.Dropdown
                            label={'Features'}
                            fluid
                            multiple
                            search
                            selection
                            options={createFeatureDropdownOptions(features)}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='grey' basic>
                        <Icon name='remove'/> Cancel
                    </Button>
                    <Button color='green' onClick={existing ? this.update : this.add}>
                        <Icon name='checkmark'/> Add
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    features: state.features.all
});

export default connect(
    mapStateToProps,
)(CreateAspect);
