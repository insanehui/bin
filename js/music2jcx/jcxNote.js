/*
 * 将自己的note格式转成jcx的note
 */
const noteTable = {
  '1' : 'c',
  '2' : 'd',
  '3' : 'e',
  '4' : 'f',
  '5' : 'g',
  '6' : 'a',
  '7' : 'b',
  '0' : 'z',
}

export default function jcxNote(note){
  // 将首字母替换
  const name = note[0]
  const tail = note.slice(1)
  const newNote = (noteTable[name]||name) + tail.replace(/\./g, ',')
  return newNote
}
