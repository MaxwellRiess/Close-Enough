const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const GameManager = require('./game/GameManager');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Store rooms: roomId -> GameManager
const rooms = new Map();
// Store player -> roomId mapping for quick lookup
const playerRooms = new Map();

// Helper to generate room ID
function generateRoomId() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
}

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('create_room', ({ username }) => {
        const roomId = generateRoomId();
        const gameManager = new GameManager(io, roomId);
        rooms.set(roomId, gameManager);

        socket.join(roomId);
        playerRooms.set(socket.id, roomId);

        gameManager.addPlayer(socket.id, username);
        socket.emit('room_created', { roomId });
        console.log(`Room ${roomId} created by ${username}`);
    });

    socket.on('join_room', ({ username, roomId }) => {
        roomId = roomId.toUpperCase();
        const gameManager = rooms.get(roomId);

        if (gameManager) {
            socket.join(roomId);
            playerRooms.set(socket.id, roomId);
            gameManager.addPlayer(socket.id, username);
            socket.emit('room_joined', { roomId });
            console.log(`${username} joined room ${roomId}`);
        } else {
            socket.emit('error', { message: 'Room not found' });
        }
    });

    socket.on('start_game', () => {
        const roomId = playerRooms.get(socket.id);
        const gameManager = rooms.get(roomId);
        if (gameManager) {
            gameManager.startGame();
        }
    });

    socket.on('submit_answer', ({ min, max, ability, target }) => {
        const roomId = playerRooms.get(socket.id);
        const gameManager = rooms.get(roomId);
        if (gameManager) {
            gameManager.submitAnswer(socket.id, min, max, ability, target);
        }
    });

    socket.on('next_question', () => {
        const roomId = playerRooms.get(socket.id);
        const gameManager = rooms.get(roomId);
        if (gameManager) {
            gameManager.nextQuestionManual(socket.id);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        const roomId = playerRooms.get(socket.id);
        if (roomId) {
            const gameManager = rooms.get(roomId);
            if (gameManager) {
                gameManager.removePlayer(socket.id);
                // Optional: Clean up empty rooms
                if (gameManager.players.size === 0) {
                    rooms.delete(roomId);
                    console.log(`Room ${roomId} deleted (empty)`);
                }
            }
            playerRooms.delete(socket.id);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
