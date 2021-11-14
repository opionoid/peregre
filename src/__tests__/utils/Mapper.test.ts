import { Icons } from 'src/assets/icons'
import { IAbility, IDirtyAbility, IDirtyWeapon, IWeapon } from 'src/interfaces'
import { getAbilityFromDirtyData, getWeaponFromDirtyData } from 'src/utils/Mapper'

/**
 * アビリティ
 */

const DIRTY_ABILITY: IDirtyAbility = {
  name: 'テストアビリティ',
  icon: 'Acting',
  description: 'これはテスト用に作成されたアビリティです。'
}
const ABILITY_BASE: Omit<IAbility, 'successRate'> = {
  name: 'テストアビリティ',
  icon: {
    src: Icons['Acting'],
    alt: ''
  },
  description: 'これはテスト用に作成されたアビリティです。',
  // successRate: Math.max(randomNumber % 6, randomNumber % 4, 2) + 4,
}

test('Mapper/getAbilityFromDirtyData', () => {
  expect(getAbilityFromDirtyData(DIRTY_ABILITY, 0)).toStrictEqual({ ...ABILITY_BASE, successRate: 6 })
  expect(getAbilityFromDirtyData(DIRTY_ABILITY, 1)).toStrictEqual({ ...ABILITY_BASE, successRate: 6 })
  expect(getAbilityFromDirtyData(DIRTY_ABILITY, 2)).toStrictEqual({ ...ABILITY_BASE, successRate: 6 })
  expect(getAbilityFromDirtyData(DIRTY_ABILITY, 3)).toStrictEqual({ ...ABILITY_BASE, successRate: 7 })
  expect(getAbilityFromDirtyData(DIRTY_ABILITY, 4)).toStrictEqual({ ...ABILITY_BASE, successRate: 8 })
  expect(getAbilityFromDirtyData(DIRTY_ABILITY, 5)).toStrictEqual({ ...ABILITY_BASE, successRate: 9 })
  expect(getAbilityFromDirtyData(DIRTY_ABILITY, 6)).toStrictEqual({ ...ABILITY_BASE, successRate: 6 })
  expect(getAbilityFromDirtyData(DIRTY_ABILITY, 7)).toStrictEqual({ ...ABILITY_BASE, successRate: 7 })
  // 網羅はしてない（~12まで必要）
})

const DIRTY_WEAPON: IDirtyWeapon = {
  name: 'テスト武器',
  icon: 'Acting',
  description: 'テスト用武器',
  hp: '10',
  range: '中距離',
  skills: [{
    name: 'テストスキル',
    description: 'テスト用スキル',
    depth: '-4',
    shouldCast: '',
    isUlt: 'TRUE',
  }]
}

const WEAPON: IWeapon = {
  name: 'テスト武器',
  icon: {
    src: Icons['Acting'],
    alt: ''
  },
  description: 'テスト用武器',
  hp: 10,
  range: '中距離',
  skillList: [{
    name: 'テストスキル',
    description: 'テスト用スキル',
    icon: {
      src: Icons['Acting'],
      alt: ''
    },
    depth: -4,
    shouldCast: false,
    isUlt: true
  }]
}

test('Mapper/getWeaponFromDirtyData', () => {
  expect(getWeaponFromDirtyData(DIRTY_WEAPON)).toStrictEqual(WEAPON)
})