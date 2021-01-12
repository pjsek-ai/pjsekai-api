// Initializes the `eventRankings` service on path `/event-rankings`
const { EventRankings } = require('./event-rankings.class');
const hooks = require('./event-rankings.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/event-rankings', new EventRankings(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('event-rankings');

  service.hooks(hooks);
};
