/*
 * music2jcx里的代码拷贝到playground
 */
const path = require('path')
const d = path.resolve.bind(null, __dirname)
const _ = require('lodash')
const chalk = require('chalk')
const shell = require('shelljs')
const fs = require('fs-extra')

function main() {
  fs.copySync(d('../music2jcx.js'), 'C:\\Users\\guanghui\\react_playground2\\src\\index.js')
  fs.copySync(d('../music2jcx'), 'C:\\Users\\guanghui\\react_playground2\\src\\music2jcx')
  fs.copySync(d('../utils'), 'C:\\Users\\guanghui\\react_playground2\\src\\utils')
}

main()

