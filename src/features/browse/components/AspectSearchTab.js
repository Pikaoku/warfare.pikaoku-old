import React from 'react';
import { connectHits, InstantSearch, Panel } from "react-instantsearch-dom";
import { Divider, Grid, Header, Label, Popup, Responsive, Tab, Icon } from 'semantic-ui-react';
import WarfareRefinementList from "./WarfareRefinementList";
import { connect } from "react-redux";
import SaveButton from "../../common/components/SaveButton";
import { saveAspectToUser } from "../../aspects/store/aspectsActions";
import { AUTH } from "../../../reducer";
import { AUTH_USER } from "../../auth/store/authReducer";
import WarfareSearchBar from "./WarfareSearchBar";

import { withSign, UNIT_STAT_TYPES } from '../../unitmaker/store/unitmakerUtils'
import { unsaveAspectFromUser } from "../../aspects/store/aspectsActions";

const AspectHitsTwo =
    connect(
        state =>
            ({
                user: state.auth.user
            }),
        { saveAspectToUser, unsaveAspectFromUser }
    )(connectHits(
        ({ hits, user, saveAspectToUser, unsaveAspectFromUser }) =>
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
                                        authenticated={!!user.id}
                                        alreadySaved={hit.saved.includes(user.id)}
                                        saveFunc={() => saveAspectToUser(hit.objectID, user.id)}
                                        unsaveFunc={() => unsaveAspectFromUser(hit.objectID, user.id)}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                    )
                }
            </Grid>
    ));

const AspectSearchTab = ({ searchClient }) => (
    <Tab.Pane>
        <div className="ais-InstantSearch">
            <InstantSearch indexName={'aspects'} searchClient={searchClient}>
                <Panel>
                    <WarfareSearchBar />
                    <WarfareRefinementList attribute={'type'} />
                </Panel>
                <Divider hidden />
                <AspectHitsTwo />
            </InstantSearch>
        </div>
        <br />
    </Tab.Pane>
);

export default AspectSearchTab;
