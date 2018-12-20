/*
 * 用来测试的一个前端界面
 */
import React from 'react'
import S from 'styled-components'

import toNotation from './jcx/notation.js'
import toTab from './jcx/tab.js'
import parseFile from './musicFile/main.js'
// import {testify,} from '../utils/modash.js'

const Score = (S.textarea`
    width: 900px;
    height: 300px;
`)

const musicExample = (`
title : 生日歌
artist : 童话吉他编配
timeSign : 3/4
tempo : 1/4=90
key : C
tracks : 
  - name: guitar
    jcx: [jianpu, tab]
=================
<guitar> 0 0 (5.5.) | 6. 5. 1 | 7. - (5.5.) | 6. 5. 2 
:w:      * * 祝 你    生 日 快  乐    祝你    生 日 快
<guitar> 1 - (5.5.) | 5 3 1 | 7. 6. (44) | 3 1 2 | 1 - -
:w:      乐   祝你    生日快  乐 *  祝你   生日快  乐
`)

export default class App extends React.PureComponent {
  state = {
    jcx : '',
  }

  make = (type)=>{
    const {track} = this.refs
    const parse = type === 'notation' ? toNotation : toTab
    const jcxData = parse(track.value) 
    this.setState({ jcx : jcxData })
    navigator.clipboard.writeText(jcxData)
  }

  doFile = ()=>{
    const {file} = this.refs
    const res = parseFile(file.value) 
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

