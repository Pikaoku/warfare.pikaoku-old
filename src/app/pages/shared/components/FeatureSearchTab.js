import React from 'react';
import {Card, Divider, Grid, Header, Tab, Table} from "semantic-ui-react";
import {connectHits, InstantSearch, Panel, SearchBox} from "react-instantsearch-dom";
import WarfareRefinementList from "./WarfareRefinementList";
import {connect} from "react-redux";
import SaveButton from "../../../components/searching/SaveButton";
import {saveFeatureToUser, unsaveFeatureFromUser} from "../../../../store/data/dataActions";
import WarfareSearchBar from "./WarfareSearchBar";


const FeatureHits =
    connect(
        state => ({user: state.user}),
        {saveFeatureToUser, unsaveFeatureFromUser}
    )(connectHits(
        ({hits, user, saveFeatureToUser, unsaveFeatureFromUser}) => (
            <Card.Group centered>
                {
                    hits.map(
                        hit => (
                            <Card key={hit.objectID}>
                                <Card.Content>
                                    <Header textAlign={'center'} size={'medium'} color={'teal'}>
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

const FeatureHitsTwo =
    connect(
        state => ({user: state.user}),
        {saveFeatureToUser, unsaveFeatureFromUser}
    )(connectHits(
        ({hits, user, saveFeatureToUser, unsaveFeatureFromUser}) => (
            <Grid container divided={'vertically'} verticalAlign={'middle'} relaxed stackable>
                {
                    hits.map(
                        hit =>
                            <Grid.Row key={hit.objectID}>
                                <Grid.Column width={3}>
                                    <Header textAlign={'center'} size={'medium'} color={'teal'}>
                                        {hit.name}
                                        <Header.Subheader>
                                            <div className={'capitalize'}>{hit.type}</div>
                                            <div>{hit.authorId ? 'by ' : 'from '} <b>{hit.author}</b></div>
                                        </Header.Subheader>
                                    </Header>
                                </Grid.Column>
                                <Grid.Column width={2} >
                                    <Header
                                        textAlign={'center'}
                                        content={hit['cost']}
                                        subheader={'COST'}
                                    />
                                </Grid.Column>
                                <Grid.Column width={10} textAlign={'center'} verticalAlign={'middle'}>
                                    <span>{hit['effect']}</span>
                                </Grid.Column>
                                <Grid.Column width={1}>
                                    <SaveButton
                                        saved={user && hit.saved && hit.saved.includes(user.uid)}
                                        disabled={!user}
                                        objectId={hit.objectID}
                                        saveFunc={saveFeatureToUser}
                                        unsaveFunc={unsaveFeatureFromUser}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                    )
                }
            </Grid>
        )));

const FeatureSearchTab = ({searchClient}) => (
    <Tab.Pane>
        <div className="ais-InstantSearch">
            <InstantSearch indexName={'features'} searchClient={searchClient}>
                <Panel>
                    <WarfareSearchBar/>
                    <WarfareRefinementList attribute={'type'}/>
                </Panel>
                <Divider hidden/>
                <FeatureHitsTwo/>
            </InstantSearch>
        </div>
        <br/>
    </Tab.Pane>
);

export default FeatureSearchTab;
