// Initializes the `changelogs/masterDatabase` service on path `/changelogs/master-database`
const { MasterDatabase } = require('./master-database.class');
const hooks = require('./master-database.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/changelogs/master-database', new MasterDatabase(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('changelogs/master-database');

  service.hooks(hooks);
};
