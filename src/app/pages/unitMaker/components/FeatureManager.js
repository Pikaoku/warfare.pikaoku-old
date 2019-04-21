import React, {PureComponent} from 'react';
import {Button, Segment, Table} from "semantic-ui-react";
import {connect} from "react-redux";
import {composeUnitFeatures} from "../../../../store/unitmaker/unitmakerUtils";
import {saveUmNestedField, umAddFeature} from "../../../../store/unitmaker/unitmakerActions";
import FeatureDropdown from "./FeatureDropdown";
import AddCustomFeaturePopup from "./AddCustomFeaturePopup";
import {UNITMAKER} from "../../../../store/reducer";
import {UNITMAKER_ACTIVE} from "../../../../store/unitmaker/unitmakerReducer";

class FeatureManager extends PureComponent {
    render() {
        const {unit, features, saveUmNestedField} = this.props;

        const deleteFromFeatures = (aspect, name) =>
            () => saveUmNestedField(aspect, 'features', unit[aspect].features.filter(x => x.name !== name));

        return (
            <Segment>
                <Table basic={'very'} unstackable compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={6}>Feature</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Type</Table.HeaderCell>
                            <Table.HeaderCell width={5}>Source</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Cost</Table.HeaderCell>
                            <Table.HeaderCell width={1}/>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            features.map(
                                feature =>
                                    <Table.Row key={feature.name || feature.effect}>
                                        <Table.Cell>{feature.name}</Table.Cell>
                                        <Table.Cell>{feature.type}</Table.Cell>
                                        <Table.Cell>{feature.source}</Table.Cell>
                                        <Table.Cell>{feature.cost}</Table.Cell>
                                        <Table.Cell collapsing>
                                            <Button circular negative icon={'minus'} size={'mini'}
                                                    onClick={deleteFromFeatures(feature.source, feature.name)}/>
                                        </Table.Cell>
                                    </Table.Row>
                            )
                        }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan={16} textAlign={'right'}>
                                <FeatureDropdown/>
                                <AddCustomFeaturePopup/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Segment>
        );
    }
}

const mapStateToProps = (state) => ({
    unit: state[UNITMAKER][UNITMAKER_ACTIVE],
    features: composeUnitFeatures(state[UNITMAKER][UNITMAKER_ACTIVE])
});

export default connect(
    mapStateToProps,
    {saveUmNestedField, umAddFeature}
)(FeatureManager);
