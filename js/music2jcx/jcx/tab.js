/*
 * 将音符格式转为jcx的吉他谱
 */
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

function seq2tab(seq, opt) {
  let output = ''
  let lastChord = null
  for(const i in seq) {
    let {note, duration, chord} = seq[i]
    if ( chord ) { // 如果是和弦，打上和弦状态标记
      lastChord = chord
      output += `"${chord}"`
    } 
    if ( lastChord ) { // 如果处于和弦状态
      output += `${gtString[note]}x`
    } 
    else {
      // 如果第一个就是连音线
      if ( i === '0' && note == '-' ) {
        output += '-'
        note = global.lastNote
      } 
      global.lastNote = note

      output += fret(note, opt)
    }
    duration = duration.toFraction()
    if ( duration !== '1' ) {
      output += `*${duration}`
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
