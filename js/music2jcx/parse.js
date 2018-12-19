import parseMusic from './musicFile.js'
import jcxNote from './jcxNote.js'

global.lastNote = '1'

// 将collapse后的seq转成jcx的简谱格式（一小节）
function seq2JcxScore(seq) {
  /*
   * 会读取或者修改global.lastNote。因为要处理跨小节的连音线
   */
  let output = ''
  for(const i in seq) {
    let {note, duration} = seq[i]
    // 如果第一个就是连音线
    if ( i === '0' && note === '-' ) {
      output += '-'
      note = global.lastNote
    } 
    global.lastNote = note
    output += jcxNote(note)
    if ( duration<1 ) {
      output += `/${1/duration}`
    } 
    else if(duration>1) {
      output += duration
    }
  }
  return output
}

function parseBar(score) {
  const seq = parseMusic(score)
  const res = seq2JcxScore(seq) + '|'
  return res
}

// parseBar('- - (5.5.) 1')

export function parse(score) {
  return score.split('|').map(parseBar).join('')
}
