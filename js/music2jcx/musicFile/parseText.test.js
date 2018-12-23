import parse from './parseText.js'

describe('parseText', () => {
  it('基础', () => {
    const para = [
      `"C"5[1-]  [2..#1-  ]1 "Am"b2.3'' -#4`
    ]
    const hope = [
      { "notes": [ "5" ],  chord : 'C',}, 
      { "notes": [ "1", "-" ] },
      { "notes": [ "2..", "#1", '-' ] },
      { "notes": [ "1" ] },
      { "notes": [ "b2." ], chord : 'Am' },
      { "notes": [ "3''" ] },
      { "notes": [ "-" ] },
      { "notes": [ "#4" ] },
    ]
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('综合', () => {
    const para = [
      `"C"(5[1-])  [2..#1-  ]1 "Am"b2.3'' -#4`
    ]
    const hope = [
      [{ "notes": [ "5" ],  chord : 'C',}, { "notes": [ "1", "-" ] },],
      { "notes": [ "2..", "#1", '-' ] },
      { "notes": [ "1" ] },
      { "notes": [ "b2." ], chord : 'Am' },
      { "notes": [ "3''" ] },
      { "notes": [ "-" ] },
      { "notes": [ "#4" ] },
    ]
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })
});
