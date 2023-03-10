const path   = require('path')
const fs     = require('fs')
const moment = require('moment')
require('moment/locale/zh-cn')
moment.locale('zh-cn')

exports.ApplicationTests_Java = (context) => {
  const dest = path.join(context.destinationPath, '/src/test/java', context.groupId2Folder, 'ApplicationTests.java')
  // language=TEXT
  fs.writeFileSync(dest, `package ${context.groupId};

import org.junit.After;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ${context.groupId}.Application.class)
// @SpringBootTest
class ApplicationTests {
  @Before
  public void init() {
    //
  }

  @After
  public void close() throws Exception {
    //
  }

  @Test
  void contextLoads() {
    //
  }
}`, 'utf8')
}