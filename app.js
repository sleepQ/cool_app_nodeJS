require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// MIDDLEWARES
const { authMiddleware, errorMiddleware } = require('./utils/helpers_functions');

// ROUTES
const Users = require('./routes/Users');
const Movies = require('./routes/Movies');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
    req.getUrl = function () {
        return `${req.protocol}://${req.get('host')}`;
    }
    return next();
});

app.use('/users', Users);
app.use('/movies', authMiddleware, Movies);



app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
