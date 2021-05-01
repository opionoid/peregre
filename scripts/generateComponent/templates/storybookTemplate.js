const { makeMockPropsName } = require('../utils')

module.exports = (componentName, dirName) =>
  `import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ${componentName}, I${componentName}Props } from 'src/components/${dirName}/${componentName}'
import ${makeMockPropsName(
    componentName,
  )} from 'src/__mocks__/components/${dirName}/${componentName}'

export default {
  title: 'components/${dirName}/${componentName}',
  component: ${componentName},
} as Meta

const Template: Story<I${componentName}Props> = (args) => <${componentName} {...args} />
export const Default = Template.bind({})
Default.args = {
  ...${makeMockPropsName(componentName)}
}`
