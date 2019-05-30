import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Input, Form, Header, Segment, Table, TableHeader, TableRow, TableCell, TableBody, TableHeaderCell, Button } from "semantic-ui-react";
import { blurOnKeyDown } from "../../../unitmaker/store/unitmakerUtils";
import { saveUserSetting } from "../../store/authActions";

class AccountSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false
        }
    }

    render() {
        const { user, username, settings, saveUserSetting } = this.props
        const { edit } = this.state

        const updateFunc =
            (field, numeric = false) =>
                value => (saveUserSetting(field, (numeric ? parseInt(value) : value)))

        const onClickSetState = (field) => () => this.setState({ edit: field })

        const SettingsTableRow = ({ label, value, updateValue }) => {
            const [edit, setEdit] = useState(false)
            return (
                <TableRow>
                    <TableCell>{label}</TableCell>
                    <TableCell>
                        {
                            !edit
                                ? value
                                : <Input
                                    fluid
                                    autoFocus
                                    defaultValue={value}
                                    onKeyDown={blurOnKeyDown}
                                    onBlur={
                                        ({ target: { value } }) => {
                                            updateValue(value)
                                            setEdit(false)
                                        }
                                    }
                                />
                        }
                    </TableCell>
                    <TableCell>
                        <Button onClick={() => setEdit(!edit)} color={edit ? 'green' : 'teal'} icon={edit ? 'save outline' : 'edit outline'} compact />
                    </TableCell>
                </TableRow>
            )
        }

        return (
            <Segment.Group>
                {
                    user &&
                    <Segment>
                        <Table basic={'very'}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell width={8}>Setting</TableHeaderCell>
                                    <TableHeaderCell width={6}>Value</TableHeaderCell>
                                    <TableHeaderCell width={2}></TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <SettingsTableRow
                                    label={'Username'}
                                    value={username}
                                    updateValue={updateFunc('username')}
                                />
                                <SettingsTableRow
                                    updateValue={updateFunc('warfare.baseDefense', true)}
                                    label={'Base Defense'}
                                    value={settings.baseDefense}
                                />
                                <SettingsTableRow
                                    updateValue={updateFunc('warfare.baseToughness', true)}
                                    label={'Base Toughness'}
                                    value={settings.baseToughness}
                                />
                            </TableBody>
                        </Table>
                    </Segment>
                }
            </Segment.Group>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.auth.settings,
        username: state.auth.username,
        user: state.auth.user
    }
};

export default connect(
    mapStateToProps,
    { saveUserSetting }
)(AccountSettings);
