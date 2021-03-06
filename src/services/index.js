const users = require('./users/users.service.js');
const databaseMaster = require('./database/master/master.service.js');
const databaseUser = require('./database/user/user.service.js');
const changelogsMasterDatabase = require('./changelogs/master-database/master-database.service.js');
const changelogsUserDatabase = require('./changelogs/user-database/user-database.service.js');
const changelogsAssetBundleInfo = require('./changelogs/asset-bundle-info/asset-bundle-info.service.js');
const systemInfo = require('./system-info/system-info.service.js');
const assets = require('./assets/assets.service.js');
const eventScoresRank = require('./event-scores/rank/rank.service.js');
const eventScoresPersonal = require('./event-scores/personal/personal.service.js');
const databaseCollectionInfoMaster = require('./database/collectionInfo/master/master.service.js');
const databaseCollectionInfoUser = require('./database/collectionInfo/user/user.service.js');
const eventRankings = require('./event-rankings/event-rankings.service.js');
const gacha = require('./gacha/gacha.service.js');
const patrons = require('./patrons/patrons.service.js');
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
  app.configure(eventScoresRank);
  app.configure(eventScoresPersonal);
  app.configure(databaseCollectionInfoMaster);
  app.configure(databaseCollectionInfoUser);
  app.configure(eventRankings);
  app.configure(gacha);
  app.configure(patrons);
};
