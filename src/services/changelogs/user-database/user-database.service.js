// Initializes the `changelogs/userDatabase` service on path `/changelogs/user-database`
const { UserDatabase } = require('./user-database.class');
const hooks = require('./user-database.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/changelogs/user-database', new UserDatabase(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('changelogs/user-database');

  service.hooks(hooks);
};
