const users = require('./users/users.service.js');
const databaseMaster = require('./database/master/master.service.js');

const databaseUser = require('./database/user/user.service.js');

const databaseEventScores = require('./database/event-scores/event-scores.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(databaseMaster);
  app.configure(databaseUser);
  app.configure(databaseEventScores);
};
