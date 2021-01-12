const assert = require('assert');
const app = require('../../../src/app');

describe('\'event-scores/rank\' service', () => {
  it('registered the service', () => {
    const service = app.service('event-scores/rank');

    assert.ok(service, 'Registered the service');
  });
});
