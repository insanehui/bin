/*
 * 用来测试的一个前端界面
 */
import React from 'react'
import S from 'styled-components'
import {saveAs} from 'file-saver'

import toNotation from './jcx/notation.js'
import toTab from './jcx/tab.js'
import parseFile from './musicFile/main.js'
import fromMusic from './jcx/music2jcx.js'

import musicExample from './musicExample.js'
import {dumpGTP} from './gtp/writer.js'

// import {testify,} from '../utils/modash.js'

const Score1 = (S.textarea`
    width: 900px;
    height: 30px;
`)
const Score2 = (S.textarea`
    width: 900px;
    height: 300px;
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

  downGTP = ()=>{
    saveAs(new Blob([dumpGTP()]), 'a.gp5')
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
        <button onClick={this.downGTP}>下载GTP</button>
      </div>
      <Score2 ref='file' defaultValue={musicExample}></Score2>
      <pre>
        {jcx}
      </pre>
    </div>
  }
}

