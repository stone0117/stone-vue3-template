const rootConfig           = require('../zzzzzzzz.js')
const path                 = require('path')
const fse                  = require('fs-extra')
const moment               = require('moment')
require('moment/locale/zh-cn')
moment.locale('zh-cn')

!async function () { try { await main() } catch (err) { console.error(err) } }()

async function main() {
  const rootPath = path.resolve(__dirname, '../')
  const config   = rootConfig.context
  ////////////////////////////////////////////////////////////////////////////
  ///////////////// 拷贝基础项目 ///////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  fse.copySync(path.join(rootPath, 'raw_project'), config.destinationPath)

  console.log(moment().format('YYYY/MM/DD HH:mm:ss'), 'done')
}

