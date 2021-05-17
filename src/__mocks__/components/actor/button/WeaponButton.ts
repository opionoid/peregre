import { IWeaponButtonProps } from 'src/components/actor/button/WeaponButton'
import { INITIAL_SKILL } from 'src/constants'

const MOCK_WEAPON_BUTTON_PROPS: IWeaponButtonProps = {
  skill: INITIAL_SKILL,
  setCurrentSkill: console.log('setCurrentSkill run'),
}

export default MOCK_WEAPON_BUTTON_PROPS
