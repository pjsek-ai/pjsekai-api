const assert = require('assert');
const app = require('../../../src/app');

describe('\'database/user\' service', () => {
  it('registered the service', () => {
    const service = app.service('database/user');

    assert.ok(service, 'Registered the service');
  });
});
