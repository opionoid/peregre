const { makeMockPropsName, makeInterfaceName } = require('../utils')
module.exports = (componentName, dirName) => `import { ${makeInterfaceName(
  componentName,
)} } from 'src/components/${dirName}/${componentName}';

const ${makeMockPropsName(componentName)}: ${makeInterfaceName(
  componentName,
)} = {};

export default ${makeMockPropsName(componentName)};
`
