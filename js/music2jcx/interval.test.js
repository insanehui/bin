import {note2number} from './interval.js'

describe('interval', () => {
  it('常规', () => {
    const para = [
      "1"
    ]
    const hope = 1
    const fact = note2number(...para)
    expect(fact).toEqual(hope)
  })


  it('低音', () => {
    const para = [
      "1."
    ]
    const hope = -11
    const fact = note2number(...para)
    expect(fact).toEqual(hope)
  })

  it('高音', () => {
    const para = [
      "5''"
    ]
    const hope = 29
    const fact = note2number(...para)
    expect(fact).toEqual(hope)
  })

});
