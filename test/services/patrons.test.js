const assert = require('assert');
const app = require('../../src/app');

describe('\'patrons\' service', () => {
  it('registered the service', () => {
    const service = app.service('patrons');

    assert.ok(service, 'Registered the service');
  });
});
