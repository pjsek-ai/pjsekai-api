const { Service } = require('feathers-mongodb');

exports.Assets = class Assets extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(client => {
      this.Model = client.db('pjsekai').collection('assets');
    });
  }
};
