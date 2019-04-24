import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Grid, List, Segment, Table} from "semantic-ui-react";

class RulesDisplaySimple extends Component {
    state = {
        leviesOnField: true,
        infantryOnField: true,
        archersOnField: true,
        cavalryOnField: true,
    };

    render() {
        const {leviesOnField, infantryOnField, archersOnField, cavalryOnField} = this.state;

        const toggleBool = (field) => ({target}) => this.setState({[field]: !this.state[field]});

        return (
            <Grid textAlign={'center'}>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Segment.Group>
                            {/*<Segment content={'Overview'} size={'huge'}/>*/}
                            <Segment textAlign={'center'} size={'massive'}>
                                Coming Soon!
                            </Segment>
                        </Segment.Group>
                        <Segment.Group>
                            <Segment content={'Who Can Attack Who'} size={'huge'}/>
                            <Segment textAlign={'center'}>
                                <Form>
                                    <Form.Checkbox
                                        toggle
                                        label={'Are enemy levies on the field?'}
                                        checked={leviesOnField}
                                        onChange={toggleBool('leviesOnField')}
                                    />
                                    <Form.Checkbox
                                        toggle
                                        label={'Is enemy infantry on the field?'}
                                        checked={infantryOnField}
                                        onChange={toggleBool('infantryOnField')}
                                    />
                                    <Form.Checkbox
                                        toggle
                                        label={'Are enemy archers on the field?'}
                                        checked={archersOnField}
                                        onChange={toggleBool('archersOnField')}
                                    />
                                    <Form.Checkbox
                                        toggle
                                        label={'Is enemy cavalry on the field?'}
                                        checked={cavalryOnField}
                                        onChange={toggleBool('cavalryOnField')}
                                    />
                                </Form>
                            </Segment>
                            <Segment textAlign={'center'} style={{padding: 0}}>
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Unit Type</Table.HeaderCell>
                                            <Table.HeaderCell>Can Attack</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Levies</Table.Cell>
                                            <Table.Cell>
                                                <List>
                                                    {
                                                        leviesOnField &&
                                                        <List.Item>Levies</List.Item>
                                                    }
                                                    {
                                                        !leviesOnField && infantryOnField &&
                                                        <List.Item>Infantry</List.Item>
                                                    }
                                                    {
                                                        !leviesOnField && !infantryOnField &&
                                                        <List.Item>Archers</List.Item>
                                                    }
                                                    {
                                                        !leviesOnField && !infantryOnField &&
                                                        !archersOnField && !cavalryOnField &&
                                                        <List.Item>Siege Engine</List.Item>
                                                    }
                                                </List>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Infantry</Table.Cell>
                                            <Table.Cell>
                                                <List>
                                                    {
                                                        leviesOnField &&
                                                        <List.Item>Levies</List.Item>
                                                    }
                                                    {
                                                        !leviesOnField && infantryOnField &&
                                                        <List.Item>Infantry</List.Item>
                                                    }
                                                    {
                                                        !leviesOnField && !infantryOnField &&
                                                        <List.Item>Archers</List.Item>
                                                    }
                                                    {
                                                        !leviesOnField && !infantryOnField &&
                                                        !archersOnField && !cavalryOnField &&
                                                        <List.Item>Siege Engine</List.Item>
                                                    }
                                                </List>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Archers</Table.Cell>
                                            <Table.Cell>
                                                <List>
                                                    <List.Item>Levies</List.Item>
                                                    <List.Item>Infantry</List.Item>
                                                    <List.Item>Cavalry (with disadvantage)</List.Item>
                                                    <List.Item>Flying</List.Item>
                                                    {
                                                        !leviesOnField && !infantryOnField &&
                                                        !archersOnField && !cavalryOnField &&
                                                        <List.Item>Siege Engine</List.Item>
                                                    }
                                                </List>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Cavalry</Table.Cell>
                                            <Table.Cell>
                                                <List>
                                                    <List.Item>Levies</List.Item>
                                                    <List.Item>Infantry</List.Item>
                                                    <List.Item>Archers</List.Item>
                                                    <List.Item>Cavalry</List.Item>
                                                    {
                                                        !leviesOnField && !infantryOnField &&
                                                        !archersOnField && !cavalryOnField &&
                                                        <List.Item>Siege Engine</List.Item>
                                                    }
                                                </List>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Flying</Table.Cell>
                                            <Table.Cell>
                                                <List>
                                                    <List.Item>Levies</List.Item>
                                                    <List.Item>Infantry</List.Item>
                                                    <List.Item>Archers</List.Item>
                                                    <List.Item>Cavalry</List.Item>
                                                    <List.Item>Siege Engine</List.Item>
                                                </List>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Siege Engine</Table.Cell>
                                            <Table.Cell>
                                                <List>
                                                    <List.Item>Levies</List.Item>
                                                    <List.Item>Infantry</List.Item>
                                                    <List.Item>Archers</List.Item>
                                                    <List.Item>Cavalry</List.Item>
                                                    <List.Item>Fortification</List.Item>
                                                    {
                                                        !leviesOnField && !infantryOnField &&
                                                        !archersOnField && !cavalryOnField &&
                                                        <List.Item>Siege Engine</List.Item>
                                                    }                                                </List>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(RulesDisplaySimple);
