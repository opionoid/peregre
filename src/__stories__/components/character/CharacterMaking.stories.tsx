import React from 'react'
import { Story, Meta } from '@storybook/react'
import { CharacterMaking, ICharacterMakingProps } from '~/components/character/CharacterMaking'
import MOCK_CHARACTER_MAKING_PROPS from '~/__mocks__/components/character/CharacterMaking'

export default {
  title: 'components/character/CharacterMaking',
  component: CharacterMaking,
  decorators: [(Story) => <div style={{ padding: '32px', backgroundColor: '#fef8e7' }}><Story/></div>]
} as Meta

const Template: Story<ICharacterMakingProps> = (args) => <CharacterMaking {...args} />
export const Default = Template.bind({})
Default.args = {
  ...MOCK_CHARACTER_MAKING_PROPS
}