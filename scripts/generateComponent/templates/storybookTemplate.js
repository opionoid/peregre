const {makeMockPropsName} = require("../utils");

module.exports = (componentName, dirName) => (
`import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ${componentName}, I${componentName}Props } from '~/components/${dirName}/${componentName}'
import ${makeMockPropsName(componentName)} from '~/__mocks__/components/${dirName}/${componentName}'

export default {
  title: 'components/${dirName}/${componentName}',
  decorators: [(Story) => <div style={{ padding: '32px', backgroundColor: '#fef8e7' }}><Story/></div>]
} as Meta

const Template: Story<I${componentName}Props> = (props) => <${componentName} {...props} />
export const Default = Template.bind({})
Default.args = {
  ...${makeMockPropsName(componentName)}
}`
);
