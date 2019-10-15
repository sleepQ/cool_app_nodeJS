const { socketEvent } = require('./helpers_variables');

let onlineUsers = {};

console.log(Object.keys(onlineUsers))

module.exports.IO_CONNECTION = (socket) => {

    console.log('_______________connection_______________')

    socket.on(socketEvent.ONLINE, (data) => {
        console.log('reassigning new socket on refresh', data)

        onlineUsers[data.username] = socket;
        const allOnlineUsers = Object.keys(onlineUsers);

        // it's too much computing on the back-end to remove the user from allOnlineUsers array while looping through all of them
        allOnlineUsers.forEach(u => {
            onlineUsers[u].emit(socketEvent.ONLINE, { allOnlineUsers });
        });

    });

    socket.on(socketEvent.PRIVATE_MESSAGE, (data) => {
        const { message, username, stranger } = data || {};

        console.log(username, stranger, message)

        if (onlineUsers.hasOwnProperty(username) && onlineUsers.hasOwnProperty(stranger)) {
            onlineUsers[username].emit(socketEvent.PRIVATE_MESSAGE,
                { username, message, stranger }
            );

            onlineUsers[stranger].emit(socketEvent.PRIVATE_MESSAGE,
                { username, message, stranger: username }
            );
        }
    });

    socket.on(socketEvent.DISCONNECT, (username) => {
        console.log('user disconnected', username)

        if (onlineUsers.hasOwnProperty(username)) {
            delete onlineUsers[username];

            const allOnlineUsers = Object.keys(onlineUsers);
            allOnlineUsers.forEach(u => {
                onlineUsers[u].emit(socketEvent.ONLINE, { allOnlineUsers });
            });
        }
    });

};
