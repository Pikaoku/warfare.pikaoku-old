import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";

class Browse extends Component {
    render() {
        return (
            <StandardPage title={'Browse'} subtitle={'This needs a better name!'} icon={'cart'}>

            </StandardPage>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(Browse);
