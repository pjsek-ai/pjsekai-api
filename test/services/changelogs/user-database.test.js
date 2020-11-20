const assert = require('assert');
const app = require('../../../src/app');

describe('\'changelogs/userDatabase\' service', () => {
  it('registered the service', () => {
    const service = app.service('changelogs/user-database');

    assert.ok(service, 'Registered the service');
  });
});
