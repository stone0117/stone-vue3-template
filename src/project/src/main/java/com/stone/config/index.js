const path   = require('path')
const fs     = require('fs')
const fse    = require('fs-extra')
const moment = require('moment')
require('moment/locale/zh-cn')
moment.locale('zh-cn')

exports.config__generate = (context) => {
  const folderPath = path.join(context.destinationPath, '/src/main/java', context.groupId2Folder, 'config')
  fse.ensureDirSync(folderPath, {mode: 0o755})
  // src/main/java/com/stone/domain/index.js
  const dest = path.join(folderPath, 'UserConfig.java')
  // language=TEXT
  fs.writeFileSync(dest, `package ${context.groupId}.config;

import ${context.groupId}.condition.ClassCondition;
import ${context.groupId}.domain.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;

/**
 * Created by stone on ${moment().format('YYYY/MM/DD')}
 *
 * @author stone
 */
@Configuration
public class UserConfig {

  @Bean
  @Conditional(ClassCondition.class)
  public User user() {
    return new User();
  }
}`, 'utf8')
}