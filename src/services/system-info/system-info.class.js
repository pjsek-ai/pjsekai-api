const { Service } = require('feathers-mongodb');

exports.SystemInfo = class SystemInfo extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(client => {
      this.Model = client.db('pjsekai').collection('systemInfo');
    });
  }
};
