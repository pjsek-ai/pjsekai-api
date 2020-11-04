const { Service } = require('feathers-mongodb');
const errors = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Master = class Master extends Service {
  constructor(options, app) {
    super(options);
    this.client = app.get('mongoClient');
  }

  async find(params) {
    const db = (await this.client).db('pjsekai_master');
    if (!await db.listCollections({ name: params.route.collection }).hasNext()) {
      throw new errors.NotFound();
    }
    this.Model = db.collection(params.route.collection);

    return await super.find(params);
  }

};
