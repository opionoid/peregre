import { Story, Meta } from '@storybook/react'
import { StoryArticle, IStoryArticleProps } from 'src/components/stories/StoryArticle'
import MOCK_STORY_ARTICLE_PROPS from 'src/__mocks__/components/stories/StoryArticle'

export default {
  title: 'components/stories/StoryArticle',
  component: StoryArticle,
} as Meta

const Template: Story<IStoryArticleProps> = (args) => <StoryArticle {...args} />
export const Default = Template.bind({})
Default.args = {
  ...MOCK_STORY_ARTICLE_PROPS
}