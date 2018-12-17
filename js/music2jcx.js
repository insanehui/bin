import {parse} from './music2jcx/parse.js'

if ( global.window ) {
  const React = require('react')
  const ReactDOM = require('react-dom')

  console.log('haha')
  const bar_score = '1 ( (23) (4 (56)) ) | 1 (12) 3 (34)'
  const jcx = parse(bar_score)
  console.log('jcx', jcx)

  class App extends React.PureComponent {
    render() {
      return <div>test</div>
    }
  }

  ReactDOM.render( <App />, document.getElementById('root'))
} 
else {
  const getStdin = require('get-stdin');

  // 读取整个stdin
  getStdin().then(score => {
    console.log(parse(score))
  });
}

