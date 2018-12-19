/*
 * 将音符格式转为jcx的吉他谱
 */
import parseMusic from '../musicFile.js'
import fret from './fret.js'

global.lastNote = '1'

function seq2tab(seq) {
  let output = ''
  for(const i in seq) {
    let {note, duration} = seq[i]
    // 如果第一个就是连音线
    if ( i === '0' && note === '-' ) {
      output += '-'
      note = global.lastNote
    } 
    global.lastNote = note

    output += fret(note)

    if ( duration<1 ) {
      output += `/${1/duration}`
    } 
    else if(duration>1) {
      output += `*${duration}`
    }
  }
  return output
}

function parseBar(score) {
  const seq = parseMusic(score)
  const res = seq2tab(seq) + '|'
  return res
}

export default function parse(score) {
  return score.split('|').map(parseBar).join('')
}
