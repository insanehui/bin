/*
 * 将文本解析为原始的数据结构。即曲谱解析的第一步
 */
import Note from '../Note.js'

export default function text2struct(text) {

  /*
   * text可以是字符串也可以是数组
   * 递归。遇到序列尾或者 ) 即结束
   */
  if ( typeof text === 'string' ) {
    text = [...text]
  } 
  let notes = []
  let singleNote = null // 当前音符
  let chord = ''
  let state = 'reset'

  function pushNote() {
    if ( state === 'note' ) {
      const item = {
        note : new Note(singleNote),
        ...(chord && {chord}),
      }
      notes.push(item)
      chord = ''
    } 
  }

  while(1) {
    const c = text.shift() // 当前字符

    // 越界直接返回
    if ( c === undefined || c === ')' ) {
      pushNote()
      return notes
    } 

    if ( c === '"' ) { // 和弦标记
      if ( state !== 'chord' ) {
        pushNote()
        state = 'chord'
      } 
      else { // 处于和弦状态
        state = 'reset'
      }
    } 
    else if ( /\s/.test(c) ) {
      pushNote()
      state = 'reset'
      continue
    } 
    else if ( c==='(' ) {
      notes.push(text2struct(text))
      state = 'reset'
    } 
    else if ( /[\d-]/.test(c) ) { // 找到音符, - 也暂时代表音符
      pushNote()
      singleNote = c
      state = 'note'
    } 
    else {
      if ( state === 'chord' ) {
        chord += c
      } 
      else {
        singleNote += c
      }
    } 
  }
}
