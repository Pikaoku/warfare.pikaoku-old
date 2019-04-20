import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Header, Segment} from "semantic-ui-react";
import {blurOnKeyDown} from "../../../../utils/unitMakerUtils";
import {updateUserSetting} from "../../../../store/actions/firestore";

class UserSettings extends Component {
    render() {

        if (this.props.settings === {}) {
            return '';
        }

        const updateFunc =
            (field, numeric) =>
                ({target: {value}}) =>
                    (this.props.updateUserSetting(field, (numeric ? parseInt(value) : value)));

        return (
            <Segment.Group>
                <Segment>
                    <Header>
                        User Settings
                    </Header>
                </Segment>
                <Segment>
                    <Form>
                        <Form.Group>
                            {
                                this.props.username &&
                                <Form.Input
                                    width={16}
                                    label={'Username'}
                                    type={'text'}
                                    defaultValue={this.props.username}
                                    onKeyDown={blurOnKeyDown}
                                    onBlur={updateFunc('username')}
                                />
                            }
                        </Form.Group>
                        <Form.Group>
                            {
                                this.props.settings && this.props.settings.settings &&
                                <>
                                    <Form.Input
                                        width={8}
                                        type={'number'}
                                        step={1}
                                        defaultValue={this.props.settings.settings.baseDefense}
                                        label={'Base Defense'}
                                        onBlur={updateFunc('warfare.settings.baseDefense', true)}
                                        onKeyDown={blurOnKeyDown}
                                    />
                                    <Form.Input
                                        width={8}
                                        type={'number'}
                                        step={1}
                                        defaultValue={this.props.settings.settings.baseToughness}
                                        label={'Base Toughness'}
                                        onBlur={updateFunc('warfare.settings.baseToughness', true)}
                                        onKeyDown={blurOnKeyDown}
                                    />
                                </>
                            }
                        </Form.Group>
                    </Form>
                </Segment>
            </Segment.Group>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings.warfare,
        username: state.settings.username
    }
};

export default connect(
    mapStateToProps,
    {updateUserSetting}
)(UserSettings);
