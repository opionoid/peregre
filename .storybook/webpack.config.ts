const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
        '@~': path.resolve(__dirname, '../src'),
    },
    modules: ['node_modules', 'src']
  }
}
