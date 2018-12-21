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

function noteToJcxChordTab(note, duration) {
  let res = _.map(note.notes, v=>`${gtString[v]}x${duration}`).join('')
  if (note.size > 1) {
    res = `[${res}]`
  } 
  if ( note.arpeggio ) {
    res = 'B' + res
  } 
  return res
}

function seq2tab(seq, opt) {
  let output = ''
  let lastChord = null
  for(const i in seq) {
    let {note, duration, chord} = seq[i]
    if ( chord ) { // 如果是和弦，打上和弦状态标记
      lastChord = chord
      output += `"${chord}"`
    } 

    duration = calcDuration(duration)

    if ( lastChord ) { // 如果处于和弦状态
      output += noteToJcxChordTab(note, duration)
    } 
    else {
      // 如果第一个就是连音线
      // eslint-disable-next-line
      if ( i === '0' && note == '-' ) {
        output += '-'
        note = global.lastNote
      } 
      global.lastNote = note
      /*
       * 这里没有考虑非和弦形式的多声部转换
       */
      output += fret(note, opt) + duration
    }

  }
  return output
}

function parseBar(score, opt) {
  const seq = fromBar(score, opt)
  if ( !seq.length ) {
    return ''
  } 
  const res = seq2tab(seq, opt) + '|'
  return res
}

export default function parse(score, opt) {
  return score.split('|').map(x=>parseBar(x, opt)).join('')
}
