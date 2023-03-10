const path   = require('path')
const fs     = require('fs')
const moment = require('moment')
require('moment/locale/zh-cn')
moment.locale('zh-cn')

exports.application_yaml__generate = (context) => {
  const dest = path.join(context.destinationPath, '/src/main/resources', 'application.yaml')
  // language=TEXT
  fs.writeFileSync(dest, `# application.yaml
#server:
#  port: 8080
`, 'utf8')
}