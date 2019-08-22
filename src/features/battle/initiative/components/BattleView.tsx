import React, { useContext, useState } from "react";
import BattleArmy from "./BattleArmy";
import { InitiativeContext } from "../pages/WarfareInitiative";
import { Button } from "semantic-ui-react";
import { useSaveArmy } from "../store/helpers";
import { useLocalStorageState } from "react-storage-hooks";
import { initiativeActions } from "../store/initiativeReducer";

interface Props {
  setManagementCollapsed(arg: boolean): void;
}

const BattleView: React.FC<Props> = ({ setManagementCollapsed }) => {
  const { state, dispatch } = useContext(InitiativeContext);

  const armiesInOrder = Object.values(state.armies).sort(
    (a, b) => b.initiative - a.initiative
  );

  const allInitiatives = armiesInOrder.map(army => army.initiative);

  const [turnCounter, setTurnCounter] = useLocalStorageState<
    number | undefined
  >("battle", undefined);
  const saveArmy = useSaveArmy();

  return (
    <>
      <div style={{ display: "flex", flex: "0 0", padding: "1rem" }}>
        <Button
          color="blue"
          onClick={() => {
            setTurnCounter(1);
            setManagementCollapsed(true);
          }}
          disabled={Object.values(state.armies).length < 2 || !!turnCounter}
        >
          Start Battle
        </Button>
        <Button
          color="blue"
          onClick={() =>
            setTurnCounter(
              turnCounter && turnCounter < allInitiatives.length
                ? turnCounter + 1
                : 1
            )
          }
          disabled={!turnCounter}
        >
          Next Turn
        </Button>
        <Button
          color="red"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            setTurnCounter(undefined);
            setManagementCollapsed(false);
            dispatch(initiativeActions.resetCombatant());
          }}
          disabled={!turnCounter}
        >
          End Battle
        </Button>
        <Button
          color="red"
          basic
          onClick={() => {
            Object.values(state.armies).forEach(army => saveArmy(army));
            setTurnCounter(undefined);
            setManagementCollapsed(false);
            dispatch(initiativeActions.resetCombatant());
          }}
          disabled={!turnCounter}
        >
          End Battle and Update
        </Button>
      </div>

      <div
        style={{
          overflow: "overlay",
          flex: "1 1 100%",
          padding: "1rem"
        }}
      >
        {turnCounter &&
          armiesInOrder.map(army => (
            <BattleArmy
              key={army.id}
              army={army}
              isMyTurn={allInitiatives[turnCounter - 1] === army.initiative}
            />
          ))}
      </div>
    </>
  );
};

export default BattleView;
