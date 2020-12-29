const assert = require('assert');
const app = require('../../../src/app');

describe('\'eventScores/rank\' service', () => {
  it('registered the service', () => {
    const service = app.service('eventScores/rank');

    assert.ok(service, 'Registered the service');
  });
});
