import React from 'react';
import {Card, Divider, Header, Tab, Table} from "semantic-ui-react";
import {connectHits, InstantSearch, Panel, SearchBox} from "react-instantsearch-dom";
import WarfareRefinementList from "./WarfareRefinementList";
import {connect} from "react-redux";
import SaveButton from "../../../components/searching/SaveButton";
import {saveFeatureToUser, unsaveFeatureFromUser} from "../../../../store/data/dataActions";


const FeatureHits =
    connect(
        state => ({user: state.user}),
        {saveFeatureToUser, unsaveFeatureFromUser}
    )(connectHits(
        ({hits, user, saveFeatureToUser, unsaveFeatureFromUser}) => (
            <Card.Group centered stacking>
                {
                    hits.map(
                        hit => (
                            <Card key={hit.objectID}>
                                <Card.Content>
                                    <Header textAlign={'center'} size={'medium'} color={'blue'}>
                                        {hit.name}
                                        <Header.Subheader>
                                            {hit.authorId ? 'by ' : 'from '} <b>{hit.author}</b>
                                        </Header.Subheader>
                                    </Header>
                                </Card.Content>
                                <Card.Content style={{padding: 0}}>
                                    <Table compact basic={'very'} padded definition unstackable fixed
                                           style={{height: '100%'}}>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell textAlign={'right'} width={4}>
                                                    Type
                                                </Table.Cell>
                                                <Table.Cell width={12}>
                                                    {hit.type}
                                                </Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell textAlign={'right'}>
                                                    Cost
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {hit.cost}
                                                </Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell textAlign={'right'}>
                                                    Effect
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {hit.effect}
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Card.Content>
                                <Card.Content>
                                    <SaveButton
                                        saved={user && hit.saved && hit.saved.includes(user.uid)}
                                        disabled={!user}
                                        objectId={hit.objectID}
                                        saveFunc={saveFeatureToUser}
                                        unsaveFunc={unsaveFeatureFromUser}
                                    />
                                </Card.Content>
                            </Card>
                        )
                    )
                }
            </Card.Group>
        )
    ));

const FeatureSearchTab = ({searchClient}) => (
    <Tab.Pane>
        <div className="ais-InstantSearch">
            <InstantSearch indexName={'features'} searchClient={searchClient}>
                <Panel>
                    <SearchBox/>
                    <WarfareRefinementList attribute={'type'}/>
                </Panel>
                <Divider hidden/>
                <FeatureHits/>
            </InstantSearch>
        </div>
        <br/>
    </Tab.Pane>
);

export default FeatureSearchTab;
