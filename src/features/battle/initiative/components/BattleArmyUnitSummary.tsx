import React, { useContext } from "react";
import { connect } from "react-redux";
import { Button, Grid, Header, Label } from "semantic-ui-react";

import { BattleUnit } from "../../battleTypes";
import { GenericUnit, Type } from "../../../units/unitTypes";
import { InitiativeContext } from "../pages/WarfareInitiative";
import { initiativeActions } from "../store/initiativeReducer";
import BattleUnitStatuses from "./BattleUnitStatuses";
import BattleUnitCurrentHealth from "./BattleUnitCurrentHealth";
import UnitStats from "./UnitStats";

interface OwnProps {
  battleUnit: BattleUnit;
}

interface StateProps {
  genericUnit?: GenericUnit;
}

const BattleArmyUnitSummary: React.FC<OwnProps & StateProps> = ({
  genericUnit,
  battleUnit
}) => {
  if (!genericUnit) {
    return null;
  }
  const { dispatch } = useContext(InitiativeContext);

  const { ancestry, experience, equipment, type, size, name } = genericUnit;

  return (
    <Grid.Row verticalAlign="middle">
      <Grid.Column width={4}>
        <Header as="h3">
          <Header.Content>
            {name
              ? name
              : `${ancestry.name} ${experience.name} ${equipment.name} ${
                  type.name
                }`}{" "}
            <Label horizontal>d{size}</Label>
            {name && (
              <Header.Subheader>
                {`${ancestry.name} ${experience.name} ${equipment.name} ${
                  type.name
                }`}
              </Header.Subheader>
            )}
          </Header.Content>
        </Header>
      </Grid.Column>
      <Grid.Column width={4} textAlign="center" verticalAlign="middle">
        <UnitStats genericUnit={genericUnit} />
      </Grid.Column>
      <Grid.Column width={5}>
        <BattleUnitCurrentHealth battleUnit={battleUnit} />
        <BattleUnitStatuses battleUnit={battleUnit} />
      </Grid.Column>

      <Grid.Column width={3} textAlign="center" verticalAlign="middle">
        <Button
          icon={"eye"}
          onClick={() =>
            dispatch(
              initiativeActions.addCombatant({
                armyId: battleUnit.armyId,
                combatantBattleUnitId: battleUnit.id
              })
            )
          }
        />
      </Grid.Column>
    </Grid.Row>
  );
};

export default connect<StateProps, {}, OwnProps, any>(
  (state, { battleUnit }) => {
    const allUnits = state.units.user.concat(
      state.units.saved
    ) as GenericUnit[];
    return {
      genericUnit: allUnits.find(units => units.id === battleUnit.unitId)
    };
  }
)(BattleArmyUnitSummary);
