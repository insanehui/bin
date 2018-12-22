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
  let multiNote = new Note()
  let chord = ''

  let state = 'reset'

  /*
   * 注意：pushNote函数不能改state！，切记！！
   */
  function pushNote() {
    if ( state === 'note') { // 单音完成
      const item = {
        note : new Note(singleNote),
        ...(chord && {chord}),
      }
      notes.push(item)
      chord = ''
    } 
    else if ( state === 'multi_end' ) { // 和音完成
      const item = {
        note : multiNote,
        ...(chord && {chord}),
      }
      notes.push(item)
      chord = ''
      multiNote = new Note()
    } 
    else if ( state === 'multi_note' ) { // 和音收集
      multiNote.add(singleNote)
    } 
  }

  while(1) {
    const c = text.shift() // 当前字符

    // 越界直接返回
    if ( c === undefined || c === ')' ) {
      pushNote()
      return notes
    } 
    if ( c === '[' ) {
      pushNote()
      state = 'multi_begin'
    } 
    else if( c === ']'){
      pushNote()
      state = 'multi_end'
    }
    else if ( c === '"' ) { // 和弦标记
      if ( state !== 'chord' ) {
        pushNote()
        state = 'chord'
      } 
      else { // 处于和弦状态
        state = 'reset'
      }
    } 
    else if ( c === '=' ) { // 取消和弦的标记
      pushNote()
      chord = '='
      state = 'reset'
    } 
    else if ( /\s/.test(c) ) {
      pushNote()
      state = 'reset'
      continue
    } 
    else if ( c==='(' ) {
      pushNote()
      notes.push(text2struct(text))
      state = 'reset'
    } 
    else if ( /[\d-]/.test(c) ) { // 找到音符, - 也暂时代表音符
      pushNote()
      if ( state in {multi_begin:1, multi_note:1} ) {
        state = 'multi_note'
      } 
      else {
        state = 'note'
      }
      singleNote = c
    } 
    else { // 不改变当前state
      if ( state === 'chord' ) {
        chord += c
      } 
      else if ( c === '$' ) { // 往下的琶音
        if ( state === 'note' || state === 'multi_end' ) {
          multiNote.arpeggio = true 
        } 
      } 
      else {
        singleNote += c
      }
    } 
  }
}
