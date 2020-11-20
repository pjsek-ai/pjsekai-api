const { Service } = require('feathers-mongodb');

exports.UserDatabase = class UserDatabase extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(client => {
      this.Model = client.db('pjsekai').collection('userDatabaseChangelogs');
    });
  }
};
