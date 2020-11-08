const MongoClient = require('mongodb').MongoClient;

module.exports = function (app) {
  const mongodbConfig = app.get('mongodb');
  const uri = mongodbConfig.user ? `mongodb://${encodeURIComponent(mongodbConfig.user)}:${encodeURIComponent(mongodbConfig.password)}@${mongodbConfig.host}:${mongodbConfig.port}` : `mongodb://${mongodbConfig.host}:${mongodbConfig.port}`;
  const database = mongodbConfig.db;
  const mongoClient = MongoClient.connect(uri, { useNewUrlParser: true });

  app.set('mongoClient', mongoClient);
  app.set('mongoDatabase', mongoClient.then(client => client.db(database)));
};
