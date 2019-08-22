import React, { useEffect, useContext } from "react";
import {
  Grid,
  Header,
  Segment,
  SegmentGroup,
  Label,
  Popup,
  Button
} from "semantic-ui-react";
import { WarfareBattleArmy } from "../../battleTypes";
import BattleArmyUnitSummary from "./BattleArmyUnitSummary";

import { useSaveArmy } from "../store/helpers";
import { InitiativeContext } from "../pages/WarfareInitiative";
import { initiativeActions } from "../store/initiativeReducer";

interface Props {
  army: WarfareBattleArmy;
  isMyTurn: boolean;
}

const BattleArmy: React.FC<Props> = ({ army, isMyTurn }) => {
  const { dispatch } = useContext(InitiativeContext);
  const { name, initiative, units } = army;
  const saveArmy = useSaveArmy();

  // When isMyTurn toggles, check if all army units are exhausted, if so, refresh them all
  useEffect(() => {
    if (isMyTurn && Object.values(units).every(unit => unit.isExhausted)) {
      Object.keys(units).forEach(battleUnitId =>
        dispatch(
          initiativeActions.setBattleUnitExhausted({
            armyId: army.id,
            battleUnitId,
            isExhausted: false
          })
        )
      );
    }
  }, [isMyTurn]);

  return (
    <SegmentGroup>
      <Segment>
        {isMyTurn && (
          <Label
            ribbon
            color="red"
            style={{
              left: "-1.2em",
              top: "-1em",
              position: "absolute"
            }}
          >
            Current Combatant
          </Label>
        )}
        <Grid verticalAlign="middle">
          <Grid.Column width={4}>
            <Header as="h3">Initiative: {initiative}</Header>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h3">{name}</Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <Popup
              content={`${army.created ? "Update" : "Save"} Army`}
              position="right center"
              on={"hover"}
              trigger={
                <Button
                  onClick={() => {
                    saveArmy(army);
                  }}
                  style={{ marginLeft: 10 }}
                  color="blue"
                  icon={army.created ? "sync" : "cloud upload"}
                />
              }
            />
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          {Object.values(units).map(battleUnit => (
            <BattleArmyUnitSummary
              key={battleUnit.id}
              battleUnit={battleUnit}
            />
          ))}
        </Grid>
      </Segment>
    </SegmentGroup>
  );
};

export default BattleArmy;
