/*
 * 用来测试的一个前端界面
 */
import React from 'react'
import S from 'styled-components'

import toNotation from './jcx/notation.js'
import toTab from './jcx/tab.js'
import parseFile from './musicFile/main.js'
import fromMusic from './jcx/music2jcx.js'
// import {testify,} from '../utils/modash.js'

const Score1 = (S.textarea`
    width: 900px;
    height: 30px;
`)
const Score2 = (S.textarea`
    width: 900px;
    height: 300px;
`)

const musicExample = (`
title : [旅行的意义, 陈绮贞]
artist : 童话吉他编配
timeSign : 4/4
beat : 1/8
tracks : 
  - name: guitar
    jcx: tab
  - name: melody
    jcx: jianpu
patterns : 
    C : '"C"53231323'
    Am : '"Am"53231323'
    F : '"F"43231323'
    F2 : '"F"4323'
    G : '"G"63231323'
    G2 : '"G"6323'
    Em : '"Em"63231323'
customChords : 
  F: 1;X,X,3,2,1,0
=================
<guitar> 0-------
<melody> 0------5.
<guitar> %C |%Am
<melody> 2(33)-(23)(-2)(-5.) -(-3.)|7.(11)-(7.1)(-7.)(-3.)(--)(-3.)
w: 你看过了许多美景 你看过了许多美女 你
<guitar> %F |%G
<melody> 3(44) -(34) - 3 6. 1|1 (11) (-2)3 2- -(-5.)
w: 迷失在地图上每一道短暂的光阴 你
<guitar> %C |%Am
<melody> 2(33)-(23)(-2)(-5.) -(-3.)|7.1 1(7.1) (-2)(-3) -(-6.)
w: 品尝了夜的巴黎 你踏过下雪的北京 你
<guitar> %F |%G
<melody> 3(44) -(34) - 3 6. 1|1 (11) (-2)3 2- 34
w: 熟记书本里每一句你最爱的真理 却说
<guitar> %Em |%Am
<melody> 5(-5) -(55) -(44) -4 |3- -- -- 23
w: 不出你爱我的原因 却说
<guitar> %F |%G
<melody> 4(-4) -(44) -3 6. 1| 1(-2) -3 2- 34
w: 不出你欣赏我哪一种表情 却说
<guitar> %Em |%Am
<melody> 5(-5) -(55) -(44) (-4)(-3) | 3(33) (-4)(-3) -- 2(34)
w: 不出在什么场合我曾让你动心 说不出
<guitar> %F2%G2 | %C
<melody> -- 6.1 1- 7.- | 1-------
w: *离开的原因
`)

export default class App extends React.PureComponent {
  state = {
    jcx : '',
  }

  setData = data=>{
    this.setState({ jcx : data })
    navigator.clipboard.writeText(data)
  }

  make = (type)=>{
    const {track} = this.refs
    const parse = type === 'notation' ? toNotation : toTab
    const jcxData = parse(track.value) 
    this.setData(jcxData)
  }

  doFile = ()=>{
    const {file} = this.refs
    const res = parseFile(file.value) 
    this.setData(fromMusic(file.value))
    console.log('file', res)
  }

  render() {
    const {jcx} = this.state 
    const def = '0 0 (5.5.) | 6. 5. 1 | 7. - (5.5.) | 6. 5. 2 | 1 - (5.5.) | 5 3 1 | 7. 6. (44) | 3 1 2 | 1 - -' 
    return <div>
      <div>
        单独音轨
        <button onClick={()=>this.make('notation')}>简谱</button>
        <button onClick={()=>this.make('tab')}>吉他谱</button>
      </div>
      <Score1 ref='track' defaultValue={def}></Score1>
      <div>
        完整曲谱
        <button onClick={this.doFile}>转换</button>
      </div>
      <Score2 ref='file' defaultValue={musicExample}></Score2>
      <pre>
        {jcx}
      </pre>
    </div>
  }
}

