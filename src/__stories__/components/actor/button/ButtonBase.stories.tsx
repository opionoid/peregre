import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ButtonBase, IButtonBaseProps } from '~/components/actor/button/ButtonBase'
import MOCK_BUTTON_BASE_PROPS from '~/__mocks__/components/actor/button/ButtonBase'
import { color, space } from '~/assets/style'

export default {
  title: 'Components/actor/button/ButtonBase',
  component: ButtonBase,
  decorators: [(Story) => <div style={{ padding: '32px', backgroundColor: '#fef8e7' }}><Story/></div>]
} as Meta

const Template: Story<IButtonBaseProps> = (args) => <ButtonBase type={args.type} onClick={args.onClick}>{args.children}</ButtonBase>

export const Default = Template.bind({})
Default.args = {
  ...MOCK_BUTTON_BASE_PROPS,
  children: <p  style={{ color: color.font }}>ボタン</p>
}
export const HasChildren = Template.bind({})
HasChildren.args = {
  children: <div style={{ color: color.font }}><h2>タイトル</h2><p style={{ marginTop: space.xxs }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
}
