/*
 * 将自己的note格式转成jcx的note
 */
const noteTable = {
  '1' : 'C',
  '2' : 'D',
  '3' : 'E',
  '4' : 'F',
  '5' : 'G',
  '6' : 'A',
  '7' : 'B',
  '0' : 'Z',
}

export default function jcxNote(note){
  // 将首字母替换
  const name = note[0]
  const tail = note.slice(1)
  const newNote = (noteTable[name]||name) + tail.replace(/\./g, ',')
  return newNote
}
