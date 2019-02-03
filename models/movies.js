'use strict';

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    name: {
      type: DataTypes.STRING
    },
    comment: DataTypes.STRING,
    notes: DataTypes.STRING,
    score: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.User, { onDelete: 'cascade', foreignKey: 'userId' });
  };
  return Movie;
};