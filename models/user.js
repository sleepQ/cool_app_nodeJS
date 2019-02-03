'use strict';
const { errorMessages } = require('../utils/helpers_variables');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,10],
          msg: errorMessages.USERNAME_LENGTH
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { 
          args: true,
          msg: errorMessages.EMAIL_INVALID
        }
      }
    },
    password: { 
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
