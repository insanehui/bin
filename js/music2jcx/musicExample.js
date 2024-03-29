// const musicExample = (`
// title : [旅行的意义, 陈绮贞]
// artist : 童话吉他编配
// timeSign : 4/4
// beat : 1/8
// tracks : 
//   - name: guitar
//     jcx: tab
//   - name: melody
//     jcx: jianpu
// patterns : 
//     C : '"C"53231323'
//     Am : '"Am"53231323'
//     F : '"F"43231323'
//     F2 : '"F"4323'
//     G : '"G"63231323'
//     G2 : '"G"6323'
//     Em : '"Em"63231323'
// customChords : 
//   F: 1;X,X,3,2,1,0
// =================
// <guitar> 0-------
// <melody> 0------5.
// <guitar> %C |%Am
// <melody> 2(33)-(23)(-2)(-5.) -(-3.)|7.(11)-(7.1)(-7.)(-3.)(--)(-3.)
// w: 你看过了许多美景 你看过了许多美女 你
// <guitar> %F |%G
// <melody> 3(44) -(34) - 3 6. 1|1 (11) (-2)3 2- -(-5.)
// w: 迷失在地图上每一道短暂的光阴 你
// <guitar> %C |%Am
// <melody> 2(33)-(23)(-2)(-5.) -(-3.)|7.1 1(7.1) (-2)(-3) -(-6.)
// w: 品尝了夜的巴黎 你踏过下雪的北京 你
// <guitar> %F |%G
// <melody> 3(44) -(34) - 3 6. 1|1 (11) (-2)3 2- 34
// w: 熟记书本里每一句你最爱的真理 却说
// <guitar> %Em |%Am
// <melody> 5(-5) -(55) -(44) -4 |3- -- -- 23
// w: 不出你爱我的原因 却说
// <guitar> %F |%G
// <melody> 4(-4) -(44) -3 6. 1| 1(-2) -3 2- 34
// w: 不出你欣赏我哪一种表情 却说
// <guitar> %Em |%Am
// <melody> 5(-5) -(55) -(44) (-4)(-3) | 3(33) (-4)(-3) -- 2(34)
// w: 不出在什么场合我曾让你动心 说不出
// <guitar> %F2%G2 | %C
// <melody> -- 6.1 1- 7.- | 1-------
// w: *离开的原因
// `)

let musicExample

// 平凡之路
musicExample = (`
title : 乐曲名
artist : TC
timeSign : 4/4
tempo : 1/4=90
key : C
customChords : {}
patterns : {}
tracks : 
  - name: guitar
    jcx: tab
=================
<guitar> 0 0 (5.5.) | [6.1.] 5. 1 | 7. - (5.5.) | 6. 5. 2 
`)

// 温柔
musicExample=(`
title : [温柔, 五月天]
info : 原调1=G
artist : 童话吉他编配
timeSign : 4/4
beat : 1/8
key : C
tracks : 
  - name: guitar
    jcx: tab
  - name: melody
    jcx: jianpu
customChords: 
  F: 1;X,X,3,2,1,0
patterns : 
  L1 : '"C"53231323'
  L6 : '"Am"53231323'
  L4 : '"F"43231323'
  L5 : '"G"63231323'
  L3 : '"Em"63231323'
  L4s : '"F"4323'
  L5s : '"G"6323'
=================
<guitar> %L1 | %L6
<melody> 32 32 32 32 | 32 1(6.1) -- --
w: 走在风中今天阳光 突然好温柔

<guitar> %L4 | %L5
<melody> 43 43 43 43 | 45 2(12) -- --
w: 天的温柔 地的温柔 像你抱着我

<guitar> %L3 | %L6
<melody> 5#4 5#4 5#4 5#4 | 56 3(23) -- 31
w: 然后发现你的改变 孤单的今后* 如果

<guitar> %L4s %L5s | %L1
<melody> 6.- 7.1 2- 3- | 1- -- -- --
w: 冷 该怎么度过

<guitar> %L1 | %L6
<melody> 32 32 32 3(22) | 32 1(6.1) -- --
w: 天边风光身边的我 都不在你眼中

<guitar> %L4 | %L5
<melody> 43 43 43 4(33) | 45 2(12) -- --
w: 你的眼中藏着什么 我从来都不懂

<guitar> %L3 | %L6
<melody> 5#4 5#4 5#4 5#4 | 56 3(23) -- 31
w: 没有关系你的世界 就让你拥有*不打

<guitar> %L4s %L5s | %L1
<melody> 6.- 7.1 2- 3- | 1- -- -- --
w: 扰 是我的温柔

<guitar> %L1
<melody> 0- -- -- -(55)
w: 不知

<guitar> %L1 | %L6
<melody> 5(33)3(22)2123 | 06 -(35) -- -3
w: 道不明了不想要 为什么我的心*明

<guitar> %L4 | %L5
<melody> 67 6(53) -- -3 | 67 6(52) -- -(55)
w: 明是想靠近* 却孤单的黎明* 不知

<guitar> %L1 | %L6
<melody> 5(33)3(22)2123 | 06 -(35) -- -3
w: 道不明了不想要 为什么我的心*那

<guitar> %L4 | %L5
<melody> 67 6(53) -- -3 | 67 6(52) -- -(43)
w: 爱情的绮丽*总是在孤单里*再把

<guitar> %L4 | %L5
<melody> 43 43 43 65 | 5- -- -- --
w: 我的最好的爱给*你

`)

export default musicExample

