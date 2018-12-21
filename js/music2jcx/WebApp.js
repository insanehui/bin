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
<melody> 0--| 0-- | 0-- | 0-- | 0-(12) 
w:                                湖水
<guitar> %C      | %C       | %Am     | %Am
<melody> 3 (32) 1| 3 - (26.)| 11 (7.1) | 6.-(6.1)
w: 是你的眼神 梦想 满天星*辰 心情
<guitar> %Em      | %Em       | %Am     | %Am
<melody> 7. (7.6.) 5. | 7. - (7.5.) | 6. (6.1)(7.1) | 6. - (12)
w: 是一个传说 亘古不变地等候 成长

`)
/*
是一扇树叶的门
童年有一群亲爱的人
春天是一段路程
沧海桑田的拥有
那些我爱的人
那些离逝的风
那些永远的誓言一遍一遍
那些爱我的人
那些沉淀的泪
那些永远的誓言一遍一遍
湖水是你的眼神
梦想满天星辰
心情是一个传说
亘古不变地等候
成长是一扇树叶的门
童年有一群亲爱的人
春天是一段路程
沧海桑田的拥有
那些我爱的人
那些离逝的风
那些永远的誓言一遍一遍
那些爱我的人
那些沉淀的泪
那些永远的誓言一遍一遍
我们都曾有过一张天真而忧伤的脸
手握阳光我们望着遥远
轻轻的一天天一年又一年
长大间我们是否还会再唱起心愿
轻轻的一天天一年又一年
长大间我们是否还会再唱起心愿
长大间我们是否还会再唱起心愿

*/

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

  componentDidMount(){
    this.doFile()
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

