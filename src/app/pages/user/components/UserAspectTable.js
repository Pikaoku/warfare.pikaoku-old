import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Checkbox, Popup, Table} from "semantic-ui-react";
import {ASPECT_TYPE_ANCESTRY, sortByField, UNIT_STAT_TYPES, withSign} from "../../../../store/unitmaker/unitmakerUtils";
import EditAspect from "../../../components/crud/EditAspect";
import {deleteAspect, saveAspectToUser, unsaveAspectFromUser} from "../../../../store/data/dataActions";
import {AUTH, DATA} from "../../../../store/reducer";
import {ASPECTS, SAVED, USER} from "../../../../store/data/dataReducer";
import {AUTH_USER} from "../../../../store/auth/authReducer";
import SaveButton from "../../../components/searching/SaveButton";

class UserAspectTable extends Component {
    render() {
        const {aspects, user, deleteAspect, saveAspectToUser, unsaveAspectFromUser} = this.props;

        const headerClasses = 'capitalize text-teal';

        return (
            <Table compact celled selectable definition color={'teal'} unstackable>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell width={1}/>
                        <Table.HeaderCell width={5}>
                            <span className={headerClasses}>Name</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={3}>
                            <span className={headerClasses}>Type</span>
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
                        (aspects.length > 0) &&
                        aspects.map(
                            aspect =>
                                <Table.Row key={aspect.id}>
                                    <Table.Cell textAlign={'center'}><Checkbox/></Table.Cell>
                                    <Table.Cell><span>{aspect.data()['name']}</span></Table.Cell>
                                    <Table.Cell><span>{aspect.data()['type']}</span></Table.Cell>
                                    {
                                        UNIT_STAT_TYPES.map(
                                            stat =>
                                                <Table.Cell textAlign={'center'} key={stat}>
                                                    {withSign(aspect.data()[stat])}
                                                </Table.Cell>
                                        )
                                    }
                                    {
                                        aspect.data().authorId === user.uid &&
                                        <>
                                            <Table.Cell textAlign={'center'}>
                                                <EditAspect type={aspect.type} aspect={aspect}/>
                                            </Table.Cell>
                                            <Table.Cell textAlign={'center'}>
                                                <Popup
                                                    trigger={<Button icon={'trash alternate outline'} color={'red'}/>}
                                                    content={<Button
                                                        negative
                                                        icon={'warning sign'}
                                                        content={'Confirm Delete'}
                                                        onClick={() => deleteAspect(aspect.id)}
                                                    />}
                                                    on={'click'}
                                                    position={'left center'}
                                                />
                                            </Table.Cell>
                                        </>
                                    }
                                    {
                                        aspect.data().authorId !== user.uid &&
                                        <Table.Cell colSpan={2}>
                                            <SaveButton
                                                saved={true}
                                                objectId={aspect.id}
                                                saveFunc={saveAspectToUser}
                                                unsaveFunc={unsaveAspectFromUser}
                                            />
                                        </Table.Cell>
                                    }
                                </Table.Row>
                        )
                    }
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan={16} textAlign={'right'}>
                            <EditAspect type={ASPECT_TYPE_ANCESTRY}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

const mapStateToProps = (state) => ({
    aspects: (state[DATA][ASPECTS][USER].concat(state[DATA][ASPECTS][SAVED]))
        .sort(sortByField('name')),
    user: state[AUTH][AUTH_USER]
});

export default connect(
    mapStateToProps,
    {deleteAspect, saveAspectToUser, unsaveAspectFromUser}
)(UserAspectTable);
