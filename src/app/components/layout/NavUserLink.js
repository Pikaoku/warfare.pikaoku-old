import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Menu} from "semantic-ui-react";
import {fetchAllUserData} from "../../../store/actions/firestore";

class NavUserLink extends Component {

    componentDidMount() {
        // Used must be logged in!
        this.unsubs = this.props.fetchAllUserData(this.props.user.uid);
    }

    componentWillUnmount() {
        this.unsubs.map(unsub => unsub())
    }

    render = ({username}) => (
        <Menu.Item content={username || 'User'} {...this.props.navProps}/>
    )
}

const mapStateToProps = (state) => ({
    username: state.settings.username || 'username'
});

export default connect(
    mapStateToProps,
    {fetchAllUserData}
)(NavUserLink);
