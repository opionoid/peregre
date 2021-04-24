import React from 'react'
import { Story, Meta } from '@storybook/react'
import { CharacterSheet, ICharacterSheetProps } from '~/components/character/CharacterSheet'
import MOCK_CHARACTER_SHEET_PROPS from '~/__mocks__/components/character/CharacterSheet'

export default {
  title: 'components/character/CharacterSheet',
  component: CharacterSheet,
  decorators: [(Story) => <div style={{ padding: '32px', backgroundColor: '#fef8e7' }}><Story/></div>]
} as Meta

const Template: Story<ICharacterSheetProps> = (args) => <CharacterSheet {...args} />
export const Default = Template.bind({})
Default.args = {
  ...MOCK_CHARACTER_SHEET_PROPS
}