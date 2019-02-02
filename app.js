require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const Users = require('./routes/Users');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', Users);










app.use((error, req, res, next) => {
    const err = error || {};
    const statusCode = err.statusCode || 404;

    if (typeof err.message === 'string') {
        res.statusMessage = err.message.split(',')[0];
    } else {
        res.statusMessage = 'Something went wrong.';
    }

    res.status(statusCode).send();
});

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
