// Initializes the `database/collectionInfo/user` service on path `/database/collection-info/user`
const { User } = require('./user.class');
const hooks = require('./user.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/database/collection-info/user', new User(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('database/collection-info/user');

  service.hooks(hooks);
};
