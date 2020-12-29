const { Service } = require('feathers-mongodb');

exports.Master = class Master extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(client => {
      this.Model = client.db('pjsekai').collection('masterDatabaseCollectionInfo');
    });
  }
};
