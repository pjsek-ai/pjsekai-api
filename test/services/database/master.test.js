const assert = require('assert');
const app = require('../../../src/app');

describe('\'database/master\' service', () => {
  it('registered the service', () => {
    const service = app.service('database/master');

    assert.ok(service, 'Registered the service');
  });
});
