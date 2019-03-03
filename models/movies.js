'use strict';

const { errorMessages } = require('../utils/helpers_variables');

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 40],
          msg: errorMessages.INVALID_NAME
        }
      }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 200],
          msg: errorMessages.INVALID_COMMENT
        }
      }
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 200],
          msg: errorMessages.INVALID_NOTES
        }
      }
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true,
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
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: {
          args: true,
          msg: errorMessages.INVALID_DATE
        }
      }
    }
  }, {});
  Movie.associate = function (models) {
    // associations can be defined here
    Movie.belongsTo(models.User, { onDelete: 'cascade', foreignKey: 'userId' });
  };
  return Movie;
};