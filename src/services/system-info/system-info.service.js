// Initializes the `systemInfo` service on path `/system-info`
const { SystemInfo } = require('./system-info.class');
const hooks = require('./system-info.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/system-info', new SystemInfo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('system-info');

  service.hooks(hooks);
};
