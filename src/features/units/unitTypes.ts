interface GenericData {
  updated: string;
  version: number;
  saved: any[];
  saves: number;
  created: string;
  id: string;
}

export enum Equipment {
  heavy = "heavy",
  light = "light",
  medium = "medium",
  superHeavy = "super-heavy",
  none = "none"
}

export enum Type {
  levies = "levies",
  infantry = "infantry",
  none = "none",
  seigeEngine = "seige engine",
  cavalry = "cavalry",
  airborne = "airborne",
  archers = "archers"
}

export enum Experience {
  none = "none",
  green = "green",
  regular = "regular",
  seasoned = "seasoned",
  veteran = "veteran",
  elite = "elite",
  superElite = "super-elite"
}

export enum Size {
  d4 = 4,
  d6 = 6,
  d8 = 8,
  d10 = 10,
  d12 = 12
}

export type Feature = {
  name: string;
  effect: string;
  id: string;
};

enum AspectType {
  ancestry = "ancestry",
  experience = "experience",
  equipment = "equipment",
  type = "type",
  customization = "customization"
}

interface AspectStats {
  attack: number;
  cost: number;
  costMod: number;
  defense: number;
  features: Feature[];
  id: string;
  morale: number;
  name: string;
  official?: boolean;
  power: number;
  toughness: number;
  type: AspectType;
  updated: string;
  version: number;
}

interface AncestryStats extends AspectStats {
  type: AspectType.ancestry;
}
interface CustomizationStats extends AspectStats {
  type: AspectType.customization;
}
interface EquipmentStats extends AspectStats {
  type: AspectType.equipment;
  name: Equipment;
}
interface ExperienceStats extends AspectStats {
  type: AspectType.experience;
}
interface TypeStats extends AspectStats {
  type: AspectType.type;
}

export interface GenericUnit extends GenericData {
  ancestry: AncestryStats;
  author: string;
  authorId: string;
  commander?: string;
  currency: string;
  customization: CustomizationStats;
  description: string;
  equipment: EquipmentStats;
  experience: ExperienceStats;
  label?: string;
  lore?: string;
  name?: string;
  size: Size;
  type: TypeStats;
}
