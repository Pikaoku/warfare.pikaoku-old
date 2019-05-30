import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu} from "semantic-ui-react"

class NavUserLink extends Component {
    render() {
        const {user, navProps} = this.props;
        return (<Menu.Item content={user.username} {...navProps}/>)
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    null
)(NavUserLink);
