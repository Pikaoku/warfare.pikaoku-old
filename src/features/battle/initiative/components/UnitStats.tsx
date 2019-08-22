import React from "react";
import { connect } from "react-redux";
import { Statistic } from "semantic-ui-react";

import { extractStat } from "../../../unitmaker/store/unitmakerUtils";
import { GenericUnit } from "../../../units/unitTypes";

interface OwnProps {
  genericUnit: GenericUnit;
}

interface StateProps {
  baseDefense: number;
  baseToughness: number;
}

const UnitStats: React.FC<OwnProps & StateProps> = ({
  genericUnit,
  baseDefense,
  baseToughness
}) => {
  const attack = extractStat(genericUnit, "attack");
  const power = extractStat(genericUnit, "power");
  const defense = extractStat(genericUnit, "defense") + baseDefense;
  const toughness = extractStat(genericUnit, "toughness") + baseToughness;
  const morale = extractStat(genericUnit, "morale");

  const renderStat = (stat: number) => `${stat >= 0 ? "+" : ""}${stat}`;

  return (
    <Statistic
      style={{ margin: 0 }}
      size={"mini"}
      value={`${renderStat(attack)} / ${renderStat(
        power
      )} / ${defense} / ${toughness} / ${renderStat(morale)}`}
      label={"A / P / D / T / M"}
    />
  );
};

export default connect<StateProps, {}, OwnProps, any>(state => {
  const baseDefense = state.auth.settings.baseDefense;
  const baseToughness = state.auth.settings.baseToughness;

  return {
    baseDefense,
    baseToughness
  };
})(UnitStats);
