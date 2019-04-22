import React from 'react';
import {connectHits, InstantSearch, Panel, SearchBox} from "react-instantsearch-dom";
import {Card, Divider, Form, Grid, Header, Label, Popup, Responsive, Tab, Table} from "semantic-ui-react";
import WarfareRefinementList from "./WarfareRefinementList";
import {UNIT_STAT_TYPES, withSign} from "../../../../store/unitmaker/unitmakerUtils";
import {connect} from "react-redux";
import SaveButton from "../../../components/searching/SaveButton";
import {saveAspectToUser, unsaveAspectFromUser} from "../../../../store/data/dataActions";
import {AUTH} from "../../../../store/reducer";
import {AUTH_USER} from "../../../../store/auth/authReducer";
import WarfareSearchBar from "./WarfareSearchBar";


const AspectHits =
    connect(
        state => ({user: state[AUTH][AUTH_USER]}),
        {saveAspectToUser, unsaveAspectFromUser}
    )(connectHits(
        ({hits, user, saveAspectToUser, unsaveAspectFromUser}) =>
            <Card.Group centered>
                {
                    hits.map(
                        hit =>
                            <Card key={hit.objectID} raised>
                                <Card.Content>
                                    <Header textAlign={'center'} size={'medium'} color={'teal'}>
                                        {hit.name}
                                        <Header.Subheader>
                                            {hit.authorId ? 'by ' : 'from '} <b>{hit.author}</b>
                                        </Header.Subheader>
                                    </Header>
                                </Card.Content>
                                <Card.Content style={{padding: 0}}>
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
                                            {
                                                UNIT_STAT_TYPES.map(
                                                    statType =>
                                                        <Table.Row key={statType}>
                                                            <Table.Cell
                                                                textAlign={'right'}
                                                                className={'capitalize'}>
                                                                {statType}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {withSign(hit[statType])}
                                                            </Table.Cell>
                                                        </Table.Row>
                                                )
                                            }
                                            <Table.Row>
                                                <Table.Cell textAlign={'right'} width={8}>
                                                    Features
                                                </Table.Cell>
                                                <Table.Cell width={8}>
                                                    {
                                                        hit.features.length > 0
                                                            ? hit.features.map(
                                                            feature =>
                                                                <div key={feature.id}>
                                                                    <Label
                                                                        content={feature.name}
                                                                        color={'teal'}
                                                                    />
                                                                </div>
                                                            )
                                                            : <span>None</span>
                                                    }
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Card.Content>
                                <Card.Content>
                                    <SaveButton
                                        saved={user && hit.saved.includes(user.uid)}
                                        disabled={!user}
                                        objectId={hit.objectID}
                                        saveFunc={saveAspectToUser}
                                        unsaveFunc={unsaveAspectFromUser}
                                    />
                                </Card.Content>
                            </Card>
                    )
                }
            </Card.Group>
    ));

const AspectHitsTwo =
    connect(
        state => ({user: state[AUTH][AUTH_USER]}),
        {saveAspectToUser, unsaveAspectFromUser}
    )(connectHits(
        ({hits, user, saveAspectToUser, unsaveAspectFromUser}) =>
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
                                <Grid.Column width={9} textAlign={'center'}>
                                    <Grid doubling>
                                        <Grid.Row columns={5}>
                                            {
                                                UNIT_STAT_TYPES.map(
                                                    statType =>
                                                        <Grid.Column key={statType}>
                                                            <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                                                                <Header
                                                                    textAlign={'center'}
                                                                    content={withSign(hit[statType])}
                                                                    subheader={statType.substring(0, 3).toUpperCase()}
                                                                />
                                                            </Responsive>
                                                            <Responsive minWidth={Responsive.onlyComputer.minWidth}>
                                                                <Header
                                                                    textAlign={'center'}
                                                                    content={withSign(hit[statType])}
                                                                    subheader={statType.toUpperCase()}
                                                                />
                                                            </Responsive>
                                                        </Grid.Column>
                                                )
                                            }
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={3} textAlign={'center'}>
                                    <Label.Group>
                                        {
                                            hit.features.length > 0
                                                ? hit.features.map(
                                                feature =>
                                                    <Popup
                                                        basic
                                                        size={'large'}
                                                        key={feature.id}
                                                        on={'hover'}
                                                        trigger={
                                                            <Label
                                                                basic
                                                                color={'teal'}
                                                                content={feature.name}
                                                            />
                                                        }
                                                        inverted
                                                        header={feature.name}
                                                        content={feature.effect}
                                                    />
                                                )
                                                : <span>None</span>
                                        }
                                    </Label.Group>
                                </Grid.Column>
                                <Grid.Column width={1}>
                                    <SaveButton
                                        saved={user && hit.saved.includes(user.uid)}
                                        disabled={!user}
                                        objectId={hit.objectID}
                                        saveFunc={saveAspectToUser}
                                        unsaveFunc={unsaveAspectFromUser}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                    )
                }
            </Grid>
    ));

const AspectSearchTab = ({searchClient}) => (
    <Tab.Pane>
        <div className="ais-InstantSearch">
            <InstantSearch indexName={'aspects'} searchClient={searchClient}>
                <Panel>
                    <WarfareSearchBar/>
                    <WarfareRefinementList attribute={'type'}/>
                </Panel>
                <Divider hidden/>
                <AspectHitsTwo/>
            </InstantSearch>
        </div>
        <br/>
    </Tab.Pane>
);

export default AspectSearchTab;
