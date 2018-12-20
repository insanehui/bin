import _ from 'lodash'
import arson from 'arson'

export default function wash(obj){
  if ( !_.isObject(obj) ) {
    return obj
  } 
  return arson.decode(arson.encode(obj)) 
}

