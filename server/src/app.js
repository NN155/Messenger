const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();
const path = require('path');
const routes = require('./routes');
const connectDB = require('./config/mongoDB');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const SocketManager = require('./socket/SocketManager');
const socketAuthMiddleware = require('./middlewares/socketAuthMiddleware');

connectDB();

const server = http.createServer(app);

// cors for development
app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true // enable set cookie
}));

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));
app.use(express.json());
app.use(cookieParser());


const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ["GET", "POST"],
    credentials: true,
  }
});

SocketManager.setIo(io);

io.use(socketAuthMiddleware);
io.on('connection', (socket) => {
  SocketManager.handleConnection(socket);
});

app.use('/', routes);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
