import { Story, Meta } from '@storybook/react'
import { CharacterMaking, ICharacterMakingProps } from 'src/components/character/CharacterMaking'
import MOCK_CHARACTER_MAKING_PROPS from 'src/__mocks__/components/character/CharacterMaking'
import { RecoilRoot } from 'recoil'

export default {
  title: 'components/character/CharacterMaking',
  component: CharacterMaking,
  decorators: [(Story) => <div style={{ padding: '32px', backgroundColor: '#fef8e7' }}><Story/></div>]
} as Meta

const Template: Story<ICharacterMakingProps> = (args) => <RecoilRoot><CharacterMaking {...args} /></RecoilRoot>
export const Default = Template.bind({})
Default.args = {
  ...MOCK_CHARACTER_MAKING_PROPS
}