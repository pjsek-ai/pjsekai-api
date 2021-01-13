const assert = require('assert');
const app = require('../../src/app');

describe('\'gacha\' service', () => {
  it('registered the service', () => {
    const service = app.service('gacha/:gachaId/:gachaBehaviorId');

    assert.ok(service, 'Registered the service');
  });
});
