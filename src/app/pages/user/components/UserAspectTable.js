import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Button, Checkbox, Placeholder, Table} from "semantic-ui-react";
import {sortByField, withSign} from "../../../../utils/unitMakerUtils";
import {ASPECTS, SAVED, USER} from "../../../../store/reducer";

const PlaceholderAspectRows = () =>
    [1, 2, 3, 4, 5].map(loop =>
        <Table.Row key={loop}>
            <Table.Cell textAlign={'center'}><Checkbox disabled/></Table.Cell>
            <Table.Cell><Placeholder><Placeholder.Line/></Placeholder></Table.Cell>
            {
                ['attack', 'defense', 'power', 'toughness', 'morale'].map(
                    stat =>
                        <Table.Cell textAlign={'center'} key={stat}>
                            <Placeholder><Placeholder.Line/></Placeholder>
                        </Table.Cell>
                )
            }
            <Table.Cell textAlign={'center'}>
                <Button icon={'edit outline'} color={'grey'}/>
            </Table.Cell>
            <Table.Cell textAlign={'center'}>
                <Button icon={'trash alternate outline'} color={'grey'}/>
            </Table.Cell>
        </Table.Row>
    );

class UserAspectTable extends Component {
    render() {
        const {values, aspect, fetched} = this.props;

        const headerClasses = 'capitalize text-teal';

        return (
            <Table compact celled selectable definition color={'teal'}>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell width={1}/>
                        <Table.HeaderCell width={8}>
                            <span className={headerClasses}>{aspect}</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} textAlign={'center'}>
                            <span className={headerClasses}>A</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} textAlign={'center'}>
                            <span className={headerClasses}>D</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} textAlign={'center'}>
                            <span className={headerClasses}>P</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} textAlign={'center'}>
                            <span className={headerClasses}>T</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} textAlign={'center'}>
                            <span className={headerClasses}>M</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} colSpan={2}/>
                        {/*<Table.HeaderCell width={1}/>*/}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        !fetched && <PlaceholderAspectRows/>
                    }
                    {
                        fetched &&
                        values.map(
                            value =>
                                <Table.Row key={value.id}>
                                    <Table.Cell textAlign={'center'}><Checkbox/></Table.Cell>
                                    <Table.Cell>{value.data()['name']}</Table.Cell>
                                    {
                                        ['attack', 'defense', 'power', 'toughness', 'morale'].map(
                                            stat =>
                                                <Table.Cell textAlign={'center'} key={stat}>
                                                    {withSign(value.data()[stat])}
                                                </Table.Cell>
                                        )
                                    }
                                    <Table.Cell textAlign={'center'}>
                                        <Button icon={'edit outline'} color={'teal'}/>
                                    </Table.Cell>
                                    <Table.Cell textAlign={'center'}>
                                        <Button icon={'trash alternate outline'} color={'red'}/>
                                    </Table.Cell>
                                </Table.Row>
                        )
                    }
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan={16} textAlign={'right'}>
                            <Button positive icon={'plus'} content={'New'}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

UserAspectTable.propsTypes = {
    aspect: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => ({
    values: state.aspects.all.filter(a => a.data().type === props.aspect).sort(sortByField('name')),
    fetched: state.fetched[ASPECTS][USER] || state.fetched[ASPECTS][SAVED]
});

export default connect(
    mapStateToProps,
    null
)(UserAspectTable);
