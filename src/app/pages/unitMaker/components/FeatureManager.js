import React, {PureComponent} from 'react';
import {Button, Form, Header, Segment, Table, TransitionablePortal} from "semantic-ui-react";
import {connect} from "react-redux";
import {composeUnitFeatures} from "../../../../utils/unitMakerUtils";
import {saveUmNestedField} from "../../../../store/actions/unitmaker";
import FeatureSearch from "./FeatureDropdown";

class FeatureManager extends PureComponent {
    render() {
        const {unit, features, saveUmNestedField} = this.props;

        const deleteFromFeatures = (aspect, id) =>
            () => saveUmNestedField(aspect, 'features', unit[aspect].features.filter(x => x.id !== id));

        const bigFunction = (result) => {
            debugger;
        };

        return (
            <Segment>
                <Table basic={'very'} unstackable compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Feature</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Source</Table.HeaderCell>
                            <Table.HeaderCell>Cost</Table.HeaderCell>
                            <Table.HeaderCell/>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            features.map(
                                feature =>
                                    <Table.Row key={feature.name}>
                                        <Table.Cell>{feature.name}</Table.Cell>
                                        <Table.Cell>{feature.type}</Table.Cell>
                                        <Table.Cell>{feature.source}</Table.Cell>
                                        <Table.Cell>{feature.cost}</Table.Cell>
                                        <Table.Cell collapsing>
                                            <Button circular negative icon={'minus'} size={'mini'}
                                                    onClick={deleteFromFeatures(feature.source, feature.id)}/>
                                        </Table.Cell>
                                    </Table.Row>
                            )
                        }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan={4} textAlign={'right'}>
                                <FeatureSearch onSearchSelect={bigFunction}/>
                                <TransitionablePortal
                                    transition={{animation: 'fly left', duration: 300}}
                                    closeOnTriggerClick openOnTriggerClick
                                    trigger={<Button positive content={'Add Custom'}/>}
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
            </Segment>
        );
    }
}

const mapStateToProps = (state) => ({
    unit: state.unitmaker.active,
    features: composeUnitFeatures(state.unitmaker.active)
});

export default connect(
    mapStateToProps,
    {saveUmNestedField}
)(FeatureManager);
