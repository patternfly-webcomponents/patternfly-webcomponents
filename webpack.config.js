var webpack = require('webpack');
var path = require('path');

module.exports = {

  context: __dirname,

  entry: {
    'patternfly': './src/patternfly',
    'pf-alert': './src/pf-alert/index',
    'pf-tabs': './src/pf-tabs/index',
    'pf-utilization-bar-chart': './src/pf-utilization-bar-chart/index',
    'pf-utils': './src/pf-utils/index'
  },

  output: {
    path: path.join(__dirname, './dist/js/'),
    publicPath: './',
    filename: '[name].js'
  },

  externals: {
  },

  plugins: [
  ],

  module: {
    loaders: [
      //js loader
      {
        loader: "babel",

        // Options to configure babel with
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};