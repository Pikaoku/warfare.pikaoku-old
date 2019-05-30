import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Header } from "semantic-ui-react";
import { stringifyObjectStats } from "../store/unitmakerUtils";
import { saveUmField } from "../store/unitmakerActions";
import { filterByField } from '../../common/utils/array/filterByField';
import { sortByField } from '../../common/utils/array/sortByField';

class AspectDropdown extends PureComponent {
    render() {
        const { values, aspect, user, saveUmField } = this.props;

        const options = [];

        const AspectItem = ({ name, stats, author, hideAuthor, color }) => (
            <Header size={'small'} color={color || 'black'}>
                {name}
                {
                    !hideAuthor &&
                    <Header.Subheader>by <b>{author}</b></Header.Subheader>
                }
                <Header.Subheader><i>{stats}</i></Header.Subheader>
            </Header>
        );

        values.map(
            v =>
                options.push({
                    value: v.id,
                    text: v.name,
                    content:
                        <AspectItem
                            key={v.id}
                            name={v.name}
                            author={v.author}
                            stats={stringifyObjectStats(v)}
                            hideAuthor={v.official}
                            color={v.official ? 'teal' : (v.authorId === user.uid ? 'green' : 'pink')}
                        />
                })
        );

        const onChange = (a, { value }) => saveUmField(aspect, values.find(x => x.id === value));

        return (
            <Dropdown
                fluid
                search
                selection
                defaultValue={aspect + '.none'}
                options={options}
                selectOnNavigation={false}
                selectOnBlur={false}
                placeholder={'Choose ' + aspect}
                onChange={onChange}
            />
        );
    }
}

const mapStateToProps = (state, props) => ({
    user: state.auth.user,
    values:
        state.aspects.all
            .filter(filterByField('type', props.aspect))
            .sort(sortByField('name'))
});

export default connect(
    mapStateToProps,
    { saveUmField }
)(AspectDropdown);
