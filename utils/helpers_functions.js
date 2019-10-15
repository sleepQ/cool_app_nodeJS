const jwt = require("jsonwebtoken");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const validImgFileExt = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'pdf', 'tif'];
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);

    if (!validImgFileExt.includes(ext)) {
        const error = new Error('Only images are allowed.');
        cb(error);
    } else {
        cb(null, true);
    }
};

module.exports.uploadImage = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

module.exports.authMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];

    if (header && typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, authData) => {
            if (error) {
                return next({ statusCode: 401, message: 'Unauthorized' });
            } else {
                req.userData = authData;
            }
        });

        next();
    } else {
        return next({ statusCode: 401, message: 'Unauthorized' });
    }
};

module.exports.errorMiddleware = (error, req, res, next) => {
    const err = error || {};
    const statusCode = err.statusCode || 404;

    console.log('____________ERROROROR___________', error)

    if (typeof err.message === 'string') {
        res.statusMessage = err.message.split(',')[0];
    } else {
        res.statusMessage = 'Something went wrong.';
    }

    res.status(statusCode).send();
};

module.exports.getUrlMiddleware = (req, res, next) => {
    req.getUrl = function () {
        return `${req.protocol}://${req.get('host')}`;
    }
    return next();
};
