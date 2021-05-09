import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ToggleButton, IToggleButtonProps } from 'src/components/actor/button/ToggleButton'
import MOCK_TOGGLE_BUTTON_PROPS from 'src/__mocks__/components/actor/button/ToggleButton'

export default {
  title: 'components/actor/button/ToggleButton',
  component: ToggleButton,
} as Meta

const Template: Story<IToggleButtonProps> = (args) => <ToggleButton {...args} />
export const Default = Template.bind({})
Default.args = {
  ...MOCK_TOGGLE_BUTTON_PROPS
}