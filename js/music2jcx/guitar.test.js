import {findNote} from './guitar.js'

describe('guitar', () => {
  it('1', () => {
    const para = [
      "1"
    ]
    const hope = {
      "string": 2,
      "fret": 1
    }
    const fact = findNote(...para)
    expect(fact).toEqual(hope)
  }) 

  it('5.', () => {
    const para = [
      "5."
    ]
    const hope = {
      "string": 3,
      "fret": 0
    }
    const fact = findNote(...para)
    expect(fact).toEqual(hope)
  })

  it('升号', () => {
    const para = [
      "b3'"
    ]
    const hope = {
      "string": 1,
      "fret": 11
    }
    const fact = findNote(...para)
    expect(fact).toEqual(hope)
  })

  it('降号', () => {
    const para = [
      "b5.."
    ]
    const hope = {
      "string": 6,
      "fret": 2
    }
    const fact = findNote(...para)
    expect(fact).toEqual(hope)
  })

  it('指定弦', () => {
    const para = [
      "#1@3"
    ]
    const hope = {
      "string": 3,
      "fret": 6,
    }
    const fact = findNote(...para)
    expect(fact).toEqual(hope)
  })

});
