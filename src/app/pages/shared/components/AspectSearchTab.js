import React from 'react';
import {connectHits, InstantSearch, Panel, SearchBox} from "react-instantsearch-dom";
import {Button, Card, Divider, Header, Icon, Tab, Table} from "semantic-ui-react";
import WarfareRefinementList from "./WarfareRefinementList";
import {UNIT_STAT_TYPES, withSign} from "../../../../utils/unitMakerUtils";
import {connect} from "react-redux";

const AspectHits =
    connect(
        state => ({user: state.user}),
        {}
    )(connectHits(
        ({hits, user}) =>
            <Card.Group centered itemsPerRow={4} doubling>
                {
                    hits.map(
                        hit =>
                            <Card key={hit.objectId}>
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
                                                            <Table.Cell textAlign={'right'}
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
                                <Button
                                    attached={'bottom'}
                                    basic>
                                    <Icon
                                        fitted
                                        size={'large'}
                                        name={'heart ' + (user && (hit.saved.includes(user.uid)) ? '' : 'outline')}
                                        color={'pink'}/>
                                </Button>
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

export default connect(null, null
)(AspectSearchTab);
