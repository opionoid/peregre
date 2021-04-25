const { makeMockPropsName } = require('../utils')
module.exports = (componentName, dirName) => `import React from 'react';
import { ${componentName} } from 'src/components/${dirName}/${componentName}';
import ${makeMockPropsName(
  componentName,
)} from 'src/__mocks__/components/${dirName}/${componentName}';
import { render } from '@testing-library/react';

describe('${dirName}', () => {
  const snapshot = render(${'<' + componentName} {...${makeMockPropsName(
  componentName,
)}}/>);

  it('default test', () => {
    expect(snapshot.baseElement).toMatchSnapshot();
  });
});
`
