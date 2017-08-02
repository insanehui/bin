const readline = require('readline')
import _ from 'lodash'

const rl = readline.createInterface({ input: process.stdin })
/*
    color: white;
    height: 25px;
    line-height: 25px;
    padding-left: 3px;
    background-color: rgb(184, 185, 189);
*/
rl.on('line', line => {
  let [name, value] = line.split(':')
  name = _.camelCase(_.trim(name))
  value = _.trim(value).slice(0, -1)
  console.log(`${name} : '${value}',`)
})

