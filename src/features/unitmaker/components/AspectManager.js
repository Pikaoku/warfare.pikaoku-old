import React from 'react';
import {Button, Form, Popup, Segment, Statistic, Table} from "semantic-ui-react";
import AspectDropdown from "./AspectDropdown";
import {connect} from "react-redux";
import {saveUmNestedField} from "../store/unitmakerActions";
import {ASPECT_TYPES, blurOnKeyDown, stringifyObjectStats} from "../store/unitmakerUtils";
import {UNITMAKER} from "../../../reducer";
import {UNITMAKER_ACTIVE} from "../store/unitmakerReducer";

const AspectManager = ({saveUmNestedField, unit}) => (
    <Segment>
        <Table unstackable basic={'very'}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={2}>Aspect</Table.HeaderCell>
                    <Table.HeaderCell width={6}>Type</Table.HeaderCell>
                    <Table.HeaderCell width={7}>Custom Name</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Stats</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    ASPECT_TYPES.map(aspectType => (
                        <Table.Row key={aspectType}>
                            <Table.Cell className={'capitalize'}>{aspectType}</Table.Cell>
                            <Table.Cell><AspectDropdown aspect={aspectType}/></Table.Cell>
                            <Table.Cell>
                                <Form>
                                    <Form.Input
                                        onBlur={
                                            ({target: {value}}) =>
                                                value !== '' ? saveUmNestedField(aspectType, 'name', value) : true
                                        }
                                        onKeyDown={blurOnKeyDown}
                                        fluid placeholder={'custom name'}/>
                                </Form>
                            </Table.Cell>
                            <Table.Cell>
                                <Popup
                                    position={'bottom center'}
                                    trigger={<Button color={'yellow'} icon={'angle down'}
                                                     size={'mini'}/>}
                                    content={
                                        <Statistic
                                            size={'mini'}
                                            value={stringifyObjectStats(unit[aspectType])}
                                            label={'A/P/D/T/M'}
                                        />
                                    }
                                    on={'hover'}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>
    </Segment>
);

export default connect(
    (state) => ({
        unit: state[UNITMAKER][UNITMAKER_ACTIVE]
    }),
    {saveUmNestedField}
)(AspectManager);
