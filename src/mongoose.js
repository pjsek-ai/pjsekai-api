const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
  const mongodbConfig = app.get('mongodb');
  const uri = mongodbConfig.user ? `mongodb://${encodeURIComponent(mongodbConfig.user)}:${encodeURIComponent(mongodbConfig.password)}@${mongodbConfig.host}:${mongodbConfig.port}` : `mongodb://${mongodbConfig.host}:${mongodbConfig.port}`;
  mongoose.connect(
    uri,
    { useCreateIndex: true, useNewUrlParser: true }
  ).catch(err => {
    logger.error(err);
    process.exit(1);
  });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
