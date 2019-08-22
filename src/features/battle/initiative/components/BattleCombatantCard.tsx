import React, { useState, useContext } from "react";
import { Button, Input, Label, Checkbox, Card } from "semantic-ui-react";
import { BattleUnit } from "../../battleTypes";
import SafUnitCardCondensed from "../../../cards/safCondensed/SafUnitCardCondensed";
import {
  extractStat,
  composeUnitFeatures
} from "../../../unitmaker/store/unitmakerUtils";
import { InitiativeContext } from "../pages/WarfareInitiative";
import { GenericUnit } from "../../../units/unitTypes";
import BattleUnitCurrentHealth from "./BattleUnitCurrentHealth";
import BattleUnitStatuses from "./BattleUnitStatuses";
import { connect } from "react-redux";
interface OwnProps {
  battleUnit: BattleUnit;
}

interface StateProps {
  genericUnit?: GenericUnit;
}

const BattleUnitCard: React.FC<OwnProps & StateProps> = ({
  genericUnit,
  battleUnit
}) => {
  if (!genericUnit) {
    return null;
  }

  return (
    <Card style={{ opacity: battleUnit.currentHealth === 0 ? "0.25" : "1" }}>
      <div style={{ flex: 1, display: "flex" }}>
        <SafUnitCardCondensed unit={genericUnit} showCredit={false} />
      </div>
      <Card.Content>
        <BattleUnitCurrentHealth battleUnit={battleUnit} />
        <BattleUnitStatuses battleUnit={battleUnit} />
      </Card.Content>
    </Card>
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
)(BattleUnitCard);
