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
    submit: document.getElementById('submit-btn'),
    // Ability buttons map
    abilities: {
        COPY: document.getElementById('btn-copy'),
        DOUBLE: document.getElementById('btn-double'),
        SWAP: document.getElementById('btn-swap'),
        cancel: document.getElementById('cancel-ability-btn')
    },
    abilityTargetContainer: document.getElementById('ability-targets'),
    targetSelect1: document.getElementById('target-select-1'),
    targetSelect2: document.getElementById('target-select-2'),
    targetInstruction: document.getElementById('target-instruction'),
    nextQuestion: document.getElementById('next-question-btn')
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
let currentPlayers = []; // Store for target population
let currentAbilities = { COPY: true, DOUBLE: true, SWAP: true }; // Local tracking (server validates)
let selectedAbility = null; // 'COPY', 'DOUBLE', 'SWAP', or null
let isHost = false;

// Helper: Switch View
function switchView(viewName) {
    Object.values(views).forEach(view => view.classList.remove('active'));
    views[viewName].classList.add('active');

    // Reset ability UI when entering question view
    if (viewName === 'question') {
        resetAbilityUI();
    }
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

buttons.nextQuestion.addEventListener('click', () => {
    socket.emit('next_question');
});

buttons.submit.addEventListener('click', () => {
    let min = inputs.min.value;
    let max = inputs.max.value;
    let target = null;

    if (selectedAbility === 'COPY') {
        target = buttons.targetSelect1.value;
        if (!target) {
            alert("Please select a player to copy.");
            return;
        }
        // Dummy values for parsing (server ignores/resolves)
        min = 0; max = 0;
    } else if (selectedAbility === 'SWAP') {
        const t1 = buttons.targetSelect1.value;
        const t2 = buttons.targetSelect2.value;
        if (!t1 || !t2) {
            alert("Please select two players to swap.");
            return;
        }
        if (t1 === t2) {
            alert("Please select two different players.");
            return;
        }
        target = [t1, t2];

        if (!min || !max) { alert("Please enter your range."); return; }
    } else {
        // Normal or DOUBLE
        if (!min || !max) { alert("Please enter your range."); return; }
    }

    // Submit
    socket.emit('submit_answer', { min, max, ability: selectedAbility, target });

    // Optimistic Update
    if (selectedAbility) {
        currentAbilities[selectedAbility] = false;
    }

    buttons.submit.disabled = true;
    display.statusMsg.textContent = "Answer submitted! Waiting for others...";
});

// Ability UI Logic
function resetAbilityUI() {
    selectedAbility = null;
    buttons.abilityTargetContainer.style.display = 'none';
    buttons.targetSelect2.style.display = 'none';
    inputs.min.parentElement.parentElement.style.opacity = '1';
    inputs.min.parentElement.parentElement.style.pointerEvents = 'all';

    // Update button states
    Object.keys(currentAbilities).forEach(key => {
        const btn = buttons.abilities[key];
        if (btn) {
            btn.classList.remove('selected');
            btn.disabled = !currentAbilities[key];
            if (!currentAbilities[key]) btn.classList.add('used');
        }
    });
}

function selectAbility(ability) {
    if (!currentAbilities[ability]) return; // Used already

    // Deselect others
    Object.keys(currentAbilities).forEach(key => buttons.abilities[key].classList.remove('selected'));
    buttons.abilities[ability].classList.add('selected');
    selectedAbility = ability;

    // Setup Targets
    buttons.abilityTargetContainer.style.display = 'block';
    populateTargetSelects();

    if (ability === 'COPY') {
        inputs.min.parentElement.parentElement.style.opacity = '0.3';
        inputs.min.parentElement.parentElement.style.pointerEvents = 'none';
        buttons.targetInstruction.textContent = "Copy answer from:";
        buttons.targetSelect2.style.display = 'none';
    } else if (ability === 'SWAP') {
        inputs.min.parentElement.parentElement.style.opacity = '1';
        inputs.min.parentElement.parentElement.style.pointerEvents = 'all';
        buttons.targetInstruction.textContent = "Swap answers between:";
        buttons.targetSelect2.style.display = 'inline-block';
    } else if (ability === 'DOUBLE') {
        buttons.abilityTargetContainer.style.display = 'none'; // No targets for double
        inputs.min.parentElement.parentElement.style.opacity = '1';
        inputs.min.parentElement.parentElement.style.pointerEvents = 'all';
    }
}

Object.keys(currentAbilities).forEach(key => {
    buttons.abilities[key].addEventListener('click', () => selectAbility(key));
});

buttons.abilities.cancel.addEventListener('click', () => {
    resetAbilityUI();
});

function populateTargetSelects() {
    // Populate dropdowns with other players
    const otherPlayers = currentPlayers.filter(p => p.username !== myUsername);
    const options = `<option value="">Choose...</option>` +
        otherPlayers.map(p => `<option value="${p.id}">${p.username}</option>`).join('');

    buttons.targetSelect1.innerHTML = options;
    buttons.targetSelect2.innerHTML = options;
}

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
    currentPlayers = players; // Update local store
    display.playerList.innerHTML = players.map(p => `<li>${p.username} <span class="score">${p.score} pts</span></li>`).join('');

    // Check Host Status
    isHost = (players.length > 0 && players[0].username === myUsername);

    // Show start button if I am the first player (host) and enough players
    if (isHost) {
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

            // Sync abilities logic (if rejoining or refreshing, complex, simplifying to assume 1 session for now)
            resetAbilityUI();
            break;
        case 'REVEAL':
            switchView('reveal');
            display.revealAnswer.textContent = data.correctAnswer;
            display.resultsList.innerHTML = data.results.map(r => `
                <div class="result-item ${r.isCorrect ? (r.points > 1 ? 'correct' : 'correct-secondary') : 'incorrect'} ${r.isExact ? 'exact' : ''}">
                    <span class="name">
                        ${r.username} 
                        ${r.ability === 'COPY' ? '📋' : ''}
                        ${r.ability === 'DOUBLE' ? '2️⃣' : ''}
                        ${r.ability === 'SWAP' ? '🔄' : ''}
                    </span>
                    <span class="range">${r.range.min} - ${r.range.max}</span>
                    <span class="points">+${r.points}</span>
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

            // Show Next Question button if Host
            if (isHost) {
                buttons.nextQuestion.style.display = 'block';
            } else {
                buttons.nextQuestion.style.display = 'none';
            }
            break;
        case 'END':
            switchView('end');
            const winnerHtml = data.winner ? `<div id="winner-display">WINNER: ${data.winner.username}</div>` : '';
            display.finalScores.innerHTML = winnerHtml + data.players
                .sort((a, b) => b.score - a.score)
                .map((p, i) => `
                    <div class="final-score-item">
                        <span class="rank">#${i + 1}</span>
                        <span class="name">${p.username}</span>
                        <span class="score">${p.score} pts</span>
                    </div>
                `).join('');

            if (data.winner) {
                createConfetti();
            }
            // Reset local abilities for next game
            currentAbilities = { COPY: true, DOUBLE: true, SWAP: true };
            break;
    }
});

function createConfetti() {
    const colors = ['#D93025', '#D4AF37', '#2A9D8F', '#F2F0E9'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}


socket.on('answers_progress', (data) => {
    display.statusMsg.textContent = `Answer submitted! (${data.current}/${data.total} players ready)`;
});
