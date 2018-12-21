/*
 * Note类，支持多个声音同时发声
 */
export default class Note {
  notes = []

  constructor(note) {
    this.notes.push(note)
  }

  add(note){
    this.notes.push(note)
  }

  toString(){
    return this.notes.join('')
  }

}
