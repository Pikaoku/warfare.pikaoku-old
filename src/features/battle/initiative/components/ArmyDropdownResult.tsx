import React from "react";
import { Header } from "semantic-ui-react";
import { WarfareBattleArmy } from "../../battleTypes";

export const createArmiesDropdownOptions = (armies: WarfareBattleArmy[]) =>
  armies.map(army => ({
    value: army.id,
    text: army.name,
    content: <ArmyDropdownResult key={army.id} {...army} />
  }));

const ArmyDropdownResult: React.FC<WarfareBattleArmy> = ({ name, units }) => {
  return (
    <Header size={"small"}>
      {name}
      <Header.Subheader>Units: {Object.keys(units).length}</Header.Subheader>
    </Header>
  );
};

export default ArmyDropdownResult;
