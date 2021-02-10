const { disallow, keep, disablePagination } = require('feathers-hooks-common');
const autoQuery = require('../../hooks/auto-query');
const queryType = require('../../hooks/query-type');

module.exports = {
  before: {
    all: [],
    find: [
      disablePagination(),
      queryType(),
      autoQuery('$sort', { 'Patronage Since Date': 1 })
    ],
    get: [disallow()],
    create: [disallow()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
  },

  after: {
    all: [
      keep(
        'Name',
        'Tier',
        'Patronage Since Date',
      )
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
