export interface CharacterData {
  status: number;
  data: Character[];
}

export interface Character {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  fullPortrait: null | string;
  role: Role | null;
}

export interface Role {
  uuid: string;
  displayName: RoleName;
  description: string;
  displayIcon: string;
  assetPath: string;
}

export enum RoleName {
  Controller = "Controller",
  Duelist = "Duelist",
  Initiator = "Initiator",
  Sentinel = "Sentinel",
  Unassigned = "Unassigned",
}

export interface WeaponsData {
  status: number;
  data: Weapon[];
}

export interface Weapon {
  uuid: string;
  displayName: string;
  category: string;
  defaultSkinUuid: string;
  displayIcon: string;
  killStreamIcon: string;
  assetPath: string;
  shopData: ShopData | null;
  skins: Skin[];
}

export interface ShopData {
  cost: number;
  category: string;
  shopOrderPriority: number;
  categoryText: string;
  canBeTrashed: boolean;
  image: null;
  newImage: string;
  newImage2: null;
  assetPath: string;
}

export interface Skin {
  uuid: string;
  displayName: string;
  themeUuid: string;
  contentTierUuid: null | string;
  displayIcon: null | string;
  wallpaper: null | string;
  assetPath: string;
}
