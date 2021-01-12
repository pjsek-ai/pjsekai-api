const { Service } = require('feathers-mongodb');

exports.EventRankings = class EventRankings extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(client => {
      this.Model = client.db('pjsekai').collection('eventRankings');
    });
  }
};
