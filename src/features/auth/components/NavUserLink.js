import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu} from "semantic-ui-react"

class NavUserLink extends Component {
    render() {
        const {username, navProps} = this.props;
        return (<Menu.Item content={username} {...navProps}/>)
    }
}

const mapStateToProps = (state) => ({
    username: state.auth.username
});

export default connect(
    mapStateToProps,
    null
)(NavUserLink);
