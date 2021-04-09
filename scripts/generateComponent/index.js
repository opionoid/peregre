/**
 * Input prompt example
 */
'use strict';
const inquirer = require('inquirer');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs/promises');

const SRC_DIR = path.resolve(__dirname, '../../src');

const COMPONENT_DIR = path.resolve(SRC_DIR, 'components');
const TEST_DIR = path.resolve(SRC_DIR, '__test__/components');
const MOCK_DIR = path.resolve(SRC_DIR, '__mocks__/components');
const STORY_DIR = path.resolve(SRC_DIR, '__stories__/components');
const prefixUpper = (val) => val.charAt(0).toUpperCase() + val.slice(1);

const questions = [
  {
    type: 'input',
    name: 'componentName',
    message: 'component name:',
    transformer: (val) => {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  },
  {
    type: 'input',
    name: 'resolveDir',
    message: 'src/components/',
    default: function () {
      return 'actor';
    },
  },
];

const main = async () => {
  const fields = await inquirer.prompt(questions);
  const {componentName: _componentName, resolveDir} = fields;
  const componentName = prefixUpper(_componentName);
  console.log('generate component:');
  await generateComponent(componentName, resolveDir);
  console.log('component generated!');
};

const generateComponent = async (componentName, resolveDir) => {
  const templates = [
    {
      key: 'component',
      dir: path.resolve(COMPONENT_DIR, resolveDir),
      name: path.resolve(COMPONENT_DIR, resolveDir, `${componentName}.tsx`),
      template: require('./templates/componentTemplate')(componentName),
    },
    {
      key: 'test',
      dir: path.resolve(TEST_DIR, resolveDir),
      name: path.resolve(TEST_DIR, resolveDir, `${componentName}.spec.tsx`),
      template: require('./templates/testTemplate')(componentName, resolveDir),
    },
    {
      key: 'mock',
      dir: path.resolve(MOCK_DIR, resolveDir),
      name: path.resolve(MOCK_DIR, resolveDir, `${componentName}.ts`),
      template: require('./templates/mockTemplate')(componentName, resolveDir),
    },
    {
      key: 'storybook',
      dir: path.resolve(STORY_DIR, resolveDir),
      name: path.resolve(STORY_DIR, resolveDir, `${componentName}.stories.tsx`),
      template: require('./templates/storybookTemplate')(componentName, resolveDir),
    },
  ];
  makeFile(templates);
};

const makeFile = async (templates) => {
  await Promise.all(templates.map(({dir}) => mkdirp(dir)));
  await Promise.all(templates.map(({name, template}) => fs.writeFile(name, template)));
};

main();
