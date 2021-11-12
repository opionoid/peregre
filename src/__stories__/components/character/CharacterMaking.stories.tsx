import { Story, Meta } from '@storybook/react'
import { CharacterMaking, ICharacterMakingProps } from 'src/components/character/making/CharacterMaking'
import MOCK_CHARACTER_MAKING_PROPS from 'src/__mocks__/components/character/CharacterMaking'
import { RecoilRoot } from 'recoil'

export default {
  title: 'components/character/CharacterMaking',
  component: CharacterMaking,
} as Meta

const Template: Story<ICharacterMakingProps> = (args) => <RecoilRoot><CharacterMaking {...args} /></RecoilRoot>
export const Default = Template.bind({})
Default.args = {
  ...MOCK_CHARACTER_MAKING_PROPS
}