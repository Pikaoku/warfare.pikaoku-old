import React from 'react'
import { connectHits, InstantSearch, Pagination, Panel } from 'react-instantsearch-dom'
import { connect } from 'react-redux'
import { Divider, Grid, Header, Tab } from 'semantic-ui-react'

import SaveButton from '../../common/components/SaveButton'
import { saveFeatureToUser, unsaveFeatureFromUser } from '../../features/store/featuresActions'
import WarfareRefinementList from './WarfareRefinementList'
import WarfareSearchBar from './WarfareSearchBar'

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
                <Divider hidden />
                <Pagination />
            </InstantSearch>
        </div>
        <br />
    </Tab.Pane>
);

export default FeatureSearchTab;
