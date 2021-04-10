import React from 'react'
import { Story, Meta } from '@storybook/react'
import { AbilityButton, IAbilityButtonProps } from '~/components/actor/button/AbilityButton'
import MOCK_ABILITY_BUTTON_PROPS from '~/__mocks__/components/actor/button/AbilityButton'

export default {
  title: 'components/actor/button/AbilityButton',
  component: AbilityButton,
  decorators: [(Story) => <div style={{ padding: '32px', backgroundColor: '#fef8e7' }}><Story/></div>]
} as Meta

const Template: Story<IAbilityButtonProps> = (args) => <AbilityButton {...args} />
export const Default = Template.bind({})
Default.args = {
  ...MOCK_ABILITY_BUTTON_PROPS
}