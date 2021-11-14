import { Story, Meta } from '@storybook/react'
import {
  WeaponButton,
  IWeaponButtonProps,
} from 'src/components/actor/button/WeaponButton'
import MOCK_WEAPON_BUTTON_PROPS from 'src/__mocks__/components/actor/button/WeaponButton'

export default {
  title: 'components/actor/button/WeaponButton',
  component: WeaponButton,
} as Meta

const Template: Story<IWeaponButtonProps> = (args) => <WeaponButton {...args} />
export const Default = Template.bind({})
Default.args = {
  ...MOCK_WEAPON_BUTTON_PROPS,
}
