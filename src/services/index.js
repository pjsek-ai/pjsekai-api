const users = require('./users/users.service.js');
const databaseMaster = require('./database/master/master.service.js');
const databaseUser = require('./database/user/user.service.js');
const changelogsMasterDatabase = require('./changelogs/master-database/master-database.service.js');
const changelogsUserDatabase = require('./changelogs/user-database/user-database.service.js');
const changelogsAssetBundleInfo = require('./changelogs/asset-bundle-info/asset-bundle-info.service.js');
const systemInfo = require('./system-info/system-info.service.js');
const assets = require('./assets/assets.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(databaseMaster);
  app.configure(databaseUser);
  app.configure(changelogsMasterDatabase);
  app.configure(changelogsUserDatabase);
  app.configure(changelogsAssetBundleInfo);
  app.configure(systemInfo);
  app.configure(assets);
};
