const path   = require('path')
const fs     = require('fs')
const fse    = require('fs-extra')
const moment = require('moment')
require('moment/locale/zh-cn')
moment.locale('zh-cn')

exports.condition__generate = (context) => {
  const folderPath = path.join(context.destinationPath, '/src/main/java', context.groupId2Folder, 'condition')
  fse.ensureDirSync(folderPath, {mode: 0o755})
  // src/main/java/com/stone/domain/index.js
  const dest = path.join(folderPath, 'ClassCondition.java')
  // language=TEXT
  fs.writeFileSync(dest, `package ${context.groupId}.condition;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

/**
 * Created by stone on ${moment().format('YYYY/MM/DD')}
 *
 * @author stone
 */
public class ClassCondition implements Condition {

  @Override
  public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
    try {
      Class.forName("redis.clients.jedis.Jedis");
      return true;
    } catch (Exception e) {
      System.out.println("redis.clients.jedis.Jedis not found");
      return false;
    }
  }
}`, 'utf8')
}