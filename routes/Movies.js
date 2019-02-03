const express = require("express");
const cors = require('cors');
const { Movie: movieModel } = require("../models");

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
        .then(movie => res.json({ movie }))
        .catch(error => next(error));
});

movies.post('/', (req, res, next) => {
    const { name, comment, notes, score } = req.body || {};
    const { id } = req.userData || {};

    const movieData = {
        name,
        comment,
        notes,
        score,
        userId: id
    };

    movieModel.findOne({ where: { name, userId: id } })
        .then(movie => {
            if (!movie) {
                movieModel.create(movieData)
                    .then(movie => res.json({ movie }))
                    .catch(error => next(error));
            } else {
                next({ message: "Movie already exists." });
            }
        }).catch(error => next(error));

});

movies.put('/:movieId', (req, res, next) => {

});

movies.delete('/:movieId', (req, res, next) => {

});

module.exports = movies;
