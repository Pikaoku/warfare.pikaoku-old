import React from 'react';
import {Card, Divider, Header, Tab} from "semantic-ui-react";
import {connectHits, InstantSearch, Panel, SearchBox} from "react-instantsearch-dom";
import {connect} from 'react-redux';
import SaveButton from "../../../components/searching/SaveButton";
import {
    calculateUnitCost,
    composeUnitFeatures,
    stringifyUnitObjectStats
} from "../../../../store/unitmaker/unitmakerUtils";
import {saveUnitToUser, unsaveUnitFromUser} from "../../../../store/data/dataActions";

const UnitHits =
    connect(
        state => ({user: state.user}),
        {saveUnitToUser, unsaveUnitFromUser}
    )(connectHits(
        ({hits, user, saveUnitToUser, unsaveUnitFromUser}) => (
            <Card.Group centered stacking>
                {
                    hits.map(
                        hit =>
                            <Card key={hit.objectID}>
                                <Card.Content>
                                    <Header textAlign={'center'} size={'medium'} color={'blue'}>
                                        {hit.name}
                                        <Header.Subheader>
                                            {hit.authorId ? 'by ' : 'from '} <b>{hit.author}</b>
                                        </Header.Subheader>
                                    </Header>
                                </Card.Content>
                                <Card.Content>
                                    <div><b>Stats: </b> {stringifyUnitObjectStats(hit)}</div>
                                    <div><b>Size: </b> {'d' + hit.size}</div>
                                    <div><b>Cost: </b> {calculateUnitCost(hit, composeUnitFeatures(hit))}</div>
                                    <div><b>Ancestry: </b> {hit.ancestry.name}</div>
                                    <div><b>Experience: </b> {hit.equipment.name}</div>
                                    <div><b>Equipment: </b> {hit.experience.name}</div>
                                    <div><b>Type: </b> {hit.type.name}</div>
                                </Card.Content>
                                <Card.Content>
                                    <SaveButton
                                        saved={user && hit.saved && hit.saved.includes(user.uid)}
                                        disabled={!user}
                                        objectId={hit.objectID}
                                        saveFunc={saveUnitToUser}
                                        unsaveFunc={unsaveUnitFromUser}
                                    />
                                </Card.Content>
                            </Card>
                    )
                }
            </Card.Group>
        )
    ));

const UnitSearchTab = ({searchClient}) =>
    <Tab.Pane>
        <div className="ais-InstantSearch">
            <InstantSearch indexName={'units'} searchClient={searchClient}>
                <Panel>
                    <SearchBox/>
                </Panel>
                <Divider hidden/>
                <UnitHits/>
            </InstantSearch>
        </div>
        <br/>
    </Tab.Pane>;

export default UnitSearchTab;
