import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tab} from "semantic-ui-react";
import FeatureManager from "./FeatureManager";

class FeaturesSegment extends Component {
    render() {

        const panes = [
            {menuItem: 'Traits', render: () => <Tab.Pane attached={'bottom'}><FeatureManager/></Tab.Pane>},
            {menuItem: 'Actions', render: () => <Tab.Pane attached={'bottom'}>Tab 2 Content</Tab.Pane>},
            {menuItem: 'Attachments', render: () => <Tab.Pane attached={'bottom'}>Tab 3 Content</Tab.Pane>},
        ];

        return (
            <Tab menu={{attached: 'top', color: 'teal', inverted: true}} panes={panes}/>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(FeaturesSegment);
