const { Service } = require('feathers-mongodb');

exports.Patrons = class Patrons extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(client => {
      this.Model = client.db('pjsekai').collection('patrons');
    });
  }
};
