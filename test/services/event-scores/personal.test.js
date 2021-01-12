const assert = require('assert');
const app = require('../../../src/app');

describe('\'event-scores/personal\' service', () => {
  it('registered the service', () => {
    const service = app.service('event-scores/personal');

    assert.ok(service, 'Registered the service');
  });
});
