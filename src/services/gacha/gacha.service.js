// Initializes the `gacha` service on path `/gacha/:gachaId/:gachaBehaviorId`
const { Gacha } = require('./gacha.class');
const hooks = require('./gacha.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gacha/:gachaId/:gachaBehaviorId', new Gacha(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gacha/:gachaId/:gachaBehaviorId');

  service.hooks(hooks);
};
