const path = require('path')
const d = path.resolve.bind(null, __dirname)

const js = {
  test: /\.js$/,
  loader: require.resolve('babel-loader'),
  options: {
    presets : ['env', 'stage-1'],
  },
}

const rules = [js]

module.exports = {
  target: 'node',
  entry : {
    syncCode : d('./syncCode.js'),
  },
  output : {
    filename : '[name].js',
  },
  module : { rules, },
}

