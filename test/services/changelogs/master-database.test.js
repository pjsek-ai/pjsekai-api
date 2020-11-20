const assert = require('assert');
const app = require('../../../src/app');

describe('\'changelogs/masterDatabase\' service', () => {
  it('registered the service', () => {
    const service = app.service('changelogs/master-database');

    assert.ok(service, 'Registered the service');
  });
});
