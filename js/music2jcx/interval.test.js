import {note2number} from './interval.js'

describe('interval', () => {
  it('常规', () => {
    const para = [
      "1"
    ]
    const hope = 0
    const fact = note2number(...para)
    expect(fact).toEqual(hope)
  })


  it('低音', () => {
    const para = [
      "1."
    ]
    const hope = -12
    const fact = note2number(...para)
    expect(fact).toEqual(hope)
  })

  it('高音', () => {
    const para = [
      "5''"
    ]
    const hope = 31
    const fact = note2number(...para)
    expect(fact).toEqual(hope)
  })

});
