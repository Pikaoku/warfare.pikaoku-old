import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from "semantic-ui-react";
import { umAddFeature } from "../store/unitmakerActions";
import createFeatureDropdownOptions from '../../features/utils/createFeatureDropdownOptions';
import { filterByField } from '../../common/utils/array/filterByField';

class FeatureDropdown extends PureComponent {
    render() {
        const { features, user, umAddFeature } = this.props;

        const onChange = (a, { value }) => {
            umAddFeature(features.find(filterByField('id', value)));
            this.setState({ search: '' })
        };

        return (
            <Dropdown
                button
                search
                deburr
                selection
                onChange={onChange}
                options={createFeatureDropdownOptions(features, user)}
                selectOnNavigation={false}
                selectOnBlur={false}
                placeholder={'Add Existing Feature'}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    features: state.features.all,
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { umAddFeature }
)(FeatureDropdown);