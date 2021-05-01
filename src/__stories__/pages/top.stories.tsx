import { Story, Meta } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { TopPage } from 'src/pages/top'

export default {
  title: 'pages/top',
  component: TopPage,
} as Meta

const Template: Story<never> = () => (
  <Router>
    <TopPage />
  </Router>
)
export const Default = Template.bind({})
