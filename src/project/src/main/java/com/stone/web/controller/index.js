const path   = require('path')
const fs     = require('fs')
const fse    = require('fs-extra')
const moment = require('moment')
require('moment/locale/zh-cn')
moment.locale('zh-cn')

exports.controller__generate = (context) => {
  const folderPath = path.join(context.destinationPath, '/src/main/java', context.groupId2Folder, 'web/controller')
  fse.ensureDirSync(folderPath, {mode: 0o755})
  const dest = path.join(folderPath, 'HelloController.java')
  // language=TEXT
  fs.writeFileSync(dest, `package ${context.groupId}.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by stone on ${moment().format('YYYY/MM/DD')}
 *
 * @author stone
 */
@RestController
public class HelloController {

  @RequestMapping("/hello")
  public String hello() {
    return "Hello Spring Boot !";
  }
}`, 'utf8')
}