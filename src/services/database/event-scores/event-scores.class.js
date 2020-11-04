const { Service } = require('feathers-mongodb');
const errors = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.EventScores = class EventScores extends Service {
  constructor(options, app) {
    super(options);
    this.client = app.get('mongoClient');
  }

  async find(params) {
    const db = (await this.client).db('pjsekai_event_scores');
    if (!await db.listCollections({ name: `event_${parseInt(params.route.eventId)}` }).hasNext()) {
      throw new errors.NotFound();
    }
    this.Model = db.collection(`event_${parseInt(params.route.eventId)}`);

    return await super.find(params);
  }

};
