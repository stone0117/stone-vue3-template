const {pReadTextFile, velocityRender} = require('../utils')
const path                            = require('path')

const config = {
  '000:spring-boot': [

  ],
}

function exclusions(item) {

  if (item.exclusions && item.exclusions.length > 0) {

    let exclusionList = item.exclusions.map(item => {
      return `        <exclusion>
          <groupId>${item.groupId}</groupId>
          <artifactId>${item.artifactId}</artifactId>
        </exclusion>`
    }).join('\n')

    return `\n      <exclusions>
${exclusionList}
      </exclusions>`
  }
  else {
    return ''
  }
}

function scope(item) {
  return item.scope ? `\n        <scope>${item.scope}</scope>` : ''
}

function version(item) {
  return item.version ? `\n        <version>${item.version}</version>` : ''
}

function dependencies(config) {

  let list = []
  for (let [key, value] of Object.entries(config)) {
    // console.log(key, '=', value)

    let r = value.filter(item => {
      if (!!item.ignore) {
        return false
      }
      else {
        return true
      }
    })

    let innerList = []
    for (let [index, item] of r.entries()) {
      innerList.push(`    <!-- ${item.comment} -->
    <dependency>
      <groupId>${item.groupId}</groupId>
      <artifactId>${item.artifactId}</artifactId> ${exclusions(item)} ${scope(item)} ${version(item)}
    </dependency>`)
    }

    list.push(`    <!-- 
    ////////////////////////////////////////////////////////////////////////////
    ///////////////// ${key} /////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    -->
${innerList.join('\n')}`)
  }

  return list.join('\n')
}

function spring_boot_starter_web(isWebApp) {
  if(isWebApp){
    return `<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>`
  }else{
    return `<!-- <dependency>-->
    <!--   <groupId>org.springframework.boot</groupId>-->
    <!--   <artifactId>spring-boot-starter-web</artifactId>-->
    <!-- </dependency>-->`
  }
}
function pom_xml(context) {
  const {
          isWebApp,
          groupId,
          artifactId,
          version,
          packaging,
          name,
          encoding,
          javaVersion,
          finalName,
        } = context

  // language=XML
  return `<?xml version="1.0" encoding="UTF-8"?>

  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-parent</artifactId>
      <version>2.4.3</version>
      <relativePath />
    </parent>

    <groupId>${groupId}</groupId>
    <artifactId>${artifactId}</artifactId>
    <version>${version}</version>
    <packaging>jar</packaging>

    <name>${artifactId}</name>
    <description>project for Spring Boot</description>

    <properties>
      <java.version>${javaVersion}</java.version>
      <maven.compiler.source>${javaVersion}</maven.compiler.source>
      <maven.compiler.target>${javaVersion}</maven.compiler.target>
      <project.build.sourceEncoding>${encoding}</project.build.sourceEncoding>
      <project.reporting.outputEncoding>${encoding}</project.reporting.outputEncoding>

    </properties>

    <dependencies>
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
      </dependency>
      ${spring_boot_starter_web(isWebApp)}
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
      </dependency>
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-configuration-processor</artifactId>
        <optional>true</optional>
      </dependency>
      <!--      
      ////////////////////////////////////////////////////////////////////////////
      ///////////////// redis ////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////
      -->
      <!-- <dependency>-->
      <!--   <groupId>org.springframework.boot</groupId>-->
      <!--   <artifactId>spring-boot-starter-data-redis</artifactId>-->
      <!-- </dependency>-->

      <dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
      </dependency>

      ${dependencies(config)}

      <dependency>
        <groupId>com.stone</groupId>
        <artifactId>stoneutils</artifactId>
        <version>1.2-SNAPSHOT</version>
      </dependency>
    </dependencies>

    <build>
      <finalName>${finalName}</finalName>
      <plugins>
        <plugin>
          <groupId>org.zeroturnaround</groupId>
          <artifactId>jrebel-maven-plugin</artifactId>
          <version>1.1.10</version>
          <executions>
            <execution>
              <id>generate-rebel-xml</id>
              <phase>process-resources</phase>
              <goals>
                <goal>generate</goal>
              </goals>
            </execution>
          </executions>
        </plugin>
        <!-- spring-boot 打包插件 -->
        <plugin>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-maven-plugin</artifactId>
          <configuration>
            <excludes>
              <exclude>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
              </exclude>
            </excludes>
          </configuration>
        </plugin>
      </plugins>
    </build>
  </project>`
}

module.exports = pom_xml

if (require.main === module) {

  dependencies(config)

  // const name = 't005-hello-maven'
  //
  // pom_xml({
  //   // name       : toEnglish(name),
  //   // description: name,
  //   groupId    : 'com.stone',
  //   artifactId : name,
  //   version    : '1.0-SNAPSHOT',
  //   packaging  : 'war',
  //   name       : `${name} Maven Webapp`,
  //   url        : 'http://www.example.com',
  //   encoding   : 'UTF-8',
  //   javaVersion: '1.8',
  //   finalName  : name,
  // })
}
