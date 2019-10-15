require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

// MIDDLEWARES
const { authMiddleware, errorMiddleware, getUrlMiddleware } = require('./utils/helpers_functions');
const { IO_CONNECTION } = require('./utils/private_messages');

const Users = require('./routes/Users');
const Movies = require('./routes/Movies');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(getUrlMiddleware);

// ROUTES
app.use('/users', Users);
app.use('/movies', authMiddleware, Movies);

// SOCKETS
io.on('connection', IO_CONNECTION);

// ERROR HANDLING
app.use(errorMiddleware);

server.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
