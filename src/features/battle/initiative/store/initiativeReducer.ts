import {
  createStandardAction,
  ActionType,
  createReducer
} from "typesafe-actions";
import uuid from "uuid/v4";

import { WarfareBattleArmy, BattleUnit } from "../../battleTypes";

const actionPrefix = "INITIATIVE";

export type InitiativeState = {
  armies: Record<string, WarfareBattleArmy>;
  combatant?: {
    armyId: string;
    combatantBattleUnitId: string;
  };
};

export const initialState: InitiativeState = {
  armies: {},
  combatant: undefined
};

export const initiativeActions = {
  addArmy: createStandardAction(`${actionPrefix}/ADD_ARMY`)<
    WarfareBattleArmy
  >(),
  addCombatant: createStandardAction(`${actionPrefix}/ADD_COMBATANT`)<{
    armyId: string;
    combatantBattleUnitId: string;
  }>(),
  resetCombatant: createStandardAction(`${actionPrefix}/RESET_COMBATANT`)(),
  addUnitToArmy: createStandardAction(`${actionPrefix}/ADD_UNIT_TO_ARMY`)<{
    armyId: string;
    battleUnit: BattleUnit;
  }>(),
  removeArmy: createStandardAction(`${actionPrefix}/REMOVE_ARMY`)<string>(),
  removeUnitFromArmy: createStandardAction(
    `${actionPrefix}/REMOVE_UNIT_FROM_ARMY`
  )<{
    armyId: string;
    battleUnitIdToRemove: string;
  }>(),
  setBattleUnitHealth: createStandardAction(
    `${actionPrefix}/SET_BATTLE_UNIT_HEALTH`
  )<{
    armyId: string;
    battleUnitId: string;
    value: number;
  }>(),
  setBattleUnitDiminished: createStandardAction(
    `${actionPrefix}/SET_BATTLE_UNIT_DIMINISHED`
  )<{
    armyId: string;
    battleUnitId: string;
    isDiminished: boolean;
  }>(),
  setBattleUnitExhausted: createStandardAction(
    `${actionPrefix}/SET_BATTLE_UNIT_EXHAUSTED`
  )<{
    armyId: string;
    battleUnitId: string;
    isExhausted: boolean;
  }>(),
  setBattleUnitEngagedWith: createStandardAction(
    `${actionPrefix}/SET_BATTLE_UNIT_ENGAGED_WITH`
  )<{
    armyId: string;
    battleUnitId: string;
    engagedWith: boolean;
  }>(),
  setCommanderInitiative: createStandardAction(
    `${actionPrefix}/SET_COMMANDER_INITIATIVE`
  )<{
    armyId: string;
    initiative: number;
  }>(),
  setCommanderName: createStandardAction(`${actionPrefix}/SET_COMMANDER_NAME`)<{
    armyId: string;
    name: string;
  }>()
};

export type InitiativeAction = ActionType<typeof initiativeActions>;

export const armyReducer = createReducer<InitiativeState, InitiativeAction>(
  initialState
)
  .handleAction(initiativeActions.addArmy, (state, { payload }) => {
    return {
      ...state,
      armies: {
        ...state.armies,
        [payload.id]: payload
      }
    };
  })
  .handleAction(initiativeActions.addUnitToArmy, (state, { payload }) => {
    const newArmies = { ...state.armies };
    newArmies[payload.armyId].units[payload.battleUnit.id] = payload.battleUnit;
    return {
      ...state,
      armies: newArmies
    };
  })
  .handleAction(initiativeActions.removeUnitFromArmy, (state, { payload }) => {
    const newArmies = { ...state.armies };
    delete newArmies[payload.armyId].units[payload.battleUnitIdToRemove];
    return {
      ...state,
      armies: newArmies
    };
  })
  .handleAction(initiativeActions.removeArmy, (state, { payload }) => {
    const newArmies = { ...state.armies };
    delete newArmies[payload];
    return {
      ...state,
      armies: newArmies
    };
  });

export const combatantReducer = createReducer<
  InitiativeState,
  InitiativeAction
>(initialState)
  .handleAction(initiativeActions.addCombatant, (state, { payload }) => {
    return {
      ...state,
      combatant: payload
    };
  })
  .handleAction(initiativeActions.resetCombatant, state => ({
    ...state,
    combatant: initialState.combatant
  }));

export const battleUnitReducer = createReducer<
  InitiativeState,
  InitiativeAction
>(initialState)
  .handleAction(initiativeActions.setBattleUnitHealth, (state, { payload }) => {
    const relevantBattleUnit =
      state.armies[payload.armyId].units[payload.battleUnitId];
    if (!relevantBattleUnit) {
      return state;
    }

    const newArmies = { ...state.armies };

    newArmies[payload.armyId].units[payload.battleUnitId].currentHealth =
      payload.value;

    return {
      ...state,
      armies: newArmies
    };
  })
  .handleAction(
    initiativeActions.setBattleUnitExhausted,
    (state, { payload }) => {
      const relevantBattleUnit =
        state.armies[payload.armyId].units[payload.battleUnitId];
      if (!relevantBattleUnit) {
        return state;
      }

      const newArmies = { ...state.armies };

      newArmies[payload.armyId].units[payload.battleUnitId].isExhausted =
        payload.isExhausted;

      return {
        ...state,
        armies: newArmies
      };
    }
  )
  .handleAction(
    initiativeActions.setBattleUnitDiminished,
    (state, { payload }) => {
      const relevantBattleUnit =
        state.armies[payload.armyId].units[payload.battleUnitId];
      if (!relevantBattleUnit) {
        return state;
      }

      const newArmies = { ...state.armies };

      newArmies[payload.armyId].units[payload.battleUnitId].isDiminished =
        payload.isDiminished;

      return {
        ...state,
        armies: newArmies
      };
    }
  )
  .handleAction(
    initiativeActions.setBattleUnitEngagedWith,
    (state, { payload }) => {
      const relevantBattleUnit =
        state.armies[payload.armyId].units[payload.battleUnitId];
      if (!relevantBattleUnit) {
        return state;
      }

      const newArmies = { ...state.armies };

      newArmies[payload.armyId].units[payload.battleUnitId].engagedWith =
        payload.engagedWith;

      return {
        ...state,
        armies: newArmies
      };
    }
  );

export const commanderReducer = createReducer<
  InitiativeState,
  InitiativeAction
>(initialState)
  .handleAction(
    initiativeActions.setCommanderInitiative,
    (state, { payload }) => {
      const newArmies = { ...state.armies };
      newArmies[payload.armyId].initiative = payload.initiative;
      return {
        ...state,
        armies: newArmies
      };
    }
  )
  .handleAction(initiativeActions.setCommanderName, (state, { payload }) => {
    const newArmies = { ...state.armies };
    newArmies[payload.armyId].name = payload.name;
    return {
      ...state,
      armies: newArmies
    };
  });

export const initiativeReducer = createReducer<
  InitiativeState,
  InitiativeAction
>(initialState, {
  ...armyReducer.handlers,
  ...combatantReducer.handlers,
  ...battleUnitReducer.handlers,
  ...commanderReducer.handlers
});
