const assert = require('assert');
const app = require('../../src/app');

describe('\'systemInfo\' service', () => {
  it('registered the service', () => {
    const service = app.service('system-info');

    assert.ok(service, 'Registered the service');
  });
});
