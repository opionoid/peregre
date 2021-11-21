import { Story, Meta } from '@storybook/react'
import { RecoilRoot } from 'recoil'
import { StoryNpc, IStoryNpcProps } from 'src/components/stories/StoryNpc'
import MOCK_STORY_NPC_PROPS from 'src/__mocks__/components/stories/StoryNpc'

export default {
  title: 'components/stories/StoryNpc',
  component: StoryNpc,
} as Meta

const Template: Story<IStoryNpcProps> = (args) => <RecoilRoot><StoryNpc {...args} /></RecoilRoot>
export const Default = Template.bind({})
Default.args = {
  ...MOCK_STORY_NPC_PROPS
}