// Initializes the `patrons` service on path `/patrons`
const { Patrons } = require('./patrons.class');
const hooks = require('./patrons.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/patrons', new Patrons(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('patrons');

  service.hooks(hooks);
};
