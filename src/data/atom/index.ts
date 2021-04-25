import { atom, RecoilState } from 'recoil'
import { INITIAL_ABILITY, INITIAL_WEAPON } from 'src/constants'
import { IAbility, IWeapon } from 'src/interfaces'
import ability from '../json/ability.json'
import weapon from '../json/weapon.json'

export const allAbilityListAtom = atom({
  key: 'allAbilityListAtom',
  default: ability,
})

export const abilityListAtom: RecoilState<IAbility[]> = atom({
  key: 'abilityListAtom',
  default: [...Array(4)].fill(INITIAL_ABILITY)
})

export const allWeaponListAtom = atom({
  key: 'allWeaponListAtom',
  default: weapon
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

