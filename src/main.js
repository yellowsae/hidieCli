const program = require('commander');
const { version } = require('./utils/constants');
const { mapActions } = require('./utils/common');
const path = require('path');

// 监听 --help
program.on('--help', () => {
       console.log('\nExamples:');
       Reflect.ownKeys(mapActions).forEach((action) => {
              mapActions[action].examples.forEach((example) => {
                     // 打印帮助信息
                     console.log(`  ${example}`);
              })
       })
})


// 打印配置命令
Reflect.ownKeys(mapActions).forEach((action) => {
       program.command(action)  //配置命令的名字
              .alias(mapActions[action].alias) //配置命令的别名
              .description(mapActions[action].description) // 命令对应的描述
              .action(() => {  // 动作
                     if (action === '*') {
                            //访问不到对应的命令 就打印找不到命令
                            console.log(mapActions[action].description)
                     } else {
                            console.log(action)
                            // 分解命令 到文件里 有多少文件 就有多少配置 create config
                            // hidie-cli create project-name ->[node,lee-cli,create,project-name]
                            console.log(process.argv)  // 打印参数
                            //  引入 create.js 文件，因为它返回的是一个函数，...process.argv.slice(3) 是它的参数
                            require(path.join(__dirname, action))(...process.argv.slice(3)) // 获取 my 字段，然后创建 my 文件夹
                     }
              })
})

// 添加版本
program.version(version)
       .parse(process.argv); // process.argv就是用户在命令行中传入的参数
