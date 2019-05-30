import React from 'react';
import { Card, Divider, Grid, Header, Tab, Table } from "semantic-ui-react";
import { connectHits, InstantSearch, Panel, SearchBox } from "react-instantsearch-dom";
import WarfareRefinementList from "./WarfareRefinementList";
import { connect } from "react-redux";
import SaveButton from "../../common/components/SaveButton";
import { saveFeatureToUser } from "../../features/store/featuresActions";
import WarfareSearchBar from "./WarfareSearchBar";
import { unsaveFeatureFromUser } from "../../features/store/featuresActions";

const FeatureHits =
    connect(
        state => ({ user: state.auth.user }),
        { saveFeatureToUser, unsaveFeatureFromUser }
    )(connectHits(
        ({ hits, user, saveFeatureToUser, unsaveFeatureFromUser }) => (
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
                                        alreadySaved={user && hit.saved && hit.saved.includes(user.uid)}
                                        authenticated={!!user}
                                        saveFunc={() => saveFeatureToUser(hit.objectID, user.id)}
                                        unsaveFunc={() => unsaveFeatureFromUser(hit.objectID, user.id)}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                    )
                }
            </Grid>
        )));

const FeatureSearchTab = ({ searchClient }) => (
    <Tab.Pane>
        <div className="ais-InstantSearch">
            <InstantSearch indexName={'features'} searchClient={searchClient}>
                <Panel>
                    <WarfareSearchBar />
                    <WarfareRefinementList attribute={'type'} />
                </Panel>
                <Divider hidden />
                <FeatureHits />
            </InstantSearch>
        </div>
        <br />
    </Tab.Pane>
);

export default FeatureSearchTab;
