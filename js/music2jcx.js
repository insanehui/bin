import parse from './music2jcx/jcx/music2jcx.js'

if ( global.window ) {
  const React = require('react')
  const ReactDOM = require('react-dom')
  const App = require('./music2jcx/WebApp.js').default

  // const bar_score = '1 ( (23) (4 (56)) ) | 1 (12) 3 (34)'
  // const jcx = parse(bar_score)
  // console.log('jcx', jcx)

  ReactDOM.render( <App />, document.getElementById('root'))
} 
else {
  const getStdin = require('get-stdin');

  // 读取整个stdin
  getStdin().then(score => {
    console.log(parse(score))
  });
}

