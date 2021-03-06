import convert from './music2jcx.js'

describe('music2jcx', () => {
  it('生日歌', () => {
    const para = [
`
title : 生日歌
artist : 童话吉他编配
timeSign : 3/4
tempo : 1/4=90
key : C
tracks : 
  - name: guitar
    jcx: [tab, jianpu]
=================
<guitar> 0 0 (5.5.) | 6. 5. 1 | 7. - (5.5.) | 6. 5. 2 
w:      * * 祝 你    生 日 快  乐    祝你    生 日 快
<guitar> 1 - (5.5.) | 5 3 1 | 7. 6. (44) | 3 1 2 | 1 - -
w:      乐   祝你    生日快  乐 *  祝你   生日快  乐
`,
    ]
    const hope = `
%MUSE2
T: 生日歌
M: 3/4
L: 1/4
Q: 1/4=90
C: 童话吉他编配
K: C


V:guitar0 style=tab bracket=10
V:guitar1 style=jianpu 

[V:guitar0]
zzc0/2c0/2|c2c0b1|b0*2c0/2c0/2|c2c0b3|
b1*2c0/2c0/2|a3a0b1|b0c2a1/2a1/2|a0b1b3|b1*3|
[V:guitar1]
ZZG,/2G,/2|A,G,C|B,2G,/2G,/2|A,G,D|
w:      * * 祝 你    生 日 快  乐    祝你    生 日 快
C2G,/2G,/2|GEC|B,A,F/2F/2|ECD|C3|
w:      乐   祝你    生日快  乐 *  祝你   生日快  乐
    `
    const fact = convert(...para)
    expect(fact.trim()).toEqual(hope.trim())
  })

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
a0a0a1a3|a3a1a0b3|b1b1b3a0|a0*3/2b3/2b3*2|
a0a0a1a3|a3a1a0b3|b1b1b3a0|b3*3/2b1/2b1*2|
b3b3a0b1|b3a0/2a1/2a0b1|b3a1a0b3|b1b3a3*2|
a0a0a1a3|a3a1a0b3|b1b1b3a0|b3*3/2b1/2b1*2|
[V:guitar1]
EEFG|GFED|CCDE|E3/2D/2D2|
EEFG|GFED|CCDE|D3/2C/2C2|
DDEC|DE/2F/2EC|DFED|CDG2|
EEFG|GFED|CCDE|D3/2C/2C2|
    `
    const fact = convert(...para)
    expect(fact.trim()).toEqual(hope.trim())
  })

  it('多年以前', () => {
    const para = [
`
title : 多年以前
artist : 童话吉他编配
timeSign : 4/4
tempo : 1/4=90
key : C
tracks : 
  - name: guitar
    jcx: 
      - type: tab
        translate: -12
      - jianpu
=================
<guitar> 1 (12) 3 (34) | 5 (65) 3 - | 5 (43) 2 - | 4 (32) 1- 
<guitar> 1 (12) 3 (34) | 5 (65) 3 - | 5 (43) 2 (32) | 1---
<guitar> 5 (43) 2 (5.5.) | 4 (32) 1- | 5 (43) 2 (5.5.) | 4 (32) 1- 
<guitar> 1 (12) 3 (34) | 5 (65) 3 - | 5 (43) 2 (32) | 1---
`,
    ]
    const hope = `
%MUSE2
T: 多年以前
M: 4/4
L: 1/4
Q: 1/4=90
C: 童话吉他编配
K: C


V:guitar0 style=tab bracket=10
V:guitar1 style=jianpu 

[V:guitar0]
e3e3/2d0/2d2d2/2d3/2|c0c2/2c0/2d2*2|c0d3/2d2/2d0*2|d3d2/2d0/2e3*2|
e3e3/2d0/2d2d2/2d3/2|c0c2/2c0/2d2*2|c0d3/2d2/2d0d2/2d0/2|e3*4|
c0d3/2d2/2d0f3/2f3/2|d3d2/2d0/2e3*2|c0d3/2d2/2d0f3/2f3/2|d3d2/2d0/2e3*2|
e3e3/2d0/2d2d2/2d3/2|c0c2/2c0/2d2*2|c0d3/2d2/2d0d2/2d0/2|e3*4|
[V:guitar1]
CC/2D/2EE/2F/2|GA/2G/2E2|GF/2E/2D2|FE/2D/2C2|
CC/2D/2EE/2F/2|GA/2G/2E2|GF/2E/2DE/2D/2|C4|
GF/2E/2DG,/2G,/2|FE/2D/2C2|GF/2E/2DG,/2G,/2|FE/2D/2C2|
CC/2D/2EE/2F/2|GA/2G/2E2|GF/2E/2DE/2D/2|C4|
    `
    const fact = convert(...para)
    expect(fact.trim()).toEqual(hope.trim())
  })

  it('两只老虎', () => {
      const para = [
  `
title : 两只老虎
artist : 童话吉他编配
timeSign : 4/4
tracks : 
  - name: guitar
    jcx: tab
    beat: 1/8
  - name: melody
    jcx: jianpu
=================
<guitar> "C"53231323 | "C"53231323 | "C"53231323 | "C"53231323 
<melody> 1 2 3 1     | 1 2 3 1 | 3 4 5 - | 3 4 5 -
w:       两只老虎      两只老虎  跑得快    跑得快
<guitar> "C"53231323   | "C"53231323   | "G"6323"C"5323 | "G"6323"C"5323 
<melody> (56) (54) 3 1 | (56) (54) 3 1 | 2 5. 1 -       | 2 5. 1 - 
w:       一只没有眼睛    一只没有尾巴    真奇怪           真奇怪
  `,
      ]
      const hope = `
%MUSE2
T: 两只老虎
M: 4/4
L: 1/4
C: 童话吉他编配
K: C


V:guitar0 style=tab bracket=10
V:melody0 style=jianpu 

[V:guitar0]
"C"ex/2cx/2bx/2cx/2ax/2cx/2bx/2cx/2|"C"ex/2cx/2bx/2cx/2ax/2cx/2bx/2cx/2|"C"ex/2cx/2bx/2cx/2ax/2cx/2bx/2cx/2|"C"ex/2cx/2bx/2cx/2ax/2cx/2bx/2cx/2|
"C"ex/2cx/2bx/2cx/2ax/2cx/2bx/2cx/2|"C"ex/2cx/2bx/2cx/2ax/2cx/2bx/2cx/2|"G"fx/2cx/2bx/2cx/2"C"ex/2cx/2bx/2cx/2|"G"fx/2cx/2bx/2cx/2"C"ex/2cx/2bx/2cx/2|
[V:melody0]
CDEC|CDEC|EFG2|EFG2|
w:       两只老虎      两只老虎  跑得快    跑得快
G/2A/2G/2F/2EC|G/2A/2G/2F/2EC|DG,C2|DG,C2|
w:       一只没有眼睛    一只没有尾巴    真奇怪           真奇怪
      `
      const fact = convert(...para)
      expect(fact.trim()).toEqual(hope.trim())
    })

  it('生日歌弹唱', () => {
    const para = [
`
title : 生日歌
artist : 童话吉他编配
timeSign : 3/4
tracks : 
  - name: guitar
    jcx: tab
    beat : 1/8
  - name: melody
    jcx: jianpu
customChords : 
  F: 1;X,X,3,2,1,0
=================
<guitar> 0----- |   "C"532313  | "G"632313   | "G"632313   
<melody> 0 0 (5.5.) | 6. 5. 1 | 7. - (5.5.) | 6. 5. 2 
w:      * * 祝 你    生 日 快  乐    祝你    生 日 快
<guitar>  "C"532313  | "C"532313  | "F"432313  | "G"632313 | "C"532313  
<melody> 1 - (5.5.) | 5 3 1 | 7. 6. (44) | 3 1 2 | 1 - -
w:      乐   祝你    生日快  乐 *  祝你   生日快  乐
`,
    ]
    const hope = `
%MUSE2
T: 生日歌
M: 3/4
L: 1/4
C: 童话吉他编配
K: C

%%gchord F=1;X,X,3,2,1,0

V:guitar0 style=tab bracket=10
V:melody0 style=jianpu 

[V:guitar0]
z*3|"C"ex/2cx/2bx/2cx/2ax/2cx/2|"G"fx/2cx/2bx/2cx/2ax/2cx/2|"G"fx/2cx/2bx/2cx/2ax/2cx/2|
"C"ex/2cx/2bx/2cx/2ax/2cx/2|"C"ex/2cx/2bx/2cx/2ax/2cx/2|"F"dx/2cx/2bx/2cx/2ax/2cx/2|"G"fx/2cx/2bx/2cx/2ax/2cx/2|"C"ex/2cx/2bx/2cx/2ax/2cx/2|
[V:melody0]
ZZG,/2G,/2|A,G,C|B,2G,/2G,/2|A,G,D|
w:      * * 祝 你    生 日 快  乐    祝你    生 日 快
C2G,/2G,/2|GEC|B,A,F/2F/2|ECD|C3|
w:      乐   祝你    生日快  乐 *  祝你   生日快  乐
    `
    const fact = convert(...para)
    expect(fact.trim()).toEqual(hope.trim())
  })

});
