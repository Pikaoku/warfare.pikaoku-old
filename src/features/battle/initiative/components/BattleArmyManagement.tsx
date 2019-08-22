import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import {
  Button,
  Dropdown,
  Grid,
  Header,
  Input,
  Popup,
  Segment,
  SegmentGroup
} from "semantic-ui-react";
import { createUnitDropdownOptions } from "../../../units/components/UnitDropdownResult";
import { createArmiesDropdownOptions } from "./ArmyDropdownResult";
import sortByField from "../../../common/utils/array/sortByField";
import AddArmyPopup from "./AddArmyPopup";

import { InitiativeContext } from "../pages/WarfareInitiative";

import { BattleUnit, WarfareBattleArmy } from "../../battleTypes";
import { initiativeActions } from "../store/initiativeReducer";
import { GenericUnit } from "../../../units/unitTypes";
import BattleArmyManagementUnitSummary from "./BattleArmyManagementUnitSummary";

import { useSaveArmy } from "../store/helpers";

interface Props {
  collapsed: boolean;
  setCollapsed(arg: boolean): void;
}

interface StateProps {
  allUnits: GenericUnit[];
  armies: WarfareBattleArmy[];
  username: string;
}

const createBattleUnitFromOtherUnit = (
  unit: GenericUnit,
  armyId: string
): BattleUnit => {
  return {
    currentHealth: unit.size,
    armyId,
    id: uuid(),
    isExhausted: false,
    isDiminished: false,
    engagedWith: false,
    unitId: unit.id
  };
};

const BattleArmyManagement: React.FC<Props & StateProps> = ({
  allUnits,
  armies,
  collapsed,
  setCollapsed,
  username
}) => {
  const { state, dispatch } = useContext(InitiativeContext);
  const getExistingArmyFromId = (idToFind: string) =>
    armies.find(({ id }) => id === idToFind);

  const saveArmy = useSaveArmy();
  return (
    <>
      <div
        style={{
          display: "flex",
          flex: "0 0",
          padding: "1rem"
        }}
      >
        {/* <Button.Group color="green"> */}
        <AddArmyPopup />

        <Popup
          content="Load Army"
          position="right center"
          on={"hover"}
          trigger={
            <Dropdown
              className="button green icon"
              value={""}
              onChange={(e, { value }) => {
                if (!value) return;
                const existingArmy = getExistingArmyFromId(value as string);
                if (!existingArmy) return;
                dispatch(initiativeActions.addArmy(existingArmy));
              }}
              trigger={<React.Fragment />}
              options={createArmiesDropdownOptions(armies)}
              disabled={allUnits.length === 0}
            />
          }
        />
        {/* </Button.Group> */}

        <Popup
          content={collapsed ? "Expand" : "Collapse"}
          position="right center"
          on={"hover"}
          trigger={
            <Button
              onClick={() => setCollapsed(!collapsed)}
              style={{ marginLeft: "auto" }}
              icon={collapsed ? "caret square right" : "caret square left"}
              color="blue"
            />
          }
        />
      </div>

      <div
        style={{
          overflow: "overlay",
          flex: "1 1 100%",
          padding: "1rem",
          direction: "rtl",
          opacity: collapsed ? 0.25 : 1,
          pointerEvents: collapsed ? "none" : "initial"
        }}
      >
        <div
          style={{
            direction: "ltr"
          }}
        >
          {Object.values(state.armies).map(army => {
            const { id: armyId, name, initiative, units } = army;

            const addUnitToArmy = (unitId: string) => {
              const relevantUnit = allUnits.find(
                ({ id }: { id: string }) => unitId === id
              );
              if (!relevantUnit) {
                return false;
              }
              const battleUnit = createBattleUnitFromOtherUnit(
                relevantUnit,
                armyId
              );

              dispatch(initiativeActions.addUnitToArmy({ armyId, battleUnit }));
            };

            return (
              <SegmentGroup key={armyId}>
                <Segment>
                  <Grid divided>
                    <Grid.Column width={10}>
                      <Header as="h4">Commander</Header>
                      <Input
                        placeholder={"Who's in charge here?"}
                        transparent
                        fluid
                        size="large"
                        value={name || ""}
                        onChange={(e, { value }) =>
                          dispatch(
                            initiativeActions.setCommanderName({
                              armyId,
                              name: value
                            })
                          )
                        }
                      />
                    </Grid.Column>

                    <Grid.Column width={6}>
                      <Header as="h4">Initiative</Header>
                      <Input
                        placeholder="Initiative"
                        transparent
                        fluid
                        size="large"
                        type="number"
                        step={0.01}
                        value={initiative}
                        onChange={(e, { value }) => {
                          dispatch(
                            initiativeActions.setCommanderInitiative({
                              armyId,
                              initiative: Number(value)
                            })
                          );
                        }}
                      />
                    </Grid.Column>
                  </Grid>
                </Segment>
                <Segment>
                  <Grid>
                    {Object.values(units).map(battleUnit => (
                      <BattleArmyManagementUnitSummary
                        removeAction={() =>
                          dispatch(
                            initiativeActions.removeUnitFromArmy({
                              armyId,
                              battleUnitIdToRemove: battleUnit.id
                            })
                          )
                        }
                        battleUnit={battleUnit}
                        key={battleUnit.id}
                      />
                    ))}
                  </Grid>
                </Segment>
                <Segment>
                  <Dropdown
                    text="Load Unit"
                    pointing
                    value={""}
                    onChange={(e, { value }) => {
                      addUnitToArmy(value as string);
                    }}
                    button
                    options={createUnitDropdownOptions(allUnits)}
                    disabled={allUnits.length === 0}
                  />
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
                  <Popup
                    content="Remove Army from Battle"
                    position="right center"
                    on={"hover"}
                    trigger={
                      <Button
                        onClick={() => {
                          dispatch(initiativeActions.removeArmy(armyId));
                        }}
                        color="red"
                        basic
                        icon="trash"
                        floated="right"
                      />
                    }
                  />
                </Segment>
              </SegmentGroup>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default connect<StateProps, {}, {}, any>(state => ({
  allUnits: state.units.user
    .concat(state.units.saved)
    .sort(sortByField("name")),
  armies: state.armies.userArmies.sort(sortByField("name")),
  username: state.auth.username
}))(BattleArmyManagement);
