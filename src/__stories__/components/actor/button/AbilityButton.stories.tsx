import { Story, Meta } from '@storybook/react'
import { AbilityButton, IAbilityButtonProps } from 'src/components/actor/button/AbilityButton'
import MOCK_ABILITY_BUTTON_PROPS from 'src/__mocks__/components/actor/button/AbilityButton'

export default {
  title: 'components/actor/button/AbilityButton',
  component: AbilityButton,
  decorators: [(Story) => <div style={{ padding: '32px', backgroundColor: '#fef8e7' }}><Story/></div>]
} as Meta

const Template: Story<IAbilityButtonProps> = (args) => <AbilityButton {...args} />
export const BattleMode = Template.bind({})
BattleMode.args = {
  ...MOCK_ABILITY_BUTTON_PROPS
}

export const EditMode = Template.bind({})
EditMode.args = {
  ...MOCK_ABILITY_BUTTON_PROPS,
  ...{ isEditMode: true }
}