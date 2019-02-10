
module.exports.jwtExpireTime = 7200;

module.exports.errorMessages = {
    INVALID_USERNAME: "Username needs to be 1-15 characters long.",
    INVALID_EMAIL: "Invalid email.",
    INVALID_PASSWORD: "Password needs to be 3-15 characters long",
    INVALID_MOVIE_SCORE: "Score needs to be a number from 1 to 10",
};

module.exports.movieTypes = [
    'Movie',
    'TV-show'
];

module.exports.movieStatuses = [
    'To-Watch',
    'Watched'
];
