import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dropdown} from "semantic-ui-react";
import {umAddFeature} from "../../../../store/unitmaker/unitmakerActions";
import {createFeatureDropdownOptions} from "../../../components/searching/FeatureDropdownResult";
import {DATA} from "../../../../store/reducer";
import {ALL, FEATURES} from "../../../../store/data/dataReducer";
import {filterByField} from "../../../../store/unitmaker/unitmakerUtils";

class FeatureDropdown extends PureComponent {
    state = {
        value: ''
    };

    render() {
        const {features, umAddFeature} = this.props;
        const {search} = this.state;


        const onChange = (a, {value}) => {
            umAddFeature(features.find(filterByField('id', value)));
            this.setState({search: ''})
        };

        return (
            <Dropdown
                button
                search
                deburr
                selection
                onChange={onChange}
                options={createFeatureDropdownOptions(features)}
                selectOnNavigation={false}
                selectOnBlur={false}
                placeholder={'Add Existing Feature'}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    features: state[DATA][FEATURES][ALL]
});

export default connect(
    mapStateToProps,
    {umAddFeature}
)(FeatureDropdown);