import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Menu} from "semantic-ui-react";
import {fetchUserData} from "../../../store/data/dataActions";
import {fetchUserSettings} from "../../../store/settings/settingsActions";
import {SETTINGS} from "../../../store/reducer";
import {SETTINGS_USERNAME} from "../../../store/settings/settingsReducer";

class NavUserLink extends Component {

    componentDidMount() {
        // User must be logged in!
        const {fetchUserSettings, fetchUserData} = this.props;
        this.unsubs = fetchUserData();
        this.unsubSettings = fetchUserSettings()
    }

    componentWillUnmount() {
        this.unsubs.map(unsub => unsub());
        this.unsubSettings();
    }

    render() {
        const {username, navProps} = this.props;
        return (<Menu.Item content={username} {...navProps}/>)
    }
}

const mapStateToProps = (state) => ({
    username: state[SETTINGS][SETTINGS_USERNAME] || 'User'
});

export default connect(
    mapStateToProps,
    {fetchUserData, fetchUserSettings}
)(NavUserLink);
