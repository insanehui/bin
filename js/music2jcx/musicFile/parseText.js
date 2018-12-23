import Note from '../Note.js'

let chord = ''
let lastMultiSeq = null

function harmonyWithoutPostfix(multiNote) {
  return multiNote.size > 1 
    && multiNote.arpeggio === undefined 
    && multiNote.downStroke === undefined 
    && multiNote.upStroke === undefined
}

function setMultiNotePostfix(multiNote, c) {
  if ( c === '$' ) {
    multiNote.arpeggio = true
  } 
  else if ( c === '^' ) {
    multiNote.downStroke = true
  } 
  else if ( c === 'v' ) {
    multiNote.upStroke = true
  } 
}

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
  let c = ''

  let fMulti = false
  let fChord = false

  function collectNotes() {
    if ( multiNote.size ) {
      if ( chord ) {
        multiNote.chord = chord // 消费chord
        chord = '' // 谁消费谁清空
      } 
      notes.push(multiNote)
      if ( multiNote.size > 1 ) {
        lastMultiSeq = multiNote.notes
      } 
      multiNote = new Note()
      // 不动singleNote
    } 
  }

  function collectMulti() {
    if ( singleNote ) {
      multiNote.add(singleNote)
      singleNote = ''
    } 
    if ( !fMulti ) {
      collectNotes()
    } 
  }

  function beginSingle() {
    collectMulti()
    singleNote = c
  }

  function collectSingle() {
    singleNote += c
  }

  function collectAbbrMulti() {
    multiNote.notes = lastMultiSeq
    setMultiNotePostfix(multiNote, c)
    collectNotes()
  }

  while(1) {
    c = text.shift() // 当前字符

    console.log(`>>>>>>> c:${c} | singleNote:${singleNote} | chord:${chord} | fMulti:${fMulti} | notes:${JSON.stringify(notes)} | multiNote:${JSON.stringify(multiNote)} | lastMultiSeq:${JSON.stringify(lastMultiSeq)}`)

    // 越界直接返回
    if ( c === undefined || c === ')' ) {
      collectMulti()
      collectNotes() // 强制collect notes
      return notes
    } 

    if ( fChord && /[^"]/.test(c) ) { // 收集和弦
      chord += c
      continue
    } 

    if( /[\d-]/.test(c) ){ // 音符主体
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
    else if ( /_/.test(c) ) { // tie属性
      collectMulti()
      multiNote.tie = true
    } 
    else if ( /[.']/.test(c) ) { // 高低音
      collectSingle()
    } 
    else if ( /[$v^]/.test(c) ) { // 吉他弹奏技巧
      if ( harmonyWithoutPostfix(multiNote)) {
        setMultiNotePostfix(multiNote, c)
      } 
      else {
        collectMulti()
        collectAbbrMulti()
      }
    } 
    else if ( /[[\]]/.test(c) ) { // 多声部
      collectMulti()
      if ( /\[/.test(c) ) {
        collectNotes()
        fMulti = true
      } 
      else if ( /]/.test(c) ) {
        fMulti = false
      } 
    } 
    else if ( /["=]/.test(c) ) { // 和弦
      if ( /"/.test(c) ) { // 和弦符号
        if ( fChord ) {
        } 
        else {
          collectMulti()
        }
        fChord = !fChord
      } 
      else if ( /=/.test(c) ) { // 取消和弦
        collectMulti()
        chord = '='
      } 
    } 
    else if ( /\(/.test(c) ) { // 递归
      collectMulti()
      notes.push(parse(text))
    } 
    console.log(`<<<<<<< c:${c} | singleNote:${singleNote} | chord:${chord} | fMulti:${fMulti} | notes:${JSON.stringify(notes)} | multiNote:${JSON.stringify(multiNote)} | lastMultiSeq:${JSON.stringify(lastMultiSeq)}`)
    // 其他情况直接无视
  }
}

