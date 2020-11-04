const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
  const mongodbConfig = app.get('mongodb');
  mongoose.connect(
    `mongodb://${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.db}`,
    { useCreateIndex: true, useNewUrlParser: true }
  ).catch(err => {
    logger.error(err);
    process.exit(1);
  });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
