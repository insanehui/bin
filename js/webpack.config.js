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
  /*
   * 在此指定node环境
   */
  target: 'node',
  entry : {
    code_sync : d('./code_sync.js'),
  },
  output : {
    filename : '[name].js',
  },
  module : { rules, },
}

