import React from 'react';
import { Card, Divider, Grid, Header, Label, Popup, Responsive, Tab } from "semantic-ui-react";
import { connectHits, InstantSearch, Panel } from "react-instantsearch-dom";
import { connect } from 'react-redux';
import SaveButton from "../../common/components/SaveButton";
import {
    ASPECT_TYPES,
    calculateUnitCost,
    composeUnitFeatures,
    extractStat,
    stringifyUnitObjectStats,
    UNIT_ITEM_NAME,
    UNIT_STAT_TYPES,
    withSign
} from "../../unitmaker/store/unitmakerUtils";
import { saveUnitToUser } from "../../units/store/unitsActions";
import WarfareSearchBar from "./WarfareSearchBar";
import { AUTH } from "../../../reducer";
import { AUTH_USER } from "../../auth/store/authReducer";
import { unsaveUnitFromUser } from "../../units/store/unitsActions";

const UnitHitsTwo =
    connect(
        state => ({ user: state[AUTH][AUTH_USER] }),
        { saveUnitToUser, unsaveUnitFromUser }
    )(connectHits(
        ({ hits, user, saveUnitToUser, unsaveUnitFromUser }) => (
            <Grid container divided={'vertically'} verticalAlign={'middle'} relaxed stackable>
                {
                    hits.map(
                        hit =>
                            <Grid.Row key={hit.objectID}>
                                <Grid.Column width={3}>
                                    <Header textAlign={'center'} size={'medium'} color={'teal'}>
                                        {hit.name}
                                        <Header.Subheader>
                                            <div>{hit.authorId ? 'by ' : 'from '} <b>{hit.author}</b></div>
                                        </Header.Subheader>
                                    </Header>
                                </Grid.Column>
                                <Grid.Column width={9} textAlign={'center'}>
                                    <Grid doubling>
                                        <Grid.Row columns={1}>
                                            <Grid.Column>
                                                <Header
                                                    size={'small'}
                                                    content={ASPECT_TYPES.map(aspectType => hit[aspectType][UNIT_ITEM_NAME]).join('    ')}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row columns={5}>
                                            {
                                                UNIT_STAT_TYPES.map(
                                                    statType =>
                                                        <Grid.Column key={statType}>
                                                            <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                                                                <Header
                                                                    textAlign={'center'}
                                                                    content={withSign(extractStat(hit, statType))}
                                                                    subheader={statType.substring(0, 3).toUpperCase()}
                                                                />
                                                            </Responsive>
                                                            <Responsive minWidth={Responsive.onlyComputer.minWidth}>
                                                                <Header
                                                                    textAlign={'center'}
                                                                    content={withSign(extractStat(hit, statType))}
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
                                            composeUnitFeatures(hit).length > 0
                                                ? composeUnitFeatures(hit).map(
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
                                        saved={user && hit.saved && hit.saved.includes(user.uid)}
                                        disabled={!user}
                                        objectId={hit.objectID}
                                        saveFunc={saveUnitToUser}
                                        unsaveFunc={unsaveUnitFromUser}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                    )
                }
            </Grid>
        )));

const UnitSearchTab = ({ searchClient }) =>
    <Tab.Pane>
        <div className="ais-InstantSearch">
            <InstantSearch indexName={'units'} searchClient={searchClient}>
                <Panel>
                    <WarfareSearchBar />
                </Panel>
                <Divider hidden />
                <UnitHitsTwo />
            </InstantSearch>
        </div>
        <br />
    </Tab.Pane>;

export default UnitSearchTab;
