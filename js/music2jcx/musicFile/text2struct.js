/*
 * 将文本解析为原始的数据结构。即曲谱解析的第一步
 */
import Note from '../Note.js'

function setDecor(note, c) {
  if ( c === '$' ) { 
    note.arpeggio = true 
  } 
  else if( c === 'v'){
    note.upStroke = true 
  }
  else if ( c === '^' ) {
    note.downStroke = true 
  } 
}

// function text2struct_new(text) {
//   /*
//    * text可以是字符串也可以是数组
//    * 递归。遇到序列尾或者 ) 即结束
//    */
//   if ( typeof text === 'string' ) {
//     text = [...text]
//   } 

//   let notes = []
//   let state = 'init'
//   let multiNote = new Note()
//   let singleNote = ''
//   let chord = ''
//   let c = ''

//   function pushNote() {
//     notes.push(multiNote)
//     multiNote = new Note()
//   }

//   function collectSingle() {
//     singleNote += c
//   }

//   function collectMulti() {
//     multiNote.add(singleNote)
//     singleNote = ''
//   }

//   while(1) {
//     c = text.shift() // 当前字符

//     console.log('>', c, state, JSON.stringify(notes))

//     // 越界直接返回
//     if ( c === undefined || c === ')' ) {
//       return notes
//     } 
//     if ( c === '[' ) {
//       state = 'multi_begin'
//     } 
//     else if( c === ']'){
//       state = 'multi_end'
//     }
//     else if ( c === '"' ) { // 和弦标记
//       if ( state === 'chord_inside' ) {
//         state = 'chord_end'
//       } 
//       else {
//         state = 'chord_begin'
//       }
//     } 
//     else if ( c === '=' ) { // 取消和弦的标记
//       note.chord = '='
//       state = 'wait_note'
//     } 
//     else if ( c === '_' ) { // 可以连不同的音符
//       note.tie = true
//       state = 'wait_note'
//     } 
//     else if ( /\s/.test(c) ) {
//       pushNote()
//       state = 'wait_note'
//     } 
//     else if ( c==='(' ) {
//       pushNote()
//       notes.push(text2struct_new(text))
//       state = 'wait_note'
//     } 
//     else if ( /[b#]/.test(c) ) { // 升降号
//       if ( state === 'multi_node' ) {
//         collectMulti()
//       } 
//       else if(state === 'node'){
//         collectMulti()
//         pushNote()
//       }
//       collectSingle()
//     } 
//     else if ( /[\d-]/.test(c) ) { // 找到音符, - 也暂时代表音符
//       if ( state === 'multi_begin' ){
//         state = 'multi_node'
//       } 
//       else if ( state === 'multi_node' ) {
//         collectMulti()
//       } 
//       else if ( state === 'note' ) {
//         collectMulti()
//         pushNote()
//         state = 'note'
//       } 
//       else {
//         collectSingle()
//       }
//     } 
//     else { // 不改变当前state
//       if ( state === 'chord' ) {
//         chord += c
//       } 
//       else if ( /[$v^]/.test(c) ) { 
//         if ( state === 'note' || state === 'multi_end' ) {
//           setDecor(multiNote, c)
//           if ( state === 'note' ) {
//             state = 'single_decor'
//           } 
//           else if(state === 'multi_end'){
//             state = 'multi_decor'
//           }
//         } 
//         else if ( state.endsWith('decor') ) { // 如果紧跟着又来了一个装饰符号，则意味着使用上一个音
//           pushNote()
//           multiNote = new Note('_PREVIOUS_' )
//           setDecor(multiNote, c)
//           state = 'multi_end'
//         } 
//       } 
//       else {
//         singleNote += c
//       }
//     } 
//   }
// }

export default function text2struct(text) {

  /*
   * text可以是字符串也可以是数组
   * 递归。遇到序列尾或者 ) 即结束
   */
  if ( typeof text === 'string' ) {
    text = [...text]
  } 
  let notes = []
  let singleNote = '' // 当前音符
  let multiNote = new Note()
  let chord = ''

  let state = 'reset'

  /*
   * 注意：pushNote函数不能改state！，切记！！
   */
  function pushNote() {
    if ( state === 'note' || state === 'single_decor' ) { // 单音完成
      const item = {
        note : new Note(singleNote),
        ...(chord && {chord}),
      }
      notes.push(item)
      singleNote = ''
      chord = ''
    } 
    else if ( state === 'multi_end' || state === 'multi_decor') { // 和音完成
      const item = {
        note : multiNote,
        ...(chord && {chord}),
      }
      notes.push(item)
      chord = ''
      singleNote = ''
      multiNote = new Note()
    } 
    else if ( state === 'multi_note' ) { // 和音收集
      multiNote.add(singleNote)
      singleNote = ''
    } 
  }

  while(1) {
    const c = text.shift() // 当前字符
    // console.log('>', c, state, JSON.stringify(notes), JSON.stringify(multiNote))

    // 越界直接返回
    if ( c === undefined || c === ')' ) {
      pushNote()
      // console.log('notes', notes)
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
    else if ( c === '_' ) { // 可以连不同的音符
      pushNote()
      multiNote.tie = true
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
    else if ( /[b#]/.test(c) ) { // 升降号
      pushNote()
      singleNote = c
    } 
    else if ( /[\d-]/.test(c) ) { // 找到音符, - 也暂时代表音符
      pushNote()
      if ( state in {multi_begin:1, multi_note:1} ) {
        state = 'multi_note'
      } 
      else {
        state = 'note'
      }
      singleNote += c
    } 
    else { // 不改变当前state
      if ( state === 'chord' ) {
        chord += c
      } 
      else if ( /[$v^]/.test(c) ) { 
        if ( state === 'note' || state === 'multi_end' ) {
          setDecor(multiNote, c)
          if ( state === 'note' ) {
            state = 'single_decor'
          } 
          else if(state === 'multi_end'){
            state = 'multi_decor'
          }
        } 
        else if ( state.endsWith('decor') ) { // 如果紧跟着又来了一个装饰符号，则意味着使用上一个音
          pushNote()
          multiNote = new Note('_PREVIOUS_' )
          setDecor(multiNote, c)
          state = 'multi_end'
        } 
      } 
      else {
        singleNote += c
      }
    } 
  }
}


