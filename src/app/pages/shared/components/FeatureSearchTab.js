import React from 'react';
import {Card, Divider, Header, Tab, Table} from "semantic-ui-react";
import {connectHits, InstantSearch, Panel, SearchBox} from "react-instantsearch-dom";
import WarfareRefinementList from "./WarfareRefinementList";
import {connect} from "react-redux";
import {saveFeatureToUser, unsaveFeatureFromUser} from "../../../../store/actions/firestore";
import SaveButton from "../../../components/searching/SaveButton";


const FeatureHits =
    connect(
        state => ({user: state.user}),
        {saveFeatureToUser, unsaveFeatureFromUser}
    )(connectHits(
        ({hits, user, saveFeatureToUser, unsaveFeatureFromUser}) => (
            <Card.Group centered itemsPerRow={4} doubling>
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
                                <Card.Content style={{padidng: 0}}>
                                    <Table compact basic={'very'} padded definition unstackable>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell textAlign={'right'} width={8}>
                                                    Type
                                                </Table.Cell>
                                                <Table.Cell width={8}>
                                                    {hit.type}
                                                </Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell textAlign={'right'} width={8}>
                                                    Cost
                                                </Table.Cell>
                                                <Table.Cell width={8}>
                                                    {hit.cost}
                                                </Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell textAlign={'right'} width={8}>
                                                    Effect
                                                </Table.Cell>
                                                <Table.Cell width={8}>
                                                    {hit.effect}
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Card.Content>
                                <SaveButton
                                    saved={hit.saved.includes(user.uid)}
                                    objectId={hit.objectID}
                                    saveFunc={saveFeatureToUser}
                                    unsaveFunc={unsaveFeatureFromUser}
                                />
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
            <InstantSearch indexName={'aspects'} searchClient={searchClient}>
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
