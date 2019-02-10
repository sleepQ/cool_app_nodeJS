const express = require("express");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { User: userModel } = require("../models");
const { jwtExpireTime } = require('../utils/helpers_variables');

const users = express.Router();

users.use(cors());

users.post('/register', (req, res, next) => {
    const { username, email, password } = req.body;

    const userData = {
        username,
        email,
        password
    };

    userModel.findOne({ where: { email } })
        .then(user => {
            if (!user) {
                userModel.create(userData)
                    .then(user => res.json({ id: user.id, username: user.username, email: user.email }))
                    .catch(error => next(error));
            } else {
                return next({ message: "User already exists." });
            }
        })
        .catch(error => next(error));
});

users.post('/login', (req, res, next) => {
    userModel.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(response => {
                        if (response) {
                            jwt.sign(user.dataValues, process.env.JWT_SECRET_KEY, { expiresIn: jwtExpireTime }, function (error, token) {
                                return res.json({ token });
                            });
                        } else {
                            return next({ message: 'The password you entered is incorrect.' });
                        }
                    })
                    .catch(error => next(error));
            } else {
                return next({ message: 'User does not exist.' });
            }
        })
        .catch(error => next(error));
});

module.exports = users;
