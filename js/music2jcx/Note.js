/*
 * Note类，支持多个声音同时发声
 */
export default class Note {
  // 其他对象直接加
  notes = []

  constructor(note) {
    if ( note ) {
      this.notes.push(note)
    } 
  }

  add(note){
    this.notes.push(note)
  }

  toString(){
    return this.notes.join('')
  }

  get size(){
    return this.notes.length
  }

}
