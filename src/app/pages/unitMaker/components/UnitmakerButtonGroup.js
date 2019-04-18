import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Dropdown, Popup} from "semantic-ui-react";
import {SAVED, UNITS, USER} from "../../../../store/reducer";
import {sortByField} from "../../../../utils/unitMakerUtils";
import {createUnitDropdownOptions} from "../../../components/searching/UnitDropdownResult";
import {addUnit, deleteUnit, updateUnit} from "../../../../store/actions/firestore";
import {umLoadUnit, umReset} from "../../../../store/actions/unitmaker";

class UnitmakerButtonGroup extends Component {
    render() {
        const {
            user,
            units,
            loading,
            currentId,
            currentUnit,
            umLoadUnit,
            umReset,
            addUnit,
            updateUnit,
            deleteUnit,
        } = this.props;

        return (
            <Button.Group icon size={'large'}>
                <Dropdown
                    trigger={
                        <Popup
                            trigger={
                                <Button color={'blue'} icon={'file'}/>
                            }
                            content={'Load unit'}
                            on={'hover'}
                        />
                    }
                    pointing
                    loading={loading}
                    onChange={(a, {value}) => umLoadUnit(value)}
                    options={createUnitDropdownOptions(units)}
                />
                <Popup
                    trigger={
                        <Button
                            disabled={
                                (currentId !== false) && (currentUnit.authorId !== user.uid)
                            }
                            onClick={
                                !!currentId
                                    ? updateUnit
                                    : addUnit
                            }
                            icon={'save'}
                            loading={loading}
                            color={'green'}
                        />
                    }
                    content={'Save unit'}
                    on={'hover'}
                />
                <Popup
                    trigger={
                        <Button
                            icon={'copy'}
                            color={'yellow'}
                            onClick={addUnit}
                            disabled={!currentId}
                            loading={loading}
                        />
                    }
                    content={'Save as a new unit'}
                    on={'hover'}
                />
                <Popup
                    trigger={
                        <Button
                            icon={'repeat'}
                            color={'orange'}
                            loading={loading}
                            onClick={umReset}
                        />
                    }
                    content={'Reset all changes'}
                    on={'hover'}
                />
                <Popup
                    trigger={
                        <Button
                            icon={'delete'}
                            color={'red'}
                            onClick={() => deleteUnit(currentId)}
                            disabled={!currentId}
                            loading={loading}
                        />
                    }
                    content={'Delete current unit'}
                    on={'hover'}
                />
            </Button.Group>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    units: state[UNITS][USER].concat(state[UNITS][SAVED]).sort(sortByField('name')),
    currentUnit: state.unitmaker.active,
    currentId: state.unitmaker.id,
    loading: state.unitmaker.loading
});

export default connect(
    mapStateToProps,
    {addUnit, updateUnit, deleteUnit, umLoadUnit, umReset}
)(UnitmakerButtonGroup);
