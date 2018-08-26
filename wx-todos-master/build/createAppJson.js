/**
 * @author Sky
 * @email lihaizh_cn@foxmail.com
 * @create date 2018-01-24 11:41:29
 * @modify date 2018-01-24 11:41:29
 * @desc 创建app.json
*/

const fs = require('fs')
const path = require('path')

const { config } = require('../config')

const appJsonPath = path.resolve(__dirname, '../dist/app.json')

module.exports = () => {
  fs.writeFile(appJsonPath, JSON.stringify(config), err => {
    if (err) throw err
  })
}
