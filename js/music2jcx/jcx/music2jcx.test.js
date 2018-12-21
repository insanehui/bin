import convert from './music2jcx.js'

describe('music2jcx', () => {
  it('欢乐颂', () => {
    const para = [
`
title : 欢乐颂
artist : 童话吉他编配
timeSign : 4/4
tracks : 
  - name: guitar
    jcx: [tab, jianpu]
=================
<guitar> 3 3 4 5 | 5 4 3 2 | 1 1 2 3 | 3 (-2) 2 -
<guitar> 3 3 4 5 | 5 4 3 2 | 1 1 2 3 | 2 (-1) 1 -
<guitar> 2 2 3 1 | 2 (34) 3 1 | 2 4 3 2 | 1 2 5 -
<guitar> 3 3 4 5 | 5 4 3 2 | 1 1 2 3 | 2 (-1) 1 -
`,
    ]
    const hope = `
%MUSE2
T: 欢乐颂
M: 4/4
L: 1/4
C: 童话吉他编配
K: C

V:guitar0 style=tab bracket=10
V:guitar1 style=jianpu 

[V:guitar0]
a0a0a1a3|a3a1a0b3|b1b1b3a0|a0*3/2b3*1/2b3*2|
a0a0a1a3|a3a1a0b3|b1b1b3a0|b3*3/2b1*1/2b1*2|
b3b3a0b1|b3a0*1/2a1*1/2a0b1|b3a1a0b3|b1b3a3*2|
a0a0a1a3|a3a1a0b3|b1b1b3a0|b3*3/2b1*1/2b1*2|
[V:guitar1]
EEFG|GFED|CCDE|E3/2D/2D2|
EEFG|GFED|CCDE|D3/2C/2C2|
DDEC|DE/2F/2EC|DFED|CDG2|
EEFG|GFED|CCDE|D3/2C/2C2|
    `
    const fact = convert(...para)
    expect(fact.trim()).toEqual(hope.trim())
  })

  xit('简单分解', () => {
    const para = [
`
title : 简单分解
timeSign : 4/4
tracks : 
  - name: guitar
    jcx: tab
    beat: 1/8
=================
<guitar> "C"53231323
`,
    ]
    const hope = `
    `
    const fact = convert(...para)
    expect(fact).toEqual(hope)
  })
});
