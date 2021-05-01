const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: [
    '../src/__stories__/**/*.stories.mdx',
    '../src/__stories__/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    '@storybook/addon-docs',
    '@storybook/addon-storyshots',
    '@storybook/addon-options',
    '@storybook/addon-viewport',
  ],
}
