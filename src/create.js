const axios = require('axios');

// 1).获取仓库列表
const fetchRepoLists = async () => {
  // 获取当前组织中的所有仓库信息,这个仓库中存放的都是项目模板,  这里应该是用户自定义的模板
  const {data} = await axios.get('https://api.github.com/orgs/lxy-cli/repos');
  return data
}

module.exports = async (projectName) => {
  console.log(`此处是文件${projectName}`)  // TODO: 测试代码

  let repos = await fetchRepoLists();
  repos = repos.map((item) => item.name);
  console.log(repos);
}
