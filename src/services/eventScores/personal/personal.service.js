// Initializes the `eventScores/personal` service on path `/eventScores/personal`
const { Personal } = require('./personal.class');
const createModel = require('../../../models/personalscore.model');
const hooks = require('./personal.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/eventScores/personal', new Personal(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('eventScores/personal');

  service.hooks(hooks);
};
