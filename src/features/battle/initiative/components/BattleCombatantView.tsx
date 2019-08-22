import React, { useContext } from "react";

import { InitiativeContext } from "../pages/WarfareInitiative";
import { Header } from "semantic-ui-react";
import BattleCombatantCard from "./BattleCombatantCard";
import { oc } from "ts-optchain";

interface Props {}

const BattleCombatantView: React.FC<Props> = () => {
  const { state } = useContext(InitiativeContext);

  const battleUnit =
    state.combatant &&
    oc(state).armies[state.combatant.armyId].units[
      state.combatant.combatantBattleUnitId
    ]();

  if (!battleUnit) {
    return <Header>Select a Unit to view its Card</Header>;
  }

  return <BattleCombatantCard battleUnit={battleUnit} />;
};

export default BattleCombatantView;
