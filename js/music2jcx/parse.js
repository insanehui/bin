// import {testify} from '../utils/modash.js'

const noteTable = {
  '1' : 'c',
  '2' : 'd',
  '3' : 'e',
  '4' : 'f',
  '5' : 'g',
  '6' : 'a',
  '7' : 'b',
  '0' : 'z',
}

function tree2jianpu(tree, cx=4) {
  let output = ''
  const x = cx / tree.length
  for (const item of tree) {
    if ( typeof item === 'string' ) {
      output += noteTable[item]
      if ( x<1 ) {
        output += `/${1/x}`
      } 
      else if(x>1) {
        output += x
      }
    } 
    else if ( Array.isArray(item) ) {
      output += tree2jianpu(item, x)
    } 
  }
  return output
}

// 将一个音符系列转成结构化的数据（这里的struct也就是之前说的tree）
function seq2struct(seq) {
  /*
   * seq是数组
   * 递归。遇到序列尾或者 ) 即结束
   */
  let notes = []
  while(1) {
    const c = seq.shift() // 当前字符

    // 越界直接返回
    if ( c === undefined || c === ')' ) {
      return notes
    } 
    if ( /\s/.test(c) ) {
      continue
    } 

    if ( c==='(' ) {
      notes.push(seq2struct(seq))
    } 
    else if ( /\d/.test(c) ) { // 找到音符
      notes.push(c)
    } 
  }
}

export function parse(score) {
  let res = ''
  const bars = score.split('|')
  for (const bar of bars) {
    const seq = [...bar]
    const tree = seq2struct(seq)
    res += tree2jianpu(tree) + '|'
  }
  return res
}
