import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, Popup } from 'semantic-ui-react'

import { sortByField } from '../../common/utils/array/sortByField'
import { createUnitDropdownOptions } from '../../units/components/UnitDropdownResult'
import { createUnit, deleteUnit, updateUnitmakerUnit } from '../../units/store/unitsActions'
import { umLoadUnit, umReset } from '../store/unitmakerActions'

class UnitmakerButtonGroup extends Component {
    render() {
        const {
            user,
            units,
            loading,
            currentUnit,
            umLoadUnit,
            umReset,
            createUnit,
            updateUnitmakerUnit,
            deleteUnit,
        } = this.props

        const currentId = currentUnit.id

        console.log('current unit', currentUnit);
        console.log('current unit id', currentUnit.id)

        return (
            <Button.Group icon size={'large'}>
                <Dropdown
                    trigger={
                        <Popup
                            trigger={
                                <Button color={'blue'} icon={'file'} />
                            }
                            content={'Load unit'}
                            on={'hover'}
                        />
                    }
                    pointing
                    loading={loading}
                    value={''}
                    onChange={
                        (a, { value }) => {
                            umLoadUnit(value)
                        }
                    }
                    options={createUnitDropdownOptions(units)}
                    disabled={units.length === 0}
                />
                <Popup
                    trigger={
                        <Button
                            disabled={!user}
                            onClick={
                                !!currentId
                                    ? () => updateUnitmakerUnit(currentUnit.id)
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
                            disabled={!currentUnit.id}
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
                            onClick={() => { umReset(); return deleteUnit(currentUnit.id) }}
                            disabled={!currentUnit.id}
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
    user: state.auth.user,
    units: state.units.user.concat(state.units.saved).sort(sortByField('name')),
    currentUnit: state.unitmaker.active,
    currentId: state.unitmaker.activeId,
    loading: state.unitmaker.loading
});

export default connect(
    mapStateToProps,
    { createUnit, updateUnitmakerUnit, deleteUnit, umLoadUnit, umReset }
)(UnitmakerButtonGroup);
