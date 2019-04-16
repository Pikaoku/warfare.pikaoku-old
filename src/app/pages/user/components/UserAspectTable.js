import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Button, Checkbox, Placeholder, Popup, Table} from "semantic-ui-react";
import {sortByField, UNIT_STAT_TYPES, withSign} from "../../../../utils/unitMakerUtils";
import {ASPECTS, SAVED, USER} from "../../../../store/reducer";
import EditAspect from "../../../components/crud/EditAspect";
import {deleteAspect} from "../../../../store/actions/firestore";

const PlaceholderAspectRows = () =>
    [1, 2, 3, 4, 5].map(loop =>
        <Table.Row key={loop}>
            <Table.Cell textAlign={'center'}><Checkbox disabled/></Table.Cell>
            <Table.Cell><Placeholder><Placeholder.Line/></Placeholder></Table.Cell>
            {
                UNIT_STAT_TYPES.map(
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
        const {values, aspect, fetched, deleteAspect} = this.props;

        const headerClasses = 'capitalize text-teal';

        return (
            <Table compact celled selectable definition color={'teal'} unstackable>
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
                                        UNIT_STAT_TYPES.map(
                                            stat =>
                                                <Table.Cell textAlign={'center'} key={stat}>
                                                    {withSign(value.data()[stat])}
                                                </Table.Cell>
                                        )
                                    }
                                    <Table.Cell textAlign={'center'}>
                                        <EditAspect type={value.type} aspect={value}/>
                                    </Table.Cell>
                                    <Table.Cell textAlign={'center'}>
                                        <Popup
                                            trigger={<Button icon={'trash alternate outline'} color={'red'}/>}
                                            content={<Button
                                                negative
                                                icon={'warning sign'}
                                                content={'Confirm Delete'}
                                                onClick={() => deleteAspect(value.id)}
                                            />}
                                            on={'click'}
                                            position={'left center'}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                        )
                    }
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan={16} textAlign={'right'}>
                            <EditAspect type={aspect}/>
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
    values: (state[ASPECTS][USER].concat(state[ASPECTS][SAVED])).filter(a => a.data().type === props.aspect).sort(sortByField('name')),
    fetched: state.fetched[ASPECTS][USER] || state.fetched[ASPECTS][SAVED]
});

export default connect(
    mapStateToProps,
    {deleteAspect}
)(UserAspectTable);
