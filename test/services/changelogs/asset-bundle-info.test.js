const assert = require('assert');
const app = require('../../../src/app');

describe('\'changelogs/assetBundleInfo\' service', () => {
  it('registered the service', () => {
    const service = app.service('changelogs/asset-bundle-info');

    assert.ok(service, 'Registered the service');
  });
});
