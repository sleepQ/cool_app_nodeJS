'use strict';

const { errorMessages } = require('../utils/helpers_variables');

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    comment: DataTypes.STRING,
    notes: DataTypes.STRING,
    score: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true,
        min: {
          args: 1,
          msg: errorMessages.INVALID_MOVIE_SCORE
        },
        max: {
          args: 10,
          msg: errorMessages.INVALID_MOVIE_SCORE
        }
      }
    },
    movieType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
        max: 1
      }
    },
    movieStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
        max: 1
      }
    },
    watchedAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    }
  }, {});
  Movie.associate = function (models) {
    // associations can be defined here
    Movie.belongsTo(models.User, { onDelete: 'cascade', foreignKey: 'userId' });
  };
  return Movie;
};