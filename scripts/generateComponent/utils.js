const {snakeCase} = require('snake-case');
const snakeUpperCase = (name) => snakeCase(name).toUpperCase();

const makeMockPropsName = (componentName) => `MOCK_${snakeUpperCase(componentName)}_PROPS`;
const makeInterfaceName = (componentName) => `I${componentName}Props`;

module.exports = {
  makeMockPropsName,
  makeInterfaceName
}
