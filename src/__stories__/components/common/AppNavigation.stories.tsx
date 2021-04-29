import { Story, Meta } from '@storybook/react'
import {
  AppNavigation,
  IAppNavigationProps,
} from 'src/components/common/AppNavigation'
import MOCK_APP_NAVIGATION_PROPS from 'src/__mocks__/components/common/AppNavigation'
import { BrowserRouter as Router } from 'react-router-dom'

export default {
  title: 'components/common/AppNavigation',
  component: AppNavigation,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#fef8e7' }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: Story<IAppNavigationProps> = (args) => (
  <Router>
    <AppNavigation {...args} />
  </Router>
)
export const Default = Template.bind({})
Default.args = {
  ...MOCK_APP_NAVIGATION_PROPS,
}
