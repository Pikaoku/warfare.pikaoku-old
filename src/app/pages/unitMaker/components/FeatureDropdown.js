import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dropdown, Header} from "semantic-ui-react";
import {umAddFeature} from "../../../../store/actions/unitmaker";

class FeatureDropdown extends PureComponent {
    render() {
        const {features, user, umAddFeature} = this.props;

        const options = [];

        const FeatureResult = ({name, effect, cost, author, hideAuthor, color}) => (
            <div>
                <Header size={'small'} color={color || 'black'}>
                    {name}
                    {
                        !hideAuthor &&
                        <Header.Subheader>by <b>{author}</b></Header.Subheader>
                    }
                    <Header.Subheader><i>Cost: {cost}</i></Header.Subheader>
                </Header>
                {effect}
            </div>
        );

        features.map(
            f => options.push({
                value: f.id,
                text: f.data().name,
                content:
                    <FeatureResult
                        key={f.id}
                        name={f.data().name}
                        cost={f.data().cost}
                        effect={f.data().effect}
                        author={f.data().author}
                        hideAuthor={f.data().official}
                        color={f.data().official ? 'teal' : (f.data().authorId === user.uid ? 'green' : 'pink')}
                    />
            }));

        const onChange = (a, {value}) =>
            umAddFeature(features.find(x => x.id === value).data());

        return (
            <Dropdown
                fluid
                search
                selection
                selectOnBlur={false}
                options={options}
                placeholder={'Add Existing Feature'}
                onChange={onChange}
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