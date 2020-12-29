const { authenticate } = require('@feathersjs/authentication').hooks;
const { iff, disallow, alterItems } = require("feathers-hooks-common");
const { setField } = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      iff(context => context.params.user.lastSync.getTime() !== new Date(0).getTime(), disallow()),
      setField({
        from: 'params.user.userId',
        as: 'params.query.userid'
      }),
    ],
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
