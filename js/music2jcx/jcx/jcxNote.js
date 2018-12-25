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
  note = note+''
  let prefix = ''
  if ( /^[b#]/.test(note) ) {
    prefix = (note[0] === 'b' ? '_' : '^')
    note = note.slice(1)
  } 

  const name = note[0]
  const tail = note.slice(1)
  const newNote = prefix + (noteTable[name]||name) + tail.replace(/\./g, ',')
  return newNote
}
