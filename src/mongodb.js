const MongoClient = require('mongodb').MongoClient;

module.exports = function (app) {
  const mongodbConfig = app.get('mongodb');
  const connection = `mongodb://${mongodbConfig.host}:${mongodbConfig.port}`;
  const database = mongodbConfig.db;
  const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true });

  app.set('mongoClient', mongoClient);
  app.set('mongoDatabase', mongoClient.then(client => client.db(database)));
};
