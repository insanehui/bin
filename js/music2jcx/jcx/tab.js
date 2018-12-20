/*
 * 将音符格式转为jcx的吉他谱
 */
import parseMusic from '../musicFile/bar.js'
import fret from './fret.js'

global.lastNote = '1'

function seq2tab(seq, opt) {
  let output = ''
  for(const i in seq) {
    let {note, duration} = seq[i]
    // 如果第一个就是连音线
    if ( i === '0' && note === '-' ) {
      output += '-'
      note = global.lastNote
    } 
    global.lastNote = note

    output += fret(note, opt)
    duration = duration.toFraction()
    if ( duration !== '1' ) {
      output += `*${duration}`
    } 
  }
  return output
}

function parseBar(score, opt) {
  const seq = parseMusic(score, opt)
  const res = seq2tab(seq, opt) + '|'
  return res
}

export default function parse(score, opt) {
  return score.split('|').map(x=>parseBar(x, opt)).join('')
}
