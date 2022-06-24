// 根据我们想要实现的功能配置执行动作，遍历产生对应的命令
const mapActions = {
  // 命令项
  create: {
    alias: 'c',  // 别名
    description: 'create project',  // 描述
    examples: [
      'hidie-cli create <project-name>' 
    ],
  },
  // 配置文件
  config: {
    alias: 'conf', // 别名
    description: 'config project variable', // 描述
    examples: [
      'hidie-cli config set <k>  <v>',  //
      'hidie-cli config get <k>',  //
    ] // 用法
  },

  '*': {
    alias: '',  // 别名
    description: 'command not found', // 描述
    examples: []
  }
}


module.exports = {
  mapActions
}
