import { atom, RecoilState } from 'recoil'
import { INITIAL_ABILITY, INITIAL_WEAPON } from 'src/constants'
import { IAbility, IDirtyAbility, IDirtyWeapon, IWeapon } from 'src/interfaces'
import ability from '../json/ability.json'
import weapon from '../json/weapon.json'

// TODO: コンフィグ項目とか増えてくるならファイル分けた方がよさそう

/**
 * キャラメイク関連
 * TODO: いつか命名変えたいような
 */

export const allAbilityListAtom: RecoilState<IDirtyAbility[]> = atom({
  key: 'allAbilityListAtom',
  default: ability as IDirtyAbility[],
})

export const abilityListAtom: RecoilState<IAbility[]> = atom({
  key: 'abilityListAtom',
  default: [...Array(4)].fill(INITIAL_ABILITY)
})

export const allWeaponListAtom: RecoilState<IDirtyWeapon[]> = atom({
  key: 'allWeaponListAtom',
  default: weapon as IDirtyWeapon[]
})

export const mainWeaponAtom: RecoilState<IWeapon> = atom({
  key: 'mainWeaponAtom',
  default: INITIAL_WEAPON
})

export const subWeaponAtom: RecoilState<IWeapon> = atom({
  key: 'subWeaponAtom',
  default: INITIAL_WEAPON
})

export const nameAtom: RecoilState<string> = atom({
  key: 'nameAtom',
  default: ''
})

export const isMakingFinishedAtom: RecoilState<boolean> = atom({
  key: 'isMakingFinishedAtom',
  default: false as boolean,
})

/**
 * コンフィグ
 */

export const configDiscordWebhookUrl: RecoilState<string> = atom({
  key: 'configDiscordWebhookUrl',
  default: ''
})
