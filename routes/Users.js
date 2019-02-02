const express = require("express");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { user: userModel } = require("../models");
const { jwtExpireTime } = require('../utils/helpers_variables');

const users = express.Router();

users.use(cors());

users.post('/register', (req, res, next) => {
    const created = new Date();
    const { username, email, password } = req.body;

    const userData = {
        username,
        email,
        password,
        created
    };

    userModel.findOne({ where: { email } })
        .then(user => { 
            if (!user) {
                bcrypt.hash(password, 10, (error, hash) => {
                    userData.password = hash;

                    userModel.create(userData)
                        .then(user => res.json({ username: user.username, email: user.email }))
                        .catch(error => next(error));
                });
            } else {
                next({ message: "User already exists." });
            }
        })
        .catch(error => next(error));
});

users.post('/login', (req, res, next) => {
    userModel.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password,  user.password, (error, result) => {
                    if (result === true) {
                        let token = jwt.sign(user.dataValues, process.env.JWT_SECRET_KEY, { expiresIn: jwtExpireTime });
                        res.json({ token });
                    } else {
                        next({ message: 'The password you entered is incorrect.' });
                    }
                });
            } else {
                next({ message: 'User does not exist.' });
            }
        })
        .catch(error => next(error));
});

module.exports = users;
