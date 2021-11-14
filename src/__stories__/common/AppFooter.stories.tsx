import { Story, Meta } from '@storybook/react'
import { AppFooter, IAppFooterProps } from 'src/components/common/AppFooter'
import MOCK_APP_FOOTER_PROPS from 'src/__mocks__/components/common/AppFooter'

export default {
  title: 'components/common/AppFooter',
  component: AppFooter,
} as Meta

const Template: Story<IAppFooterProps> = (args) => <AppFooter {...args} />
export const Default = Template.bind({})
Default.args = {
  ...MOCK_APP_FOOTER_PROPS
}