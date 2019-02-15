'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      movieType: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      movieStatus: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      watchedAt: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
           model: 'Users',
           key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Movies');
  }
};