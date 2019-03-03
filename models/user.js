'use strict';
const bcrypt = require('bcrypt');
const { errorMessages } = require('../utils/helpers_variables');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 15],
          msg: errorMessages.INVALID_USERNAME
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: errorMessages.INVALID_EMAIL
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 15],
          msg: errorMessages.INVALID_PASSWORD
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: errorMessages.INVALID_IMAGE
        }
      }
    }
  }, {});

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Movie, { foreignKey: 'userId' });
  };

  // care when you add update-user functionality, it might rehash the existing password
  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
      .then(hash => {
        user.password = hash;
      })
      .catch(error => {
        throw new Error(error);
      });
  });

  User.prototype.toJSON =  function () {
    let userPayload = Object.assign({}, this.get());
    delete userPayload.password;

    return userPayload;
  }

  return User;
};
