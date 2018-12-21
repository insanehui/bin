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

const Score = (S.textarea`
    width: 900px;
    height: 300px;
`)

const musicExample = (`
title : 心愿
artist : 童话吉他编配
timeSign : 3/4
tracks : 
  - name: guitar
    jcx: tab
    beat : 1/8
  - name: melody
    jcx: jianpu
patterns : 
    C : '"C"532123'
    Dm : '"Dm"432123'
    Em : '"Em"632123'
    Am : '"Am"532123'
=================
<guitar> %C | %Dm | %Em | %Am | "Am"[54321]$-----
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
    // const def = '1 ( (23) (4 (56)) ) | 1 (12) 3 (34)' 
    const def = '0 0 (5.5.) | 6. 5. 1 | 7. - (5.5.) | 6. 5. 2 | 1 - (5.5.) | 5 3 1 | 7. 6. (44) | 3 1 2 | 1 - -' 
    return <div>
      <div>
        单独音轨
        <button onClick={()=>this.make('notation')}>简谱</button>
        <button onClick={()=>this.make('tab')}>吉他谱</button>
      </div>
      <Score ref='track' defaultValue={def}></Score>
      <div>
        完整曲谱
        <button onClick={this.doFile}>转换</button>
      </div>
      <Score ref='file' defaultValue={musicExample}></Score>
      <pre>
        {jcx}
      </pre>
    </div>
  }
}

