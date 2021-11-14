import { Story, Meta } from '@storybook/react'
import { StoryList, IStoryListProps } from 'src/components/stories/StoryList'
import MOCK_STORY_LIST_PROPS from 'src/__mocks__/components/stories/StoryList'

export default {
  title: 'components/stories/StoryList',
  component: StoryList,
} as Meta

const Template: Story<IStoryListProps> = (args) => <StoryList {...args} />
export const Default = Template.bind({})
Default.args = {
  ...MOCK_STORY_LIST_PROPS,
}
