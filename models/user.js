'use strict';
const { errorMessages } = require('../utils/helpers_variables');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1,10],
          msg: errorMessages.USERNAME_LENGTH
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { 
          args: true,
          msg: errorMessages.EMAIL_INVALID
        }
      }
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
