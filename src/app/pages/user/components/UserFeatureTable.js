import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sortByField} from "../../../../store/unitmaker/unitmakerUtils";
import {AUTH, DATA} from "../../../../store/reducer";
import {Button, Checkbox, Popup, Table} from "semantic-ui-react";
import EditFeature from "../../../components/crud/EditFeature";
import {deleteFeature, saveFeatureToUser, unsaveFeatureFromUser} from "../../../../store/data/dataActions";
import {FEATURES, SAVED, USER} from "../../../../store/data/dataReducer";
import {AUTH_USER} from "../../../../store/auth/authReducer";
import SaveButton from "../../../components/searching/SaveButton";

class UserFeatureTable extends Component {
    render() {
        const {features, deleteFeature, user, saveFeatureToUser, unsaveFeatureFromUser} = this.props;
        const headerClasses = 'capitalize text-teal';

        return (
            <Table compact celled selectable definition color={'teal'} unstackable>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell width={1}/>
                        <Table.HeaderCell width={8}>
                            <span className={headerClasses}>Feature</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1}>
                            <span className={headerClasses}>Effect</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={3}>
                            <span className={headerClasses}>Type</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} colSpan={2}/>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        (features.length > 0) &&
                        features.map(
                            value =>
                                <Table.Row key={value.id}>
                                    <Table.Cell textAlign={'center'}><Checkbox/></Table.Cell>
                                    <Table.Cell>{value.data()['name']}</Table.Cell>
                                    <Table.Cell textAlign={'center'}>
                                        <Popup
                                            trigger={
                                                <Button icon={'angle down'} color={'yellow'} size={'mini'}
                                                        compact/>
                                            }
                                            content={value.data()['effect']}
                                            on={'click'}
                                            position={'bottom center'}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{value.data()['type']}</Table.Cell>
                                    {
                                        value.data().authorId === user.uid &&
                                        <>
                                            <Table.Cell textAlign={'center'}>
                                                <EditFeature type={value.type} feature={value}/>
                                            </Table.Cell>
                                            <Table.Cell textAlign={'center'}>
                                                <Popup
                                                    trigger={<Button icon={'trash alternate outline'} color={'red'}/>}
                                                    content={<Button
                                                        negative
                                                        icon={'warning sign'}
                                                        content={'Confirm Delete'}
                                                        onClick={() => deleteFeature(value.id)}
                                                    />}
                                                    on={'click'}
                                                    position={'left center'}
                                                />
                                            </Table.Cell>
                                        </>
                                    }
                                    {
                                        value.data().authorId !== user.uid &&
                                        <Table.Cell colSpan={2}>
                                            <SaveButton
                                                saved={true}
                                                objectId={value.id}
                                                saveFunc={saveFeatureToUser}
                                                unsaveFunc={unsaveFeatureFromUser}
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
                            <EditFeature type={'trait'}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

const mapStateToProps = (state) => ({
    // features: (state[FEATURES][USER].concat(state[FEATURES][SAVED])).sort(sortByField('name')),
    features:
        (state[DATA][FEATURES][USER].concat(state[DATA][FEATURES][SAVED]))
            .sort(sortByField('name')),
    fetched:
        (state[DATA][FEATURES][USER].length > 0) || (state[DATA][FEATURES][SAVED].length > 0),
    user: state[AUTH][AUTH_USER]
});

export default connect(
    mapStateToProps,
    {deleteFeature, saveFeatureToUser, unsaveFeatureFromUser}
)(UserFeatureTable);
