const assert = require('assert');
const app = require('../../../src/app');

describe('\'eventScores/personal\' service', () => {
  it('registered the service', () => {
    const service = app.service('eventScores/personal');

    assert.ok(service, 'Registered the service');
  });
});
