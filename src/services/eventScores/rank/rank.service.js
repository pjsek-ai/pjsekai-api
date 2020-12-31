// Initializes the `eventScores/rank` service on path `/eventScores/rank`
const { Rank } = require('./rank.class');
const createModel = require('../../../models/rankscore.model');
const hooks = require('./rank.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/event-scores/rank', new Rank(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('event-scores/rank');

  service.hooks(hooks);
};
