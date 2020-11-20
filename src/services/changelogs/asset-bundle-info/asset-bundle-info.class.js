const { Service } = require('feathers-mongodb');

exports.AssetBundleInfo = class AssetBundleInfo extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(client => {
      this.Model = client.db('pjsekai').collection('assetBundleInfoChangelogs');
    });
  }
};
