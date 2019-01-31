/*
 * 给文件重命名的一个工具
 */
const argv = require('yargs').argv 
const fs = require('fs-extra')

const files = fs.readdirSync('C:/Users/guanghui/Desktop/')
console.log(files)
