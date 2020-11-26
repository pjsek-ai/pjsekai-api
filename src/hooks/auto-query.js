// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (field, options) => {
  return async context => {
    const { query = {} } = context.params;

    if (!query[field]) {
      query[field] = options
    }

    return context;
  };
};
