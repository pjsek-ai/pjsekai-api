// Initializes the `database/eventScores` service on path `/database/event-scores`
const { EventScores } = require('./event-scores.class');
const hooks = require('./event-scores.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/database/event-scores/:eventId', new EventScores(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('database/event-scores/:eventId');

  service.hooks(hooks);
};
