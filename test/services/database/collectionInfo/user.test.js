const assert = require('assert');
const app = require('../../../../src/app');

describe('\'database/collectionInfo/user\' service', () => {
  it('registered the service', () => {
    const service = app.service('database/collection-info/user');

    assert.ok(service, 'Registered the service');
  });
});
