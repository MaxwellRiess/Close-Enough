const socket = io();

// DOM Elements
const views = {
    landing: document.getElementById('landing-view'),
    createRoom: document.getElementById('create-room-view'),
    joinRoom: document.getElementById('join-room-view'),
    lobby: document.getElementById('lobby-view'),
    question: document.getElementById('question-view'),
    reveal: document.getElementById('reveal-view'),
    end: document.getElementById('end-view')
};

const inputs = {
    createUsername: document.getElementById('create-username-input'),
    joinUsername: document.getElementById('join-username-input'),
    roomCode: document.getElementById('room-code-input'),
    min: document.getElementById('min-input'),
    max: document.getElementById('max-input')
};

const buttons = {
    toCreate: document.getElementById('to-create-btn'),
    toJoin: document.getElementById('to-join-btn'),
    create: document.getElementById('create-btn'),
    join: document.getElementById('join-btn'),
    start: document.getElementById('start-btn'),
    submit: document.getElementById('submit-btn')
};

const display = {
    roomCode: document.getElementById('room-code-display'),
    playerList: document.getElementById('player-list'),
    questionText: document.getElementById('question-text'),
    waitingMsg: document.getElementById('waiting-msg'),
    statusMsg: document.getElementById('status-msg'),
    revealAnswer: document.getElementById('reveal-answer'),
    resultsList: document.getElementById('results-list'),
    finalScores: document.getElementById('final-scores')
};

let myUsername = '';
let currentRoomId = '';

// Helper: Switch View
function switchView(viewName) {
    Object.values(views).forEach(view => view.classList.remove('active'));
    views[viewName].classList.add('active');
}

// Event Listeners
buttons.toCreate.addEventListener('click', () => {
    switchView('createRoom');
});

buttons.toJoin.addEventListener('click', () => {
    switchView('joinRoom');
});

buttons.create.addEventListener('click', () => {
    const username = inputs.createUsername.value.trim();
    if (username) {
        myUsername = username;
        socket.emit('create_room', { username });
    } else {
        alert("Please enter a username");
    }
});

buttons.join.addEventListener('click', () => {
    const username = inputs.joinUsername.value.trim();
    const roomId = inputs.roomCode.value.trim().toUpperCase();

    if (username && roomId) {
        myUsername = username;
        socket.emit('join_room', { username, roomId });
    } else {
        alert("Please enter a username and room code");
    }
});

buttons.start.addEventListener('click', () => {
    socket.emit('start_game');
});

buttons.submit.addEventListener('click', () => {
    const min = inputs.min.value;
    const max = inputs.max.value;

    if (min && max) {
        socket.emit('submit_answer', { min, max });
        buttons.submit.disabled = true;
        display.statusMsg.textContent = "Answer submitted! Waiting for others...";
    }
});

// Socket Events
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('room_created', ({ roomId }) => {
    currentRoomId = roomId;
    display.roomCode.textContent = roomId;
    switchView('lobby');
});

socket.on('room_joined', ({ roomId }) => {
    currentRoomId = roomId;
    display.roomCode.textContent = roomId;
    switchView('lobby');
});

socket.on('error', (data) => {
    alert(data.message);
});

socket.on('update_player_list', (players) => {
    display.playerList.innerHTML = players.map(p => `<li>${p.username} <span class="score">${p.score} pts</span></li>`).join('');

    // Show start button if I am the first player (host) and enough players
    if (players.length > 0 && players[0].username === myUsername) {
        buttons.start.style.display = 'block';
        display.waitingMsg.style.display = 'none';
    } else {
        buttons.start.style.display = 'none';
        display.waitingMsg.style.display = 'block';
    }
});

socket.on('game_state_change', (data) => {
    switch (data.state) {
        case 'LOBBY':
            switchView('lobby');
            break;
        case 'QUESTION':
            switchView('question');
            display.questionText.textContent = data.question;
            inputs.min.value = '';
            inputs.max.value = '';
            buttons.submit.disabled = false;
            display.statusMsg.textContent = '';
            break;
        case 'REVEAL':
            switchView('reveal');
            display.revealAnswer.textContent = data.correctAnswer;
            display.resultsList.innerHTML = data.results.map(r => `
                <div class="result-item ${r.isCorrect ? 'correct' : 'incorrect'} ${r.isExact ? 'exact' : ''}">
                    <span class="name">${r.username}</span>
                    <span class="range">[${r.range.min} - ${r.range.max}]</span>
                    ${r.isCorrect ? `<span class="points">+${r.isExact ? '5' : (r.rangeSize === data.results.filter(res => res.isCorrect).sort((a, b) => a.rangeSize - b.rangeSize)[0]?.rangeSize ? '3' : '1')}</span>` : ''}
                </div>
            `).join('');

            // Update Leaderboard
            const leaderboardContainer = document.getElementById('reveal-leaderboard');
            if (leaderboardContainer) {
                leaderboardContainer.innerHTML = `
                    <h3>LEADERBOARD</h3>
                    ${data.players
                        .sort((a, b) => b.score - a.score)
                        .map((p, i) => `
                            <div class="leaderboard-item">
                                <span class="rank">#${i + 1}</span>
                                <span class="name">${p.username}</span>
                                <span class="score">${p.score} pts</span>
                            </div>
                        `).join('')}
                `;
            }
            break;
        case 'END':
            switchView('end');
            display.finalScores.innerHTML = data.players
                .sort((a, b) => b.score - a.score)
                .map((p, i) => `
                    <div class="final-score-item">
                        <span class="rank">#${i + 1}</span>
                        <span class="name">${p.username}</span>
                        <span class="score">${p.score} pts</span>
                    </div>
                `).join('');
            break;
    }
});

socket.on('answers_progress', (data) => {
    display.statusMsg.textContent = `Answer submitted! (${data.current}/${data.total} players ready)`;
});
