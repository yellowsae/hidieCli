// 根据我们想要实现的功能配置执行动作，遍历产生对应的命令
const ora = require('ora');
const axios = require('axios');
const { promisify } = require('util');
const { downloadDirectory } = require('./constants');
let downloadGit = require('download-git-repo');

downloadGit = promisify(downloadGit);// 将项目下载到当前用户的临时文件夹下

const downDir = async (repo, tag) => {
  console.log(tag, 'downDir方法');
  let project = `lxy-cli/${repo}`; //下载的项目
  if (tag) {
    project += `#${tag}`;
  }
  //     c:/users/lee/.myTemplate
  let dest = `${downloadDirectory}/${repo}`;
  //把项目下载当对应的目录中
  console.log(dest, 'dest的内容。。。。。。。。。。');
  console.log(project, 'dest的内容。。。。。。。。。。');
  try {
    await downloadGit(project, dest);
  } catch (error) {
    console.log('错误了吗？？？\n');
    console.log(error);
  }
  return dest
}

// 封装loading效果
const fnLoadingByOra = (fn, message) => async (...argv) => {
  const spinner = ora(message);
  spinner.start();
  let result = await fn(...argv);
  spinner.succeed(); // 结束loading
  return result;
}

const getTagLists = async (repo) => {
  const { data } = await axios.get(`https://api.github.com/repos/lxy-cli/${repo}/tags`);
  return data;
}

// 1) 获取仓库列表 
// 获取 组织或者项目下的所有仓库 /orgs/:org/repos  /users/:username/repos
const fetchReopLists = async () => {
  const {
    data
  } = await axios.get(`https://api.github.com/${repoUrlObj.k}/${repoUrlObj.v}/repos`).catch(err => {
    console.log(chalk.red(`链接组织${repoUrlObj.v}失败，错误信息：${err} \n`));
    return {
      data: undefined
    };
  });

  if (data && Array.isArray(data) && data.length == 0) {
    console.log(chalk.yellow(`\n 链接组织${repoUrlObj.v}获取仓库列表为空 \n`));
    return;
  }
  return data;
}

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
  mapActions,
  fnLoadingByOra,
  getTagLists,
  fetchReopLists,
  downDir
}
