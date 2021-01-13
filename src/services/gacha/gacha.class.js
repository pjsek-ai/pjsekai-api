const errors = require('@feathersjs/errors');
const Chance = require('chance');
const cardCache = new Map();

const weightedRandom = weights => {
  chance = new Chance();
  return chance.weighted(weights.map(({ key, weight }) => key), weights.map(({ key, weight }) => weight));
}

/* eslint-disable no-unused-vars */
exports.Gacha = class Gacha {
  constructor(options, app) {
    this.app = app;
    this.options = options || {};
    app.get('mongoClient').then(() => this.create({}, {
      route: {
        gachaId: '1',
        gachaBehaviorId: '1',
      },
    }));
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    const systemInfos = await this.app.service('system-info').find({
      query: {
        $limit: 1,
      },
    });
    if (!systemInfos || systemInfos.data.length < 1) {
      throw new errors.Conflict();
    }
    const systemInfo = systemInfos.data[0];
    if (cardCache.get('dataVersion') !== systemInfo.dataVersion) {
      cardCache.clear();
      cardCache.set('dataVersion', systemInfo.dataVersion);
    }

    const gachas = await this.app.service('database/master/:collection').find({
      query: {
        id: params.route.gachaId,
      },
      route: {
        collection: 'gachas',
      },
    });
    if (!gachas || gachas.data.length < 1) {
      throw new errors.NotFound();
    }
    const gacha = gachas.data[0];
    for (const gachaDetail of gacha.gachaDetails) {
      let card;
      if (cardCache.has(gachaDetail.cardId)) {
        card = cardCache.get(gachaDetail.cardId);
      }
      else {
        const cards = await this.app.service('database/master/:collection').find({
          query: {
            id: gachaDetail.cardId,
            $select: [
              "id",
              "characterId",
              "rarity",
              "attr",
              "supportUnit",
              "skillId",
              "cardSkillName",
              "prefix",
              "assetbundleName",
              "gachaPhrase",
              "flavorText",
              "releaseAt",
            ]
          },
          route: {
            collection: 'cards',
          },
        });
        if (!cards || cards.data.length < 1) {
          throw new errors.Conflict();
        }
        card = cards.data[0];
        cardCache.set(card.id, card);
      }

      gachaDetail["card"] = card;
    }

    const gachaBehavior = gacha.gachaBehaviors.find(gachaBehavior => `${gachaBehavior.id}` === params.route.gachaBehaviorId);
    if (!gachaBehavior) {
      throw new errors.NotFound();
    }

    const rarityWeights = [...Array(4).keys()].map(x => ({
      key: x + 1,
      weight: gacha[`rarity${x + 1}Rate`],
    }));
    const cardWeights = {};
    for (var rarity = 1; rarity <= 4; ++rarity) {
      cardWeights[rarity] = gacha.gachaDetails.filter(gachaDetail => gachaDetail.card.rarity === rarity).map(gachaDetail => ({
        key: gachaDetail.card,
        weight: gachaDetail.weight,
      }));
    }

    const count = data.count || 1;
    return [...Array(count).keys()].map(i => {
      let result = [...Array(gachaBehavior.spinCount).keys()].map(i => weightedRandom(cardWeights[weightedRandom(rarityWeights)]));
      const match = gachaBehavior.gachaBehaviorType.match(/^over_rarity_([3-4])_once$/);
      if (match && result.every(card => card.rarity < match[1])) {
        const rerollRarityWeights = rarityWeights.reduce((acc, cur) => cur.key > match[1] ?
          [...acc, cur] :
          [...acc, {
            key: match[1],
            ...cur,
          }], []);
        const rarity = weightedRandom(rerollRarityWeights);
        result.pop();
        result = [...result, weightedRandom(cardWeights[rarity])]
      }
      return result;
    });

  }

};
