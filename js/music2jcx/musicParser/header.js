// 解析music文件的header

import yaml from 'js-yaml'
import _ from 'lodash'

import wash from '../../utils/modash/arsonWash.js'

function refine(header) {
  // 之所以要用arson的wash是因为obj里有交叉引用的结构
  header = wash(header)

  for (const track of header.tracks) {
    const {jcx} = track
    if ( typeof jcx === 'string' ) {
      track.jcx = [jcx]
    } 
    track.jcx = _.map(track.jcx, v=>{
      if ( (typeof v) === 'string' ) {
        return {
          type : v,
        }
      } 
      else {
        return v
      }
    })
  }
  return header
}

export default function parseHeader(a) {
  const header = yaml.load(a)
  const {tracks} = header
  header.tracksObj = _.mapKeys(tracks, v=>v.name)
  return refine(header)
}

