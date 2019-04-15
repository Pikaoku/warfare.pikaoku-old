import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dropdown} from "semantic-ui-react";
import {umAddFeature} from "../../../../store/actions/unitmaker";
import {createFeatureDropdownOptions} from "../../../components/searching/FeatureDropdownResult";

class FeatureDropdown extends PureComponent {
    state = {
        value: ''
    };

    render() {
        const {features, umAddFeature} = this.props;
        const {search} = this.state;


        const onChange = (a, {value}) => {
            umAddFeature(features.find(x => x.id === value).data());
            this.setState({search: ''})
        };

        return (
            <Dropdown
                button
                search
                deburr
                selection
                onChange={onChange}
                searchQuery={search}
                value={''}
                options={createFeatureDropdownOptions(features)}
                selectOnNavigation={false}
                selectOnBlur={false}
                placeholder={'Add Existing Feature'}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    features: state.features.all
});

export default connect(
    mapStateToProps,
    {umAddFeature}
)(FeatureDropdown);