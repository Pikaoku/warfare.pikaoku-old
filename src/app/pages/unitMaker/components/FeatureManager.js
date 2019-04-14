import React, {Component} from 'react';
import {Button, Container, Form, Header, Segment, Table, TransitionablePortal} from "semantic-ui-react";
import {connect} from "react-redux";

class FeatureManager extends Component {
    render() {
        return (
            <Container fluid>
                <Table basic={'very'} unstackable compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Trait</Table.HeaderCell>
                            <Table.HeaderCell>Source</Table.HeaderCell>
                            <Table.HeaderCell>Cost</Table.HeaderCell>
                            <Table.HeaderCell/>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Ravage</Table.Cell>
                            <Table.Cell>Ancestry</Table.Cell>
                            <Table.Cell>60</Table.Cell>
                            <Table.Cell collapsing><Button circular icon={'minus'} negative size={'mini'}/></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Ravage</Table.Cell>
                            <Table.Cell>Ancestry</Table.Cell>
                            <Table.Cell>60</Table.Cell>
                            <Table.Cell collapsing><Button circular icon={'minus'} negative size={'mini'}/></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Ravage</Table.Cell>
                            <Table.Cell>Ancestry</Table.Cell>
                            <Table.Cell>60</Table.Cell>
                            <Table.Cell collapsing><Button circular icon={'minus'} negative size={'mini'}/></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Ravage</Table.Cell>
                            <Table.Cell>Ancestry</Table.Cell>
                            <Table.Cell>60</Table.Cell>
                            <Table.Cell collapsing><Button circular icon={'minus'} negative size={'mini'}/></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan={4} textAlign={'right'}>
                                <Button positive content={'Add'} icon={'plus'} attached={'left'} labelPosition='left'/>
                                <TransitionablePortal
                                    transition={{animation: 'fly left', duration: 300}}
                                    closeOnTriggerClick openOnTriggerClick
                                    trigger={<Button positive content={'Add Custom'} attached={'right'}/>}
                                >
                                    <Segment textAlign={'center'} className={'modal'} raised
                                             style={{maxWidth: '250px'}}>
                                        <Header content={'Custom Feature'} size={'large'}/>
                                        <Form>
                                            <Form.Input fluid placeholder={'Name'}/>
                                            <Form.Field control={'textarea'} rows={2} placeholder={'Description'}/>
                                            <Form.Input fluid placeholder={'Cost'} type={'number'} step={'1'}/>
                                            <Form.Button fluid content={'Add'} positive/>
                                        </Form>
                                    </Segment>
                                </TransitionablePortal>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(FeatureManager);
