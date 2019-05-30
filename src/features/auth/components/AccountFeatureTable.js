import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Popup, Table } from "semantic-ui-react";
import EditFeature from "../../features/components/EditFeature";
import { deleteFeature } from "../../features/store/featuresActions";
import SaveButton from "../../common/components/SaveButton";
import { saveFeatureToUser, unsaveFeatureFromUser } from "../../features/store/featuresActions";
import { sortByField } from '../../common/utils/array/sortByField';

class AccountFeatureTable extends Component {
    render() {
        const { features, deleteFeature, user, saveFeatureToUser, unsaveFeatureFromUser } = this.props;
        const headerClasses = 'capitalize text-teal';

        return (
            <Table compact celled selectable definition color={'teal'} unstackable>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell width={1} />
                        <Table.HeaderCell width={8}>
                            <span className={headerClasses}>Feature</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1}>
                            <span className={headerClasses}>Effect</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={3}>
                            <span className={headerClasses}>Type</span>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} colSpan={2} />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        (features.length > 0) &&
                        features.map(
                            value =>
                                <Table.Row key={value.id}>
                                    <Table.Cell textAlign={'center'}><Checkbox /></Table.Cell>
                                    <Table.Cell>{value.name}</Table.Cell>
                                    <Table.Cell textAlign={'center'}>
                                        <Popup
                                            trigger={
                                                <Button icon={'angle down'} color={'yellow'} size={'mini'}
                                                    compact />
                                            }
                                            content={value.effect}
                                            on={'click'}
                                            position={'bottom center'}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{value.type}</Table.Cell>
                                    {
                                        value.authorId === user.id &&
                                        <>
                                            <Table.Cell textAlign={'center'}>
                                                <EditFeature type={value.type} feature={value} />
                                            </Table.Cell>
                                            <Table.Cell textAlign={'center'}>
                                                <Popup
                                                    trigger={<Button icon={'trash alternate outline'} color={'red'} />}
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
                                        value.authorId !== user.id &&
                                        <Table.Cell colSpan={2}>
                                            <SaveButton
                                                alreadySaved={true}
                                                authenticated={true}
                                                saveFunc={() => saveFeatureToUser(value.id, user.id)}
                                                unsaveFunc={() => unsaveFeatureFromUser(value.id, user.id)}
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
                            <EditFeature type={'trait'} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

const mapStateToProps = (state) => ({
    features: (state.features.user.concat(state.features.saved)).sort(sortByField('name')),
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { deleteFeature, saveFeatureToUser, unsaveFeatureFromUser }
)(AccountFeatureTable);
