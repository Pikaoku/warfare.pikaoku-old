import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";

class Shared extends Component {
    render() {
        return (
            <StandardPage title={'Shared'} subtitle={'This needs a better name!'} icon={'globe'}>

            </StandardPage>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(Shared);
