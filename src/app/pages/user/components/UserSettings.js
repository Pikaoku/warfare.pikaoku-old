import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Header, Segment} from "semantic-ui-react";
import {blurOnKeyDown} from "../../../../store/unitmaker/unitmakerUtils";
import {updateUserSetting} from "../../../../store/settings/settingsActions";
import {SETTINGS} from "../../../../store/reducer";
import {
    SETTINGS_BASE_DEFENSE,
    SETTINGS_BASE_TOUGHNESS,
    SETTINGS_USERNAME
} from "../../../../store/settings/settingsReducer";

class UserSettings extends Component {
    render() {

        const {username, settings, updateUserSetting} = this.props;

        if (this.props.settings === {}) {
            return '';
        }

        const updateFunc =
            (field, numeric) => ({target: {value}}) => (updateUserSetting(field, (numeric ? parseInt(value) : value)));

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
                                username &&
                                <Form.Input
                                    width={16}
                                    label={'Username'}
                                    type={'text'}
                                    defaultValue={username}
                                    onKeyDown={blurOnKeyDown}
                                    onBlur={updateFunc('username')}
                                />
                            }
                        </Form.Group>
                        <Form.Group>
                            {
                                settings &&
                                <>
                                    <Form.Input
                                        width={8}
                                        type={'number'}
                                        step={1}
                                        defaultValue={settings[SETTINGS_BASE_DEFENSE]}
                                        label={'Base Defense'}
                                        onBlur={updateFunc('warfare.settings.baseDefense', true)}
                                        onKeyDown={blurOnKeyDown}
                                    />
                                    <Form.Input
                                        width={8}
                                        type={'number'}
                                        step={1}
                                        defaultValue={settings[SETTINGS_BASE_TOUGHNESS]}
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
        settings: state[SETTINGS],
        username: state[SETTINGS][SETTINGS_USERNAME]
    }
};

export default connect(
    mapStateToProps,
    {updateUserSetting}
)(UserSettings);
