const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];

    if (header && typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, authData) => {
            if (error) {
                next({ statusCode: 403, message: 'Unauthorized' });
            } else {
                req.userData = authData;
            }
        });

        next();
    } else {
        next({ statusCode: 403, message: 'Unauthorized' });
    }
};

module.exports.errorMiddleware = (error, req, res, next) => {
    const err = error || {};
    const statusCode = err.statusCode || 404;

    if (typeof err.message === 'string') {
        res.statusMessage = err.message.split(',')[0];
    } else {
        res.statusMessage = 'Something went wrong.';
    }

    res.status(statusCode).send();
};
