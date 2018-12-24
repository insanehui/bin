/*
 * 将音符格式转为jcx的吉他谱
 */
import _ from 'lodash'
import fromBar from '../musicFile/bar.js'
import fret from './fret.js'

global.lastNote = '1'

const gtString = {
  1 : 'a',
  2 : 'b',
  3 : 'c',
  4 : 'd',
  5 : 'e',
  6 : 'f',
}

function calcDuration(d) {
  d =d.toFraction()
  if ( d !== '1' ) {
    return `*${d}`
  } 
  return ''
}

function getPrefix(note) {
  let res = ''
  if ( note.arpeggio ) {
    res = 'B' + res
  } 
  else if ( note.downStroke ) {
    res = 'V' + res
  } 
  else if ( note.upStroke ) {
    res = 'U' + res
  } 

  if ( note.slide ) {
    res = '-S-' + res
  } 
  else if ( note.hammerOn ) {
    res = '-H-' + res
  } 
  else if ( note.pullOff ) {
    res = '-P-' + res
  } 

  if ( note.tie ) {
    res = '-' + res
  } 

  return res
}

function noteToJcxChordTab(note, duration) {
  let res = _.map(note.notes, v=>`${gtString[v]}x${duration}`).join('')
  if (note.size > 1) {
    res = `[${res}]`
  } 

  res = getPrefix(note) + res
  return res
}

function seq2tab(seq, opt) {
  let output = ''
  let lastChord = null
  for(const i in seq) {
    let {note, duration} = seq[i]
    const {chord} = note
    if ( chord ) { // 如果是和弦，打上和弦状态标记
      if ( chord !== '=' ) {
        lastChord = chord
        output += `"${chord}"`
      } 
      else {
        lastChord = null
      }
    } 

    // 如果第一个就是连音线
    // eslint-disable-next-line
    if ( i === '0' && note == '-' ) {
      output += '-'
      note = global.lastNote
    } 
    // eslint-disable-next-line
    else if ( note == '_PREVIOUS_' ) {
      note.notes = global.lastNote.notes
    } 
    global.lastNote = note

    duration = calcDuration(duration)

    if ( lastChord && !(note+'').includes('@') ) { // 如果处于和弦状态
      output += noteToJcxChordTab(note, duration)
    } 
    else {
      /*
       * 这里没有考虑非和弦形式的多声部转换
       */
      const name = fret(note, opt) 
      /*
       * ! muse好像对7处理有个bug，所以逢7就得拆开来显示. 但没有测试
       */
      let text
      if ( duration === '*7' ) {
          text = `${name}*6${name==='z'?'':'-'}${name}`
      } 
      else {
        text = name + duration
      }
      output += getPrefix(note) + text
    }
  }
  return output
}

function parseBar(score, opt) {
  const seq = fromBar(score, opt)
  // console.log('seq', seq)
  if ( !seq.length ) {
    return ''
  } 
  const res = seq2tab(seq, opt) + '|'
  return res
}

export default function parse(score, opt) {
  return score.split('|').map(x=>parseBar(x, opt)).join('')
}
