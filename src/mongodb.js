const MongoClient = require('mongodb').MongoClient;

module.exports = function (app) {
  const connection = app.get('mongodb');
  const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true })

  app.set('mongoClient', mongoClient);
};
