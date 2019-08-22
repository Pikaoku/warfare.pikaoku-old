import { Feature, Experience, Equipment, Type, Size } from "../units/unitTypes";

interface RemoteData {
  saved?: any[];
  saves?: number;
  created?: number;
  updated?: number;
  author?: string;
  authorId?: string;
}

export interface BattleUnit {
  id: string; // unique per instance of the unit within an army
  armyId: string;
  currentHealth: number;
  isDiminished: boolean;
  isExhausted: boolean;
  engagedWith: boolean; // FIXME should be ID of the engaged enemy BattleUnit
  unitId: string; // original unit id
}

export interface WarfareBattleArmy extends RemoteData {
  name?: string;
  id: string;
  initiative: number;
  // units: BattleUnit[];
  units: Record<string, BattleUnit>;
}

export type WarfareBattleSide = Record<string, WarfareBattleArmy>;
