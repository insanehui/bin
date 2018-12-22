/*
 * 将音乐格式转为jcx的简谱或五线谱
 */
import parseMusic from '../musicFile/bar.js'
import jcxNote from './jcxNote.js'

global.lastNote = '1'

function name_duration(name, duration) {
  duration = duration.toFraction()
  if ( /^1$|^1\//.test(duration) ) { // 省掉不必要的1
    duration = duration.slice(1)
  } 

  /*
   * ！！对 7的特殊处理是muse的bug!
   */
  if ( duration === '7' ) {
    return `${name}6${name.toLowerCase()==='z'?'':'-'}${name}`
  } 
  else {
    return name+duration
  }
}

// 将collapse后的seq转成jcx的简谱格式（一小节）
function seq2JcxScore(seq) {
  /*
   * 会读取或者修改global.lastNote。因为要处理跨小节的连音线
   */
  let output = ''
  for(const i in seq) {
    let {note, duration} = seq[i]
    // 如果第一个就是连音线
    // eslint-disable-next-line
    if ( i === '0' && note == '-' ) {
      output += '-'
      note = global.lastNote
    } 
    global.lastNote = note
    const name = jcxNote(note)
    
    output += name_duration(name, duration)
  }
  return output
}

function parseBar(score) {
  const seq = parseMusic(score)
  const res = seq2JcxScore(seq) + '|'
  return res
}

// parseBar('- - (5.5.) 1')

export default function parse(score) {
  return score.split('|').map(parseBar).join('')
}
