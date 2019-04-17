import React from 'react';
import {connectHits, InstantSearch, Panel, SearchBox} from "react-instantsearch-dom";
import {Card, Divider, Header, Tab, Table} from "semantic-ui-react";
import WarfareRefinementList from "./WarfareRefinementList";
import {UNIT_STAT_TYPES, withSign} from "../../../../utils/unitMakerUtils";
import {connect} from "react-redux";
import {saveAspectToUser, unsaveAspectFromUser} from "../../../../store/actions/firestore";
import {ASPECTS, SAVED} from "../../../../store/reducer";
import SaveButton from "../../../components/searching/SaveButton";


const AspectHits =
    connect(
        state => ({user: state.user, saved: state[ASPECTS][SAVED]}),
        {saveAspectToUser, unsaveAspectFromUser}
    )(connectHits(
        ({hits, user, saveAspectToUser, unsaveAspectFromUser}) =>
            <Card.Group centered itemsPerRow={4} doubling>
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
                                        </Table.Body>
                                    </Table>
                                </Card.Content>
                                <SaveButton
                                    saved={hit.saved.includes(user.uid)}
                                    objectId={hit.objectID}
                                    saveFunc={saveAspectToUser}
                                    unsaveFunc={unsaveAspectFromUser}
                                />
                            </Card>
                    )
                }
            </Card.Group>
    ));

const AspectSearchTab = ({searchClient, user}) => (
    <Tab.Pane>
        <div className="ais-InstantSearch">
            <InstantSearch indexName={'aspects'} searchClient={searchClient}>
                <Panel>
                    <SearchBox/>
                    <WarfareRefinementList attribute={'type'}/>
                </Panel>
                <Divider hidden/>
                <AspectHits user={user}/>
            </InstantSearch>
        </div>
        <br/>
    </Tab.Pane>
);

export default connect(
    null,
    null
)(AspectSearchTab);
