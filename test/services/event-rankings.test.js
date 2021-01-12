const assert = require('assert');
const app = require('../../src/app');

describe('\'eventRankings\' service', () => {
  it('registered the service', () => {
    const service = app.service('event-rankings');

    assert.ok(service, 'Registered the service');
  });
});
