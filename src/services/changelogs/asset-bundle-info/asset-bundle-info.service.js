// Initializes the `changelogs/assetBundleInfo` service on path `/changelogs/asset-bundle-info`
const { AssetBundleInfo } = require('./asset-bundle-info.class');
const hooks = require('./asset-bundle-info.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/changelogs/asset-bundle-info', new AssetBundleInfo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('changelogs/asset-bundle-info');

  service.hooks(hooks);
};
