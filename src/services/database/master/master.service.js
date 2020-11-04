// Initializes the `database/master` service on path `/database/master`
const { Master } = require('./master.class');
const hooks = require('./master.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/database/master/:collection', new Master(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('database/master/:collection');

  service.hooks(hooks);
};
