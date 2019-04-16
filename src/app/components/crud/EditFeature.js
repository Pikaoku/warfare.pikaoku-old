import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createFeature, updateFeature} from "../../../store/actions/firestore";
import PropTypes from "prop-types";
import {FEATURE_TYPE_TRAIT, FEATURE_TYPES} from "../../../store/reducer";
import {Button, Form, Header, Modal} from "semantic-ui-react";
import {emptyFeature} from "../../../utils/unitMakerUtils";

class EditFeature extends Component {
    constructor(props) {
        super(props);

        this.reset = this.reset.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleType = this.handleType.bind(this);

        this.state = this.reset(true);
    }

    reset = (shouldReturn = false) => {
        const
            {feature, type} = this.props,
            state = !!feature
                ? {
                    id: feature.id,
                    data: feature.data(),
                    existing: !!feature
                }
                : {
                    id: false,
                    data: emptyFeature(type || FEATURE_TYPE_TRAIT),
                    existing: !!feature
                };
        return shouldReturn ? state : this.setState(state);
    };

    add = () => this.props.createFeature(this.state.data);

    update = () => this.props.updateFeature(this.state.id, this.state.data);

    handleInputChange = (field, number = false) =>
        ({target: {value}}) =>
            this.setState({data: {...this.state.data, [field]: (number ? parseInt(value) : value)}});

    handleType = (e, {value}) => this.setState({data: {...this.state.data, type: value}});

    render() {
        const {data, existing} = this.state;
        const typeOptions = [];
        FEATURE_TYPES.map(type => typeOptions.push({text: type, key: type, value: type}));

        const addTrigger = <Button positive circular icon={'plus'}/>;
        const editTrigger = <Button color={'teal'} icon={'edit outline'}/>;

        return (
            <Modal
                closeIcon
                trigger={existing ? editTrigger : addTrigger}
                size={'mini'}
                actions={[
                    {key: 'cancel', content: 'Cancel', color: 'grey', icon: 'remove', basic: true},
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
                        content={existing ? 'Edit Feature' : 'Create Feature'}
                        color={'green'}
                    />
                )}
                content={(
                    <Modal.Content>
                        <Form>
                            <Form.Group>
                                <Form.Input
                                    width={12}
                                    value={data.name}
                                    onChange={this.handleInputChange('name')}
                                    label={'Name'}
                                />
                                <Form.Input
                                    width={4}
                                    value={data.cost}
                                    onChange={this.handleInputChange('cost', true)}
                                    label={'Cost'}
                                    type={'number'}
                                />
                            </Form.Group>
                            <Form.TextArea
                                value={data.effect}
                                label={'Effect'}
                                onChange={this.handleInputChange('effect')}
                            />
                            <Form.Dropdown
                                fluid
                                label={'Type'}
                                selection
                                options={typeOptions}
                                value={data.type}
                                onChange={this.handleType}
                            />
                        </Form>
                    </Modal.Content>
                )}
            />
        );
    }
}

EditFeature.propTypes = {
    feature: PropTypes.object,
    type: PropTypes.string
};

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
    {createFeature, updateFeature}
)(EditFeature);
