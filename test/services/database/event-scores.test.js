const assert = require('assert');
const app = require('../../../src/app');

describe('\'database/eventScores\' service', () => {
  it('registered the service', () => {
    const service = app.service('database/event-scores');

    assert.ok(service, 'Registered the service');
  });
});
