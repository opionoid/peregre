import { Story, Meta } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RulesPage } from 'src/pages/rules'

export default {
  title: 'pages/rules',
  component: RulesPage,
} as Meta

const Template: Story<never> = () => (
  <Router>
    <RulesPage />
  </Router>
)
export const Default = Template.bind({})
