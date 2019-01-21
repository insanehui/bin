/*
 * 处理music格式里的一个小节
 */
import _ from 'lodash'
// import {fraction} from 'mathjs'
// import parseText from './parseText.js'

// 读一个音符
function readNote(str) {
  const [a, b] = /^\s*(-|[b#]?\d[.']?)/.exec(str)
  return [b, str.slice(_.size(a))]
}

// 读取多声部
function readChorus(str) {
}

// 收集每个音，"-"也算
function collectBeats(str) {
  const beats = []
  while(1){
    str = _.trim(str)
    if ( !str ) {
      return [beats, '']
    } 
    if ( str.startsWith(')') ) {
      return [beats, str.slice(1)]
    } 

    if ( str.startsWith('(') ) {
      let [a, res] = collectBeats(str.slice(1))
      beats.push(a)
      str = res
    } 
    else {
      let [note, res] = readNote(str)
      str = res
      beats.push({notes:[note]})
    }

  }
}

export default function parse(str, opt = {}) {
  let [beats] = collectBeats(str)
  return beats
}
