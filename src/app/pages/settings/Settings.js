import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";

class Settings extends Component {
    render() {
        return (
            <StandardPage title={'Settings'} subtitle={'Go on and set all those settings'} icon={'cog'}>

            </StandardPage>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(Settings);
