/*
 * 用来测试的一个前端界面
 */
import React from 'react'
import parse from './jcx/notation.js'
import S from 'styled-components'

// import {testify,} from '../utils/modash.js'

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
    // const def = '1 ( (23) (4 (56)) ) | 1 (12) 3 (34)' 
    const def = '0 0 (5.5.) | 6. 5. 1 | 7. - (5.5.) | 6. 5. 2 | 1 - (5.5.) | 5 3 1 | 7. 6. (44) | 3 1 2 | 1 - -' 
    return <div>
      <Score ref='score' defaultValue={def}></Score>
      <pre>
        {jcx}
      </pre>
      <button onClick={this.make}>生成</button>
    </div>
  }
}

