const { discard, disallow, disablePagination, iff, alterItems } = require('feathers-hooks-common');
const queryType = require('../../../hooks/query-type');

module.exports = {
  before: {
    all: [],
    find: [
      queryType(),
      iff(context => {
        const { query = {} } = context.params;
        return !isNaN(query.rank) && query['$select'] && !query['$select'].includes('userCard') && !query['$select'].includes('userProfile');
      }, disablePagination())
    ],
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
