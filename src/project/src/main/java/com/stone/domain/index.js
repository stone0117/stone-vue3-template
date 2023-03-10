const path   = require('path')
const fs     = require('fs')
const moment = require('moment')
require('moment/locale/zh-cn')
const fse = require('fs-extra')
moment.locale('zh-cn')

exports.domain__generate =  (context) => {
  const folderPath = path.join(context.destinationPath, '/src/main/java', context.groupId2Folder, 'domain')
  fse.ensureDirSync(folderPath, {mode: 0o755})
  const dest = path.join(folderPath, 'User.java')
  // language=TEXT
  fs.writeFileSync(dest, `package ${context.groupId}.domain;

/**
 * Created by stone on ${moment().format('YYYY/MM/DD')}
 *
 * @author stone
 */
public class User {
}`, 'utf8')
}