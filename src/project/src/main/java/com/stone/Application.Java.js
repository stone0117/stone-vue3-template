const path   = require('path')
const fs     = require('fs')
const moment = require('moment')
require('moment/locale/zh-cn')
moment.locale('zh-cn')

exports.Application_Java = (context) => {
  const dest = path.join(context.destinationPath, '/src/main/java', context.groupId2Folder, 'Application.java')
  // language=TEXT
  fs.writeFileSync(dest, `package ${context.groupId};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
/**
 * Created by stone on ${moment().format('YYYY/MM/DD')}
 *
 * @author stone
 */
// 默认扫描所在目录的子目录
@SpringBootApplication
public class Application {
  public static void main(String[] args) {
    ConfigurableApplicationContext applicationContext = SpringApplication.run(Application.class);

    // Object redisTemplate = applicationContext.getBean("redisTemplate");
    // System.out.println("redisTemplate = " + redisTemplate);
    
    Object user = applicationContext.getBean("user");
    System.out.println("user = " + user);
  }
}`, 'utf8')
}