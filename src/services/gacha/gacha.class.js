const errors = require('@feathersjs/errors');
const Chance = require('chance');

const weightedRandom = weights => {
  chance = new Chance();
  return chance.weighted(weights.map(({ key }) => key), weights.map(({ weight }) => weight));
}

const validateCache = async (app, cardCache, gachaCache) => {
  const systemInfos = await app.service('system-info').find({
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
    const cards = await app.service('database/master/:collection').find({
      query: {
        $sort: {
          id: 1,
        },
        $limit: 1000,
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
    cards.data.forEach(card => {
      cardCache.set(card.id, card);
    });
    cardCache.set('dataVersion', systemInfo.dataVersion);
  }
  if (gachaCache.get('dataVersion') !== systemInfo.dataVersion) {
    gachaCache.clear();
    const gachas = await app.service('database/master/:collection').find({
      query: {
        $sort: {
          id: 1,
        },
        $limit: 1000,
      },
      route: {
        collection: 'gachas',
      },
    });
    gachas.data.forEach(gacha => {
      gachaCache.set(gacha.id, gacha);
    });
    gachaCache.set('dataVersion', systemInfo.dataVersion);
  }
}

/* eslint-disable no-unused-vars */
exports.Gacha = class Gacha {
  constructor(options, app) {
    this.app = app;
    this.options = options || {};
    this.cardCache = new Map();
    this.gachaCache = new Map();
    app.get('mongoClient').then(() => validateCache(this.app, this.cardCache, this.gachaCache));
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    const start = Date.now();

    await validateCache(this.app, this.cardCache, this.gachaCache);

    console.log('1', Date.now() - start);
    const gachaId = parseInt(params.route.gachaId);
    let gacha;
    if (this.gachaCache.has(gachaId)) {
      gacha = this.gachaCache.get(gachaId);
    }
    else {
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
      gacha = gachas.data[0];
      this.gachaCache.set(gacha.id, gacha);
    }

    console.log('2', Date.now() - start);
    for (const gachaDetail of gacha.gachaDetails) {
      let card;
      if (this.cardCache.has(gachaDetail.cardId)) {
        card = this.cardCache.get(gachaDetail.cardId);
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
        this.cardCache.set(card.id, card);
      }

      gachaDetail["card"] = card;
    }

    console.log('3', Date.now() - start);
    const gachaBehavior = gacha.gachaBehaviors.find(gachaBehavior => `${gachaBehavior.id}` === params.route.gachaBehaviorId);
    if (!gachaBehavior) {
      throw new errors.NotFound();
    }

    console.log('4', Date.now() - start);
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

    console.log('5', Date.now() - start);
    const count = data.count || 1;
    return [...Array(count).keys()].map(i => {
      let result = [...Array(gachaBehavior.spinCount).keys()].map(i => weightedRandom(cardWeights[weightedRandom(rarityWeights)]));
      console.log('6', i, Date.now() - start);
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
      console.log('7', i, Date.now() - start);
      return result;
    });

  }

};
