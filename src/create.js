const axios = require('axios');
const inquirer = require('inquirer');
const { fnLoadingByOra, fetchReopLists, getTagLists } = require('./utils/common');


// 1).获取仓库列表
const fetchRepoLists = async () => {
  // 获取当前组织中的所有仓库信息,这个仓库中存放的都是项目模板,  这里应该是用户自定义的模板
  const { data } = await axios.get('https://api.github.com/orgs/lxy-cli/repos');
  return data
}


module.exports = async (projectName) => {
  // console.log(`此处是文件${projectName}`)  // TODO: 测试代码

  let repos = await fnLoadingByOra(fetchRepoLists, '正在链接你的仓库...')();
  repos = repos.map((item) => item.name);
  // 用户选择的仓库
  // 使用inquirer 在命令行中可以交互
  const { repo } = await inquirer.prompt([
    {
      type: 'list',
      name: 'repo',
      message: '请选择一个你要创建的项目',
      choices: repos
    }
  ]);
  let tags = await fnLoadingByOra(getTagLists, `正在链接你的选择的仓库${repo}的版本号...`)(repo);
  tags = tags.map((item) => item.name);
  console.log(`我现在选择了那个仓库？ ${repo}`);
  console.log(`仓库 ${repo}的版本信息列表：${tags}`);

}
