// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeMySQLClient');
  const personalscore = sequelizeClient.define('personalscore', {

    id: {
      type: DataTypes.INT,
      allowNull: false,
      unique: true
    },
    eventid: {
      type: DataTypes.INT,
      allowNull: false,
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INT,
      allowNull: false,
    },
    rank: {
      type: DataTypes.INT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return personalscore;
};
