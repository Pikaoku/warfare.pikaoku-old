import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dropdown, Header} from "semantic-ui-react";
import {stringifyObjectStats} from "../../../../store/unitmaker/unitmakerUtils";
import {saveUmField} from "../../../../store/unitmaker/unitmakerActions";
import {AUTH, DATA} from "../../../../store/reducer";
import {AUTH_USER} from "../../../../store/auth/authReducer";
import {ALL, ASPECTS} from "../../../../store/data/dataReducer";

class AspectDropdown extends PureComponent {
    render() {
        const {values, aspect, user, saveUmField} = this.props;

        const options = [];

        const AspectItem = ({name, stats, author, hideAuthor, color}) => (
            <Header size={'small'} color={color || 'black'}>
                {name}
                {
                    !hideAuthor &&
                    <Header.Subheader>by <b>{author}</b></Header.Subheader>
                }
                <Header.Subheader><i>{stats}</i></Header.Subheader>
            </Header>
        );

        values.map(v => options.push({
            value: v.id,
            text: v.data().name,
            content:
                <AspectItem
                    key={v.id}
                    name={v.data().name}
                    author={v.data().author}
                    stats={stringifyObjectStats(v.data())}
                    hideAuthor={v.data().official}
                    color={v.data().official ? 'teal' : (v.data().authorId === user.uid ? 'green' : 'pink')}
                />
        }));

        const onChange = (a, {value}) =>
            saveUmField(aspect, values.find(x => x.id === value).data());

        return (
            <Dropdown
                floating
                fluid
                search
                selection
                defaultValue={aspect + '.none'}
                options={options}
                placeholder={'Choose ' + aspect}
                onChange={onChange}
            />
        );
    }
}

const mapStateToProps = (state, props) => ({
    user: state[AUTH][AUTH_USER],
    values: state[DATA][ASPECTS][ALL].filter(x => x.data().type === props.aspect)
});

export default connect(
    mapStateToProps,
    {saveUmField}
)(AspectDropdown);
