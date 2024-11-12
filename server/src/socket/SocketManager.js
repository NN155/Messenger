class SocketManager  {
    constructor() {
        this.io = null;
        this.onlineUsers = {
            bySocketId: {}, // { socketId: userId }
            byUserId: {}    // { userId: [socketId1, socketId2] }
        };

    }
    getSocketsId(userId) {
        return this.onlineUsers.byUserId[userId];
    }


    setIo(io) {
        this.io = io;
    }

    handleConnection(socket) {
        this._addSocket(socket);
        this.handleDisconnect(socket);
    }

    handleDisconnect(socket) {
        socket.on('disconnect', () => {
            this._removeSocket(socket);
        });
    }

    _addSocket = (socket) => {
        const userId = socket.userId;

        this.onlineUsers.bySocketId[socket.id] = userId;

        if (!this.onlineUsers.byUserId[userId]) {
            this.onlineUsers.byUserId[userId] = [];
        }
        this.onlineUsers.byUserId[userId].push(socket.id);

        console.log(`User ${userId} connected. Active sockets: ${this.onlineUsers.byUserId[userId]}`);
    };

    _removeSocket = (socket) => {
        const userId = socket.userId; 

        delete this.onlineUsers.bySocketId[socket.id];

        if (this.onlineUsers.byUserId[userId]) {
            this.onlineUsers.byUserId[userId] = this.onlineUsers.byUserId[userId].filter(id => id !== socket.id);
            if (this.onlineUsers.byUserId[userId].length === 0) {
                delete this.onlineUsers.byUserId[userId]; 
            }
        }

        console.log(`User ${userId} disconnected. Active sockets: ${this.onlineUsers.byUserId[userId] || 'none'}`);
    };
}

module.exports = new SocketManager();
