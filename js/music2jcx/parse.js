import jcxNote from './jcxNote.js'

function tree2jianpu(tree, beats = tree.length) {
  let output = ''
  const x = beats / tree.length
  for (const item of tree) {
    if ( typeof item === 'string' ) {
      output += jcxNote(item)
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
  let note = null // 当前音符
  let state = 'blank'
  while(1) {
    const c = seq.shift() // 当前字符

    // 越界直接返回
    if ( c === undefined || c === ')' ) {
      if ( state === 'note' ) {
        notes.push(note)
      } 
      return notes
    } 
    if ( /\s/.test(c) ) {
      if ( state === 'note' ) {
        notes.push(note)
      } 
      state = 'blank'
      continue
    } 

    if ( c==='(' ) {
      notes.push(seq2struct(seq))
      state = 'blank'
    } 
    else if ( /\d/.test(c) ) { // 找到音符
      if ( state === 'note' ) {
        notes.push(note)
      } 
      note = c
      state = 'note'
    } 
    else {
      note += c
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
