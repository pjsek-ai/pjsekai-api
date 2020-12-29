const { disallow, alterItems } = require("feathers-hooks-common/types");


module.exports = {
  before: {
    all: [],
    find: [],
    get: [disallow()],
    create: [disallow()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
  },

  after: {
    all: [
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
