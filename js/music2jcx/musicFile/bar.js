/*
 * 解释music类型文件. 转成一个序列的格式
 * 目前暂时先处理一个小节. 后面看看怎么扩展
 */
import {fraction} from 'mathjs'

/*
 * 找到当前和弦. 没有和弦则表示这是普通音符
 */
function getChord(text) {
  text = text.trim()
  const chordReg = /^"(\S+)"/
  const exec = chordReg.exec(text)
  if ( !exec ) {
    return {
      text,
    }
  } 
  return {
    text : text.replace(chordReg, ''),
    chord : exec[1],
  }
}

// 将一个音符系列转成结构化的数据（这里的struct也就是之前说的tree）
function text2struct(text) {
  /*
   * text可以是字符串也可以是数组
   * 递归。遇到序列尾或者 ) 即结束
   */
  if ( typeof text === 'string' ) {
    text = [...text]
  } 
  let notes = []
  let note = null // 当前音符
  let state = 'blank'
  while(1) {
    const c = text.shift() // 当前字符

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
      notes.push(text2struct(text))
      state = 'blank'
    } 
    else if ( /[\d-]/.test(c) ) { // 找到音符, - 也暂时代表音符
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

// 将树状的数据结构平铺成序列的格式
function structFlattern(tree, len = fraction(tree.length)) {
  /*
   * 最终得到一个音符 + 时值组成的数组
   */
  let res = []
  const duration = len.div(tree.length)
  for (const item of tree) {
    if ( typeof item === 'string' ) { // 这是一个音符
      res.push({
        note : item,
        duration,
      })
    } 
    // 如果是一串音符
    else if ( Array.isArray(item) ) {
      res = [...res, ...structFlattern(item, duration)]
    } 
  }
  return res
}

// 将有连音线的序列合并
function seqCollapse(seq) {
  const res = []
  for(const i in seq) {
    const item = seq[i]
    const {note, duration} = item
    if ( note !== '-' || i === '0') { // 注：这里要用 '0' 而不是 0！否则条件会不成立
      /*
       * 如果第一个就是延音线，还是先插入
       */
      res.push(item)
    } 
    else {
      const lastNote = res[res.length-1]
      lastNote.duration = lastNote.duration.add(duration)
    }
  }
  return res
}

export default function parse(str) {
  const {chord, text} = getChord(str)
  let res = text2struct(text)
  res = structFlattern(res)
  res = seqCollapse(res)
  res.chord = chord
  return res
}
