const assert = require('assert');
const app = require('../../../../src/app');

describe('\'database/collectionInfo/master\' service', () => {
  it('registered the service', () => {
    const service = app.service('database/collection-info/master');

    assert.ok(service, 'Registered the service');
  });
});
