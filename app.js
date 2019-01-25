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










app.use((err, req, res, next) => {
    const statusCode = (err || {}).statusCode || 404;
    const error = (err || {}).message || 'Something went wrong.';

    res.status(statusCode).send({ error });
});

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});


// http://docs.sequelizejs.com/manual/tutorial/migrations.html Check it out
// https://www.duringthedrive.com/2017/05/06/models-migrations-sequelize-node/
