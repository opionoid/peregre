import { Icons } from 'src/assets/icons'
import { IDirtyAbility, IDirtyWeapon } from 'src/interfaces'
import { randomizeXorShift } from './Math'

export const getWeaponFromDirtyData = (dirtyData: IDirtyWeapon) => ({
  name: dirtyData.name,
  range: dirtyData.range,
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
    description: skill.description || '',
    shouldCast: skill.shouldCast === 'TRUE',
    isUlt: skill.isUlt === 'TRUE',
  })),
})

const seed = 1111 /** TODO */
const getRD = (i: number): number => randomizeXorShift(seed + i)

export const getAbilityFromDirtyData = (
  dirtyData: IDirtyAbility,
  i: number,
) => ({
  name: dirtyData.name,
  description: dirtyData.description,
  icon: {
    src: Icons[dirtyData.icon],
    alt: '', // nameと同じなのでからっぽ
  },
  // [成功率, 出現率] = [[90%, 25%], [70%, 33%], [60%, 47%]]
  successRate: 2 * Math.max(getRD(i) % 4, getRD(i) % 3, 1.7) + 0.3,
})
