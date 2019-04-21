import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Dropdown, Popup} from "semantic-ui-react";
import {AUTH, DATA, UNITMAKER} from "../../../../store/reducer";
import {sortByField} from "../../../../store/unitmaker/unitmakerUtils";
import {createUnitDropdownOptions} from "../../../components/searching/UnitDropdownResult";
import {umLoadUnit, umReset} from "../../../../store/unitmaker/unitmakerActions";
import {createUnit, deleteUnit, updateUnitmakerUnit} from "../../../../store/data/dataActions";
import {AUTH_USER} from "../../../../store/auth/authReducer";
import {UNITMAKER_ACTIVE, UNITMAKER_ACTIVE_ID, UNITMAKER_LOADING} from "../../../../store/unitmaker/unitmakerReducer";
import {SAVED, UNITS, USER} from "../../../../store/data/dataReducer";

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
            createUnit,
            updateUnitmakerUnit,
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
                    value={''}
                    onChange={
                        (a, {value}) => {
                            umLoadUnit(value)
                        }
                    }
                    options={createUnitDropdownOptions(units)}
                    disabled={units.length === 0}
                />
                <Popup
                    trigger={
                        <Button
                            disabled={
                                !user ||
                                ((currentId !== false) && (currentUnit.authorId !== user.uid))
                            }
                            onClick={
                                !!currentId
                                    ? () => updateUnitmakerUnit(currentId,)
                                    : createUnit
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
                            onClick={createUnit}
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
    user: state[AUTH][AUTH_USER],
    units: state[DATA][UNITS][USER].concat(state[DATA][UNITS][SAVED]).sort(sortByField('name')),
    currentUnit: state[UNITMAKER][UNITMAKER_ACTIVE],
    currentId: state[UNITMAKER][UNITMAKER_ACTIVE_ID],
    loading: state[UNITMAKER][UNITMAKER_LOADING]
});

export default connect(
    mapStateToProps,
    {createUnit, updateUnitmakerUnit, deleteUnit, umLoadUnit, umReset}
)(UnitmakerButtonGroup);
