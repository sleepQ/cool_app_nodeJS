const express = require("express");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { User: userModel } = require("../models");
const { jwtOptions } = require('../utils/helpers_variables');
const { authMiddleware } = require('../utils/helpers_functions')

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
                    .then(() => res.json({}))
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
                            const payload = {
                                id: user.id
                            };

                            jwt.sign(payload, process.env.JWT_SECRET_KEY, jwtOptions, function (error, token) {
                                if (error) {
                                    return next(error);
                                } else {
                                    return res.json({ token });
                                }
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

users.get('/', authMiddleware, (req, res, next) => {
    const { id } = req.userData;

    userModel.findOne({ where: { id } })
        .then(user => res.json(user))
        .catch(error => next(error));
});

module.exports = users;
