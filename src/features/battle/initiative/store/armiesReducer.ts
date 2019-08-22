import {
  createStandardAction,
  ActionType,
  createReducer
} from "typesafe-actions";

import { WarfareBattleArmy, BattleUnit } from "../../battleTypes";

const actionPrefix = "ARMIES";

export type ArmiesState = {
  userArmies: WarfareBattleArmy[];
};

export const initialState: ArmiesState = {
  userArmies: []
};

export const armiesActions = {
  updateUserArmies: createStandardAction(`${actionPrefix}/UPDATE`)<
    WarfareBattleArmy[]
  >()
};

export type ArmiesAction = ActionType<typeof armiesActions>;

const armiesReducer = createReducer<ArmiesState, ArmiesAction>(
  initialState
).handleAction(armiesActions.updateUserArmies, (state, action) => {
  // we have to remap the units to the right armyId since firebase populates ID for us for remote armies
  // FIXME is there some magic on firebase that will do this when we add/update the army?
  const armies = action.payload.map(army => ({
    ...army,
    units: Object.values(army.units).reduce<Record<string, BattleUnit>>(
      (acc, unit) => ({
        ...acc,
        [unit.id]: {
          ...unit,
          armyId: army.id
        }
      }),
      {}
    )
  }));

  return {
    ...state,
    userArmies: armies
  };
});

export default armiesReducer;
