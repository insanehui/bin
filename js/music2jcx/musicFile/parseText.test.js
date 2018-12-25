import parse from './parseText.js'

describe('parseText', () => {
  it('基础', () => {
    const para = [
      `"C"5[1-]  [2..#1@3-  ]1 "Am"b2.3'' -#4`
    ]
    const hope = [
      { "notes": [ "5" ],  chord : 'C',}, 
      { "notes": [ "1", "-" ] },
      { "notes": [ "2..", "#1@3", '-' ] },
      { "notes": [ "1" ] },
      { "notes": [ "b2." ], chord : 'Am' },
      { "notes": [ "3''" ] },
      { "notes": [ "-" ] },
      { "notes": [ "#4" ] },
    ]
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('击勾弦，滑弦', () => {
    const para = [
      `#4@2s5@2 h5 p4`
    ]
    const hope = [
      { "notes": [ "#4@2" ], }, 
      { "notes": [ "5@2" ], slide : true}, 
      { "notes": [ "5" ], hammerOn : true}, 
      { "notes": [ "4" ], pullOff : true}, 
    ]
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('综合', () => {
    const para = [
      `"C"(5 ([1-][2..#1-]) 1) =3 "Am"b2._3'' -#4 [123]$`
    ]
    const hope = [
      [
        { "notes": [ "5" ],  chord : 'C',}, 
        [
          { "notes": [ "1", "-" ] },
          { "notes": [ "2..", "#1", '-' ] },
        ],
        { "notes": [ "1" ] },
      ],
      { "notes": [ "3" ], chord : '=' },
      { "notes": [ "b2." ], chord : 'Am' },
      { "notes": [ "3''" ] , tie : true},
      { "notes": [ "-" ] },
      { "notes": [ "#4" ] },
      { "notes": [ '1', '2', '3'], arpeggio : true},
    ]
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

  it('有括号的和弦', () => {
    const para = [
      '"F(3)"12'
    ]
    const hope = [
      { "notes": [ "1" ], chord : 'F(3)' },
      { "notes": [ "2" ], },
    ]
    const fact = parse(...para)
    expect(fact).toEqual(hope)
  })

});
