// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const traverse = require('traverse');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { query = {} } = context.params;

    traverse(query).forEach(function (value) {
      if (!isNaN(value) && value !== '') {
        this.update(Number(value))
      }
      else if (value === 'true') {
        this.update(true)
      }
      else if (value === 'false') {
        this.update(false)
      }
    })

    return context;
  };
};
