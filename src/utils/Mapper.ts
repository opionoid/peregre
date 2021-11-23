import { Icons } from 'src/assets/icons'
import { IDirtyAbility, IDirtyWeapon } from 'src/interfaces'

/**
 * アビリティデータ取得
 * @param dirtyData 名前と効果とアイコンsrcしかないアビリティデータ
 * @param randomNumber 乱数
 * @returns 整形後のアビリティデータ
 */
export const getAbilityFromDirtyData = (
  dirtyData: IDirtyAbility,
  randomNumber: number,
) => ({
  name: dirtyData.name,
  description: dirtyData.description,
  icon: {
    src: Icons[dirtyData.icon],
    alt: '', // nameと同じなのでからっぽ
  },
  // 出現率：1D10 で判定
  successRate: Math.max(randomNumber % 6, randomNumber % 4, 2) + 4,
})

/**
 * 武器データ取得
 * @param dirtyData 全部が string または undefined の武器データ
 * @returns 整形後の武器データ
 */
export const getWeaponFromDirtyData = (dirtyData: IDirtyWeapon) => ({
  name: dirtyData.name,
  range: parseInt(dirtyData.range),
  description: dirtyData.description,
  icon: {
    src: Icons[dirtyData.icon],
    alt: '',
  },
  hp: parseInt(dirtyData.hp),
  skillList: dirtyData.skills.map((skill) => ({
    icon: {
      src: Icons[dirtyData.icon],
      alt: '',
    },
    name: skill.name || '',
    depth: parseInt(skill.depth) || 0,
    description: skill.description.includes('射程') ? skill.description : `射程${parseInt(dirtyData.range)}。${skill.description}`,
    shouldCast: skill.shouldCast === 'TRUE',
    isUlt: skill.isUlt === 'TRUE',
  })),
})
