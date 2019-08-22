import React, { useContext } from "react";
import { Label, Checkbox, Popup } from "semantic-ui-react";
import { BattleUnit } from "../../battleTypes";
import { InitiativeContext } from "../pages/WarfareInitiative";
import { initiativeActions } from "../store/initiativeReducer";
interface OwnProps {
  battleUnit: BattleUnit;
}

interface StateProps {}

const labelStyle = { padding: "0.5em" };

const BattleUnitStatuses: React.FC<OwnProps & StateProps> = ({
  battleUnit: { id, armyId, isDiminished, isExhausted, engagedWith }
}) => {
  const { dispatch } = useContext(InitiativeContext);

  const setEngagedWith = (value: boolean) => {
    dispatch(
      initiativeActions.setBattleUnitEngagedWith({
        armyId: armyId,
        battleUnitId: id,
        engagedWith: value
      })
    );
  };

  const setIsDiminished = (value: boolean) => {
    dispatch(
      initiativeActions.setBattleUnitDiminished({
        armyId: armyId,
        battleUnitId: id,
        isDiminished: value
      })
    );
  };

  const setIsExhausted = (value: boolean) => {
    dispatch(
      initiativeActions.setBattleUnitExhausted({
        armyId: armyId,
        battleUnitId: id,
        isExhausted: value
      })
    );
  };

  return (
    <Label.Group style={{ marginTop: "1em" }}>
      <Popup
        content="Engaged"
        on={"hover"}
        position="top center"
        trigger={
          <Label
            color="yellow"
            size="large"
            basic
            style={labelStyle}
            onClick={() => setEngagedWith(!engagedWith)}
          >
            <Checkbox
              checked={engagedWith}
              fitted
              onChange={(e, { checked }) => setEngagedWith(!!checked)}
              label="⚔️"
            />
          </Label>
        }
      />

      <Popup
        content="Diminished"
        on={"hover"}
        position="top center"
        trigger={
          <Label
            color="orange"
            size="large"
            basic
            style={labelStyle}
            onClick={() => setIsDiminished(!isDiminished)}
          >
            <Checkbox
              checked={isDiminished}
              fitted
              onChange={(e, { checked }) => setIsDiminished(!!checked)}
              label="🤕"
            />
          </Label>
        }
      />

      <Popup
        content="Exhausted"
        on={"hover"}
        position="top center"
        trigger={
          <Label
            color="blue"
            size="large"
            basic
            style={labelStyle}
            onClick={() => setIsExhausted(!isExhausted)}
          >
            <Checkbox
              checked={isExhausted}
              fitted
              onChange={(e, { checked }) => setIsExhausted(!!checked)}
              label="😪"
            />
          </Label>
        }
      />
    </Label.Group>
  );
};

export default BattleUnitStatuses;
