import {parse} from './music2jcx/parse.js'

if ( global.window ) {
  console.log('haha')
  const bar_score = '1 ( (23) (4 (56)) ) | 1 (12) 3 (34)'
  const jcx = parse(bar_score)
  console.log('jcx', jcx)
} 
else {
  const getStdin = require('get-stdin');

  // 读取整个stdin
  getStdin().then(score => {
    console.log(parse(score))
  });
}

