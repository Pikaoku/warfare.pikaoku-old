import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Header, Modal } from "semantic-ui-react";
import {
    ASPECT_TYPE_ANCESTRY,
    ASPECT_TYPE_TYPE,
    ASPECT_TYPES,
    emptyAspect
} from "../../unitmaker/store/unitmakerUtils";
import PropTypes from "prop-types";
import { createAspect } from "../store/aspectsActions";
import { updateAspect } from "../store/aspectsActions";
import createFeatureDropdownOptions from '../../features/utils/createFeatureDropdownOptions'

class EditAspect extends Component {
    constructor(props) {
        super(props);

        this.reset = this.reset.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.handleCostMod = this.handleCostMod.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleFeatures = this.handleFeatures.bind(this);

        this.state = this.reset(true);
    }

    reset = (shouldReturn = false) => {
        const
            { aspect, type } = this.props,
            state = !!aspect
                ? {
                    id: aspect.id,
                    data: aspect,
                    existing: !!aspect,
                    featureIds: aspect.features.map(f => f.id)
                }
                : {
                    id: false,
                    data: emptyAspect(type || ASPECT_TYPE_ANCESTRY),
                    existing: !!aspect,
                    featureIds: []
                };
        return shouldReturn ? state : this.setState(state);
    };

    add = () => this.props.createAspect(this.state.data)


    update = () => this.props.updateAspect(this.state.id, this.state.data);

    handleInputChange = (field, number = false) =>
        ({ target: { value } }) =>
            this.setState({ data: { ...this.state.data, [field]: (number ? parseInt(value) : value) } });

    handleCostMod =
        ({ target: { value } }) =>
            this.setState({ data: { ...this.state.data, costMod: parseFloat(value).toFixed(2) } });

    handleType =
        (e, { value }) => this.setState({ data: { ...this.state.data, type: value } });

    handleFeatures = (a, { value }) =>
        this.setState({
            data: { ...this.state.data, features: value.map(v => this.props.features.find(x => x.id === v)) },
            featureIds: value
        })

    render() {
        const { features, user } = this.props;
        const { data, existing, featureIds } = this.state;

        const typeOptions = [];
        (ASPECT_TYPES).map(type => typeOptions.push({ text: type, key: type, value: type }));

        const addTrigger = <Button positive circular icon={'plus'} />;
        const editTrigger = <Button color={'teal'} icon={'edit outline'} />;

        return (
            <Modal
                closeIcon
                trigger={existing ? editTrigger : addTrigger}
                size={'mini'}
                actions={[
                    { key: 'cancel', content: 'Cancel', color: 'grey', icon: 'remove', basic: true },
                    {
                        key: 'save',
                        content: existing ? 'Save' : 'Add',
                        color: 'green',
                        icon: 'save',
                        onClick: existing ? this.update : this.add
                    }
                ]}
                header={(
                    <Header
                        icon={existing ? 'edit' : 'plus'}
                        content={existing ? 'Edit Aspect' : 'Create Aspect'}
                        color={'green'}
                    />
                )}
                content={(
                    <Modal.Content>
                        <Form>
                            <Form.Input
                                value={data.name}
                                onChange={this.handleInputChange('name')}
                                label={'Name'} />
                            <Form.Dropdown
                                fluid
                                label={'Type'}
                                selection
                                options={typeOptions}
                                value={data.type}
                                onChange={this.handleType}
                            />
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label={'Attack'}
                                    width={5}
                                    type={'number'}
                                    step={1}
                                    onChange={this.handleInputChange('attack', true)}
                                    value={data.attack || 0}
                                />
                                <Form.Input
                                    type={'number'}
                                    step={1}
                                    onChange={this.handleInputChange('defense', true)}
                                    fluid
                                    width={5}
                                    label={'Defense'}
                                    value={data.defense || 0}
                                />
                                <Form.Input
                                    type={'number'}
                                    step={1}
                                    onChange={this.handleInputChange('morale', true)}
                                    fluid
                                    width={6}
                                    label={'Morale'}
                                    value={data.morale || 0}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    type={'number'}
                                    step={1}
                                    onChange={this.handleInputChange('power', true)}
                                    fluid
                                    width={5}
                                    label={'Power'}
                                    value={data.power || 0}
                                />
                                <Form.Input
                                    type={'number'}
                                    step={1}
                                    onChange={this.handleInputChange('toughness', true)}
                                    fluid
                                    width={5}
                                    label={'Toughness'}
                                    value={data.toughness || 0}
                                />
                                <Form.Input
                                    type={'number'}
                                    step={0.1}
                                    onChange={this.handleCostMod}
                                    fluid
                                    width={6}
                                    label={'Cost Mod'}
                                    disabled={data.type !== ASPECT_TYPE_TYPE}
                                    value={data.costMod || 0}
                                />
                            </Form.Group>
                            <Form.Dropdown
                                onChange={this.handleFeatures}
                                label={'Features'}
                                fluid
                                multiple
                                search
                                selection
                                closeOnChange
                                options={createFeatureDropdownOptions(features, user)}
                                value={featureIds}
                            />
                        </Form>
                    </Modal.Content>
                )}
            />
        );
    }
}

EditAspect.propTypes = {
    aspect: PropTypes.object,
    type: PropTypes.string
};

const mapStateToProps = (state) => ({
    features: state.features.all,
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { createAspect, updateAspect }
)(EditAspect);
