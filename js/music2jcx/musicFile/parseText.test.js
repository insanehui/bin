import parse from './parseText.js'

describe('parseText', () => {
  it('基础', () => {
    const para = [
      "1--2-3"
    ]
    const hope = [
      { "notes": [ "1" ] },
      { "notes": [ "-" ] },
      { "notes": [ "-" ] },
      { "notes": [ "2" ] },
      { "notes": [ "-" ] },
      {
        "notes": [
          "3"
        ]
      }
    ]
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })
});
