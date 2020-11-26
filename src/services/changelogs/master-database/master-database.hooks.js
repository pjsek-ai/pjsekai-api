const { discard, disallow, alterItems } = require('feathers-hooks-common');
const autoQuery = require('../../../hooks/auto-query');
const queryType = require('../../../hooks/query-type');

module.exports = {
  before: {
    all: [],
    find: [queryType(), autoQuery('$sort', { "datetime": -1 })],
    get: [disallow()],
    create: [disallow()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
  },

  after: {
    all: [
      discard('_id'),
      alterItems(item => ({
        ...item,
        ...item.datetime ? {
          datetime: item.datetime.getTime()
        } : {},
      }))
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
