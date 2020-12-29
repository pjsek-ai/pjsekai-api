const { discard, disallow } = require('feathers-hooks-common');
const autoQuery = require('../../hooks/auto-query');
const queryType = require('../../hooks/query-type');

module.exports = {
  before: {
    all: [],
    find: [queryType(), autoQuery('$sort', { 'collection': 1 })],
    get: [disallow()],
    create: [disallow()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
  },

  after: {
    all: [
      discard('_id'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
