import React from 'react'
import { Story, Meta } from '@storybook/react'
import { StoryListItem, IStoryListItemProps } from 'src/components/stories/molecules/StoryListItem'
import MOCK_STORY_LIST_ITEM_PROPS from 'src/__mocks__/components/stories/molecules/StoryListItem'

export default {
  title: 'components/stories/molecules/StoryListItem',
  component: StoryListItem,
} as Meta

const Template: Story<IStoryListItemProps> = (args) => <StoryListItem {...args} />
export const Default = Template.bind({})
Default.args = {
  ...MOCK_STORY_LIST_ITEM_PROPS
}