import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Segment} from "semantic-ui-react";

class UnitCardOptions extends Component {
    render() {
        return (
            <Segment>

            </Segment>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(UnitCardOptions);
