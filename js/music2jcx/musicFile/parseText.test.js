import parse from './parseText.js'

describe('parseText', () => {

  it('基础', () => {
    const para = [
      "1-2#1- 1b23 -#4"
    ]
    const hope = [
      { "notes": [ "1" ] },
      { "notes": [ "-" ] },
      { "notes": [ "2" ] },
      { "notes": [ "#1" ] },
      { "notes": [ "-" ] },
      { "notes": [ "1" ] },
      { "notes": [ "b2" ] },
      { "notes": [ "3" ] },
      { "notes": [ "-" ] },
      { "notes": [ "#4" ] },
    ]
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })
});
