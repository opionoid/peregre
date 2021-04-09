import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ButtonBase, IButtonBaseProps } from '~/components/actor/button/ButtonBase'
import MOCK_BUTTON_BASE_PROPS from '~/__mocks__/components/actor/button/ButtonBase'

export default {
  title: 'Components/actor/button/ButtonBase',
  decorators: [(Story) => <div style={{ padding: '32px', backgroundColor: '#fef8e7' }}><Story/></div>]
} as Meta

const Template: Story<IButtonBaseProps> = (props) => <ButtonBase {...props} />
export const Default = Template.bind({})
Default.args = {
  ...MOCK_BUTTON_BASE_PROPS
}