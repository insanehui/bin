import Note from '../Note.js'

export default function parse(text) {
  /*
   * text可以是字符串也可以是数组
   * 递归。遇到序列尾或者 ) 即结束
   */
  if ( typeof text === 'string' ) {
    text = [...text]
  } 

  let notes = []
  let multiNote = new Note()
  let singleNote = ''
  let chord = ''
  let c = ''

  let fMulti = false

  function collectNotes() {
    notes.push(multiNote)
    multiNote = new Note()
    // 不动singleNote
  }

  function collectMulti() {
    if ( singleNote ) {
      multiNote.add(singleNote)
      singleNote = ''
      if ( !fMulti ) {
        collectNotes()
      } 
    } 
  }

  function beginSingle() {
    collectMulti()
    singleNote = c
  }

  function collectSingle() {
    singleNote += c
  }

  while(1) {
    c = text.shift() // 当前字符

    // console.log('before', c, JSON.stringify(notes), JSON.stringify(multiNote), singleNote, fMulti)

    // 越界直接返回
    if ( c === undefined || c === ')' ) {
      collectMulti()
      return notes
    } 
    else if( /[\d-]/.test(c) ){ // 音符主体
      if ( /^[b#]$/.test(singleNote) ) {
        collectSingle()
      } 
      else {
        beginSingle()
      }
    }
    else if ( /[b#]/.test(c) ) { // 升降号
      beginSingle()
    } 
    else if ( /[.']/.test(c) ) { // 高低音
      collectSingle()
    } 
    else if ( /[\[\]]/.test(c) ) { // 多声部
      collectMulti()
      if ( /\[/.test(c) ) {
        fMulti = true
      } 
      else if ( /]/.test(c) ) {
        collectNotes()
        fMulti = false
      } 
    } 
    // console.log('after', JSON.stringify(notes), JSON.stringify(multiNote))
    // 其他情况直接无视
  }
}

