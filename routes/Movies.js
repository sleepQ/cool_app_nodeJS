const express = require('express');
const cors = require('cors');
const { Movie: movieModel } = require('../models');
const { movieStatuses } = require('../utils/helpers_variables');

const movies = express.Router();

movies.use(cors());

movies.get('/', (req, res, next) => {
    const { id } = req.userData || {};

    movieModel.findAll({ where: { userId: id } })
        .then(movies => res.json(movies))
        .catch(error => next(error));
});

movies.get('/:movieId', (req, res, next) => {
    const { movieId } = req.params;

    movieModel.findByPk(movieId)
        .then(movie => res.json(movie))
        .catch(error => next(error));
});

movies.post('/', (req, res, next) => {
    let { name, comment, notes, score, watchedAt, movieType, movieStatus } = req.body || {};
    const { id: userId } = req.userData || {};

    if (movieStatuses[movieStatus] === 'To-Watch') {
        comment = null;
        score = null;
        watchedAt = null;
    }

    const movieData = {
        name,
        comment,
        notes,
        movieStatus,
        movieType,
        score,
        watchedAt,
        userId
    };

    movieModel.findOne({ where: { name, userId, movieType } })
        .then(movie => {
            if (!movie) {
                movieModel.create(movieData)
                    .then(() => movieModel.findAll({ where: { userId } }))
                    .then(movies => res.json(movies))
                    .catch(error => next(error));
            } else {
                next({ message: "Movie already exists." });
            }
        }).catch(error => next(error));

});

movies.put('/:movieId', (req, res, next) => {
    let { name, comment, notes, score, watchedAt, movieType, movieStatus } = req.body || {};
    const { movieId } = req.params;
    const { id: userId } = req.userData || {};

    if (movieStatuses[movieStatus] === 'To-Watch') {
        comment = null;
        score = null;
        watchedAt = null;
    }

    const movieData = {
        name,
        comment,
        notes,
        movieStatus,
        movieType,
        score,
        watchedAt,
        userId
    };

    movieModel.update(movieData, { where: { id: movieId } })
        .then(() => movieModel.findAll({ where: { userId } }))
        .then(movies => res.json(movies))
        .catch(error => next(error));
});

movies.delete('/:movieId', (req, res, next) => {
    const { id: userId } = req.userData || {};
    const { movieId } = req.params;

    movieModel.destroy({ where: { id: movieId, userId } })
        .then(() => movieModel.findAll({ where: { userId } }))
        .then(movies => res.json(movies))
        .catch(error => next(error));
});

module.exports = movies;
