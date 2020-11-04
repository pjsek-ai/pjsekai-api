const { discard, disallow, alterItems } = require('feathers-hooks-common');
const queryType = require('../../../hooks/query-type');

module.exports = {
  before: {
    all: [],
    find: [queryType()],
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
        datetime: item.datetime.getTime(),
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
