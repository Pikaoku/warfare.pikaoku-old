import React from "react";
import { connect } from "react-redux";
import { Button, Grid, Header, Popup, Label } from "semantic-ui-react";

import { BattleUnit } from "../../battleTypes";
import { GenericUnit } from "../../../units/unitTypes";
import UnitStats from "./UnitStats";

interface OwnProps {
  battleUnit: BattleUnit;
  removeAction(): void;
}

interface StateProps {
  genericUnit?: GenericUnit;
}

const BattleArmyManagementUnitSummary: React.FC<OwnProps & StateProps> = ({
  genericUnit,
  removeAction
}) => {
  if (!genericUnit) {
    return null;
  }

  const { ancestry, experience, equipment, type, size, name } = genericUnit;

  return (
    <Grid.Row columns="equal" verticalAlign="middle">
      <Grid.Column width={12}>
        <Popup
          on={"hover"}
          trigger={
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
          }
        >
          <UnitStats genericUnit={genericUnit} />
        </Popup>
      </Grid.Column>
      <Grid.Column textAlign="center" verticalAlign="middle">
        <Popup
          content="Remove Unit from Army"
          on={"hover"}
          position="right center"
          trigger={
            <Button
              onClick={removeAction}
              floated="right"
              basic
              color="red"
              icon="remove"
              size="mini"
            />
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
)(BattleArmyManagementUnitSummary);
