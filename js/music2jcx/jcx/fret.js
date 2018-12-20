/*
 * 将音符转成jcx的指板标记
 */
import {findNote} from '../guitar.js'

const table = {
  '1' : 'a',
  '2' : 'b',
  '3' : 'c',
  '4' : 'd',
  '5' : 'e',
  '6' : 'f',
}

export default function jcxFret(note, opt) {
  const {string,fret} = findNote(note, opt)
  if ( !string ) {
    return 'z' // 休止符
  } 
  return `${table[string]}${fret}`
}
