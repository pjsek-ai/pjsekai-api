const assert = require('assert');
const app = require('../../src/app');

describe('\'assets\' service', () => {
  it('registered the service', () => {
    const service = app.service('assets');

    assert.ok(service, 'Registered the service');
  });
});
