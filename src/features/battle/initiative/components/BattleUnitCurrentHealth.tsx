import React, { useContext } from "react";
import { Button, Input, Label } from "semantic-ui-react";
import { BattleUnit } from "../../battleTypes";
import { InitiativeContext } from "../pages/WarfareInitiative";
import { GenericUnit, Size } from "../../../units/unitTypes";
import { connect } from "react-redux";
import { initiativeActions } from "../store/initiativeReducer";
interface OwnProps {
  battleUnit: BattleUnit;
}

interface StateProps {
  size: Size;
}

const BattleUnitCurrentHealth: React.FC<OwnProps & StateProps> = ({
  battleUnit,
  size
}) => {
  const { dispatch } = useContext(InitiativeContext);

  const currentHealth = battleUnit.currentHealth;

  const setCurrentHealth = (value: number) => {
    if (size / 2 >= value) {
      dispatch(
        initiativeActions.setBattleUnitDiminished({
          armyId: battleUnit.armyId,
          battleUnitId: battleUnit.id,
          isDiminished: true
        })
      );
    }
    if (size / 2 < value) {
      dispatch(
        initiativeActions.setBattleUnitDiminished({
          armyId: battleUnit.armyId,
          battleUnitId: battleUnit.id,
          isDiminished: false
        })
      );
    }
    dispatch(
      initiativeActions.setBattleUnitHealth({
        armyId: battleUnit.armyId,
        battleUnitId: battleUnit.id,
        value
      })
    );
  };

  return (
    <Input
      action
      fluid
      transparent
      type="number"
      step={1}
      labelPosition="right"
      max={size}
      value={currentHealth}
      onChange={(e, { value }) => setCurrentHealth(Number(value))}
    >
      <Button
        size="mini"
        color="green"
        onClick={() => {
          setCurrentHealth(currentHealth + 1);
        }}
        attached="left"
        disabled={!(currentHealth < size)}
        icon="plus"
      />
      <input style={{ minWidth: 50, textAlign: "center" }} />
      <Label>/ {size}</Label>
      <Button
        size="mini"
        color="red"
        attached="right"
        disabled={!(currentHealth > 0)}
        onClick={() => setCurrentHealth(currentHealth - 1)}
        icon="minus"
      />
    </Input>
  );
};

// export default BattleUnitCurrentHealth;

export default connect<StateProps, {}, OwnProps, any>(
  (state, { battleUnit }) => {
    const allUnits = state.units.user.concat(
      state.units.saved
    ) as GenericUnit[];

    const genericUnit = allUnits.find(units => units.id === battleUnit.unitId);

    return {
      size: !!genericUnit ? genericUnit.size : 0
    };
  }
)(BattleUnitCurrentHealth);
