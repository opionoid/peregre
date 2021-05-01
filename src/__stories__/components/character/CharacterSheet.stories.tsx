import { Story, Meta } from '@storybook/react'
import { CharacterSheet, ICharacterSheetProps } from 'src/components/character/CharacterSheet'
import MOCK_CHARACTER_SHEET_PROPS from 'src/__mocks__/components/character/CharacterSheet'
import { RecoilRoot } from 'recoil'

export default {
  title: 'components/character/CharacterSheet',
  component: CharacterSheet,
} as Meta

const Template: Story<ICharacterSheetProps> = (args) => <RecoilRoot><CharacterSheet {...args} /></RecoilRoot>
export const Default = Template.bind({})
Default.args = {
  ...MOCK_CHARACTER_SHEET_PROPS
}