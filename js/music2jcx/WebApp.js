/*
 * 用来测试的一个前端界面
 */
import React from 'react'
import {parse} from './parse.js'
import S from 'styled-components'

const Score = (S.textarea`
    width: 900px;
    height: 200px;
`)

export default class App extends React.PureComponent {
  state = {
    jcx : '',
  }

  make = ()=>{
    const {score} = this.refs
    const jcxData = parse(score.value) 
    this.setState({ jcx : jcxData })
    navigator.clipboard.writeText(jcxData)
  }

  render() {
    const {jcx} = this.state 
    return <div>
      <Score ref='score'></Score>
      <pre>
        {jcx}
      </pre>
      <button onClick={this.make}>生成</button>
    </div>
  }
}

