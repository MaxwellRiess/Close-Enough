const Player = require('./Player');

const QUESTIONS = [
    { text: "How many bones are in the adult human body?", answer: 206 },
    { text: "What is the height of Mount Everest in meters?", answer: 8848 },
    { text: "In what year did the Titanic sink?", answer: 1912 },
    { text: "How many keys are on a standard piano?", answer: 88 },
    { text: "What is the speed of sound in air (m/s) at 20°C?", answer: 343 },
    { text: "What year was the first iPhone released?", answer: 2007 },
    { text: "How many elements are in the periodic table?", answer: 118 },
    { text: "What is the diameter of Earth in kilometers?", answer: 12742 },
    { text: "How many stripes are on the US flag?", answer: 13 },
    { text: "What is the boiling point of water in Fahrenheit?", answer: 212 },
    { text: "How many bones are in the adult human body?", answer: 206 },
    { text: "What is the height of Mount Everest in meters?", answer: 8848 },
    { text: "In what year did the Titanic sink?", answer: 1912 },
    { text: "How many stripes are on the United States flag?", answer: 13 },
    { text: "What is the speed of light in meters per second (approx)?", answer: 299792458 },
    { text: "How many keys are on a standard piano?", answer: 88 },
    { text: "How many minutes are in a day?", answer: 1440 },
    { text: "What year was the first iPhone released?", answer: 2007 },
    { text: "How many hearts does an octopus have?", answer: 3 },
    { text: "What is the boiling point of water in degrees Fahrenheit?", answer: 212 },
    { text: "How many episodes of 'Friends' were aired?", answer: 236 },
    { text: "What is the maximum score in a game of Ten-Pin Bowling?", answer: 300 },
    { text: "How many players are on a standard soccer team?", answer: 11 },
    { text: "In what year did man first walk on the moon?", answer: 1969 },
    { text: "How many degrees are in a circle?", answer: 360 },
    { text: "What is the length of a marathon in kilometers (rounded)?", answer: 42 },
    { text: "How many taste buds does the average human tongue have?", answer: 10000 },
    { text: "What year did World War II end?", answer: 1945 },
    { text: "How many sides does a Heptagon have?", answer: 7 },
    { text: "How many elements are on the periodic table?", answer: 118 },
    { text: "What is the top speed of a cheetah in km/h?", answer: 120 },
    { text: "How many cards are in a standard deck (without jokers)?", answer: 52 },
    { text: "What is the height of the Eiffel Tower in meters (including tip)?", answer: 330 },
    { text: "How many colors are in a rainbow?", answer: 7 },
    { text: "How many stars are on the flag of China?", answer: 5 },
    { text: "In what year was the company Google founded?", answer: 1998 },
    { text: "How many vertebrae are in a giraffe's neck?", answer: 7 },
    { text: "What is the average lifespan of a housefly in days?", answer: 28 },
    { text: "How many pounds in a ton (US)?", answer: 2000 },
    { text: "What year did the Berlin Wall fall?", answer: 1989 },
    { text: "How many faces does a Dungeons & Dragons D20 die have?", answer: 20 },
    { text: "How many grooves are on the edge of a quarter (US)?", answer: 119 },
    { text: "What is the diameter of Earth in kilometers (approx)?", answer: 12742 },
    { text: "How many teeth does an adult human have (including wisdom teeth)?", answer: 32 },
    { text: "How many Oscars did the movie 'Titanic' win?", answer: 11 },
    { text: "In what year was the Declaration of Independence signed?", answer: 1776 },
    { text: "How many squares are on a chess board?", answer: 64 },
    { text: "How many lungs does a human have?", answer: 2 },
    { text: "What is the speed of sound in dry air at 20°C in m/s?", answer: 343 },
    { text: "How many Harry Potter books are there?", answer: 7 },
    { text: "How many feet are in a mile?", answer: 5280 },
    { text: "What year did the first Star Wars movie come out?", answer: 1977 },
    { text: "How many legs does a spider have?", answer: 8 },
    { text: "How many Earths could fit inside the Sun?", answer: 1300000 },
    { text: "What is the total number of dots on a pair of dice?", answer: 42 },
    { text: "How many symphonies did Beethoven write?", answer: 9 },
    { text: "In what year did the French Revolution begin?", answer: 1789 },
    { text: "How many muscles does a cat have in each ear?", answer: 32 },
    { text: "How many letters are in the English alphabet?", answer: 26 },
    { text: "What is the distance from Earth to the Moon in kilometers (average)?", answer: 384400 },
    { text: "How many wives did Henry VIII have?", answer: 6 },
    { text: "What year was Facebook launched?", answer: 2004 },
    { text: "How many original Pokémon were there in Gen 1?", answer: 151 },
    { text: "How many countries are in the United Kingdom?", answer: 4 },
    { text: "What is the freezing point of water in Fahrenheit?", answer: 32 },
    { text: "How many bones does a shark have?", answer: 0 },
    { text: "In what year was Nelson Mandela released from prison?", answer: 1990 },
    { text: "How many milliliters are in a liter?", answer: 1000 },
    { text: "What is the number of the beast?", answer: 666 },
    { text: "How many rings make up the Olympic logo?", answer: 5 },
    { text: "What year did video streaming site YouTube launch?", answer: 2005 },
    { text: "How many strings does a standard guitar have?", answer: 6 },
    { text: "What is the approximate surface temperature of the Sun in Celsius?", answer: 5500 },
    { text: "How many time zones are there in China?", answer: 1 },
    { text: "How many ribs are in the human body?", answer: 24 },
    { text: "What year did the Chernobyl disaster occur?", answer: 1986 },
    { text: "How many holes are there on a standard golf course?", answer: 18 },
    { text: "What is the perfect score in a game of Pac-Man?", answer: 3333360 },
    { text: "How many chambers does the human heart have?", answer: 4 },
    { text: "How many years does a US President serve in one term?", answer: 4 },
    { text: "What is the atomic number of Oxygen?", answer: 8 },
    { text: "How many cups are in a gallon?", answer: 16 },
    { text: "In what year was the Magna Carta signed?", answer: 1215 },
    { text: "How many compartments are in a cow's stomach?", answer: 4 },
    { text: "How many miles is the Great Wall of China (approx)?", answer: 13171 },
    { text: "How many players are on a baseball team on the field?", answer: 9 },
    { text: "What year was the PlayStation 1 released in Japan?", answer: 1994 },
    { text: "How many dots are on a Pac-Man board?", answer: 240 },
    { text: "How many years of marriage is the Golden Wedding Anniversary?", answer: 50 },
    { text: "What is the Roman Numeral 'L' equal to?", answer: 50 },
    { text: "How many legs does a lobster have?", answer: 10 },
    { text: "In what year did the Soviet Union dissolve?", answer: 1991 },
    { text: "How many points is the letter 'Z' worth in Scrabble?", answer: 10 },
    { text: "How many states are in the USA?", answer: 50 },
    { text: "How many tentacles does a squid have?", answer: 2 },
    { text: "What year was the World Wide Web invented?", answer: 1989 },
    { text: "How many breaths does the average person take per day?", answer: 23000 },
    { text: "How many sides does a stop sign have?", answer: 8 },
    { text: "How many protons are in a Gold atom?", answer: 79 },
    { text: "What is the postcode of the North Pole (Santa's mail)?", answer: 0 },
    { text: "How many Great Lakes are there in North America?", answer: 5 },
    { text: "In what year was the Great Fire of London?", answer: 1666 },
    { text: "How many pieces does each player start with in Chess?", answer: 16 },
    { text: "How many colors are in the Google logo?", answer: 4 },
    { text: "What is the length of a rugby union match in minutes?", answer: 80 },
    { text: "How many horns did a Triceratops have?", answer: 3 },
    { text: "What year was the first Harry Potter book published?", answer: 1997 },
    { text: "How many chromosomes do humans have?", answer: 46 },
    { text: "How many feet are in a fathom?", answer: 6 },
    { text: "How many eyelids does a camel have on each eye?", answer: 3 },
    { text: "What is the ISO country code for the United Kingdom?", answer: 826 },
    { text: "How many floors are in the Empire State Building?", answer: 102 },
    { text: "In what year did Christopher Columbus reach the Americas?", answer: 1492 },
    { text: "How many weeks are in a year?", answer: 52 },
    { text: "How many eyes does a bee have?", answer: 5 },
    { text: "What is the area code for New York City (Manhattan)?", answer: 212 },
    { text: "How many petals does a lily usually have?", answer: 6 },
    { text: "How many moons does Mars have?", answer: 2 },
    { text: "What year did Elvis Presley die?", answer: 1977 },
    { text: "How many items are in a baker's dozen?", answer: 13 },
    { text: "How many zeros are in one billion?", answer: 9 },
    { text: "How many teeth does an Aardvark have?", answer: 0 },
    { text: "What is the emergency number in the UK?", answer: 999 },
    { text: "How many sides does a hexagon have?", answer: 6 },
    { text: "In what year was the United Nations established?", answer: 1945 },
    { text: "How many players are on a basketball team on the court?", answer: 5 },
    { text: "How many keys are on a standard computer keyboard?", answer: 104 },
    { text: "How many cents are in a nickel?", answer: 5 },
    { text: "What year was the Eiffel Tower completed?", answer: 1889 },
    { text: "How many distinct flavors of Jelly Belly beans are there (official mix)?", answer: 50 },
    { text: "How many bytes are in a kilobyte?", answer: 1024 },
    { text: "How many herbs and spices are in KFC's original recipe?", answer: 11 },
    { text: "What year did The Beatles break up?", answer: 1970 },
    { text: "How many legs does a millipede actually have (maximum recorded)?", answer: 1300 },
    { text: "How many calories are in a standard Big Mac (approx)?", answer: 563 },
    { text: "How many stars are on the European Union flag?", answer: 12 },
    { text: "What is the atomic number of Carbon?", answer: 6 },
    { text: "How many inches are in a yard?", answer: 36 },
    { text: "In what year did Microsoft Windows 95 launch?", answer: 1995 },
    { text: "How many dots are on the Domino's Pizza logo?", answer: 3 },
    { text: "How many miles is a marathon?", answer: 26 },
    { text: "How many digits of Pi are usually used in basic math?", answer: 3 },
    { text: "How many holes are in a standard saltine cracker?", answer: 13 },
    { text: "What year did Netflix start streaming?", answer: 2007 },
    { text: "How many pockets are on a pool table?", answer: 6 },
    { text: "How many arms does a starfish typically have?", answer: 5 },
    { text: "What is the gravitational pull of Earth (m/s²)?", answer: 9 },
    { text: "How many sides does a snowflake have?", answer: 6 },
    { text: "In what year did the euro currency enter circulation?", answer: 2002 },
    { text: "How many strings does a violin have?", answer: 4 },
    { text: "How many pounds does the average human brain weigh?", answer: 3 },
    { text: "How many black keys are on a piano?", answer: 36 },
    { text: "What year did Disney release 'Snow White'?", answer: 1937 },
    { text: "How many players are in a Rugby League team?", answer: 13 },
    { text: "How many faces does a cube have?", answer: 6 },
    { text: "How many varieties does Heinz advertise?", answer: 57 },
    { text: "What is the wattage of a standard bright lightbulb?", answer: 60 },
    { text: "How many miles deep is the Mariana Trench (approx)?", answer: 7 },
    { text: "In what year was the first email sent?", answer: 1971 },
    { text: "How many commandments are there in the Old Testament?", answer: 10 },
    { text: "How many seconds are in a minute?", answer: 60 },
    { text: "How many degrees are in a right angle?", answer: 90 },
    { text: "What year did the US Civil War begin?", answer: 1861 },
    { text: "How many spots are on a standard ladybug?", answer: 7 },
    { text: "How many continents are there?", answer: 7 },
    { text: "How many oceans are there on Earth?", answer: 5 },
    { text: "What is the voltage of a standard US electrical outlet?", answer: 120 },
    { text: "How many cards are dealt to a player in Texas Hold'em?", answer: 2 },
    { text: "In what year was the first modern Olympics held?", answer: 1896 },
    { text: "How many signs are in the Zodiac?", answer: 12 },
    { text: "How many legs does a crab have?", answer: 10 },
    { text: "What is the melting point of gold in Celsius?", answer: 1064 },
    { text: "How many rings are on a standard archery target?", answer: 10 },
    { text: "What year was Amazon founded?", answer: 1994 },
    { text: "How many letters are in the longest English word?", answer: 45 },
    { text: "How many chambers does a dog's heart have?", answer: 4 },
    { text: "How many humps does a Bactrian camel have?", answer: 2 },
    { text: "In what year was the iPad released?", answer: 2010 },
    { text: "How many players are on a volleyball team?", answer: 6 },
    { text: "How many pawns are on a chessboard at the start?", answer: 16 },
    { text: "What is the answer to the Ultimate Question of Life, the Universe, and Everything?", answer: 42 },
    { text: "How many sides does a pentagon have?", answer: 5 },
    { text: "What year was the Rubik's Cube invented?", answer: 1974 },
    { text: "How many dimples are on a standard golf ball?", answer: 336 },
    { text: "How many planets are in our solar system?", answer: 8 },
    { text: "How many furlongs are in a mile?", answer: 8 },
    { text: "In what year was the battle of Hastings?", answer: 1066 },
    { text: "How many milliliters are in a teaspoon?", answer: 5 },
    { text: "How many claws does a domestic cat have?", answer: 18 },
    { text: "How many permanent members are in the UN Security Council?", answer: 5 },
    { text: "What year was the first tweet sent?", answer: 2006 },
    { text: "How many strings does a bass guitar usually have?", answer: 4 },
    { text: "How many tiles are in a game of Scrabble?", answer: 100 },
    { text: "How many lives is a cat said to have?", answer: 9 },
    { text: "What is the minimum voting age in the USA?", answer: 18 },
    { text: "In what year did mankind invent the airplane?", answer: 1903 },
    { text: "How many sides does a triangle have?", answer: 3 },
    { text: "How many zeros are in a googol?", answer: 100 },
    { text: "How many wisdom teeth does a human typically develop?", answer: 4 },
    { text: "What year was the first Super Bowl played?", answer: 1967 },
    { text: "How many holes are in a standard polo mint?", answer: 1 },
    { text: "How many colors are on the flag of France?", answer: 3 },
    { text: "How many days are in a leap year?", answer: 366 },
    { text: "What is the atomic number of Hydrogen?", answer: 1 },
    { text: "In what year did Instagram launch?", answer: 2010 },
    { text: "How many players are on a cricket team?", answer: 11 },
    { text: "How many wheels does a unicycle have?", answer: 1 },
    { text: "How many films are in the Lord of the Rings trilogy?", answer: 3 },
    { text: "How many distinct bones are in the human ear?", answer: 3 },
    { text: "What year did Justin Bieber release 'Baby'?", answer: 2010 },
    { text: "How many sides does a decagon have?", answer: 10 },
    { text: "How many arms does a snowflake usually have?", answer: 6 },
    { text: "How many calories are in a gram of fat?", answer: 9 },
    { text: "In what year was the first video uploaded to YouTube?", answer: 2005 },
    { text: "How many spaces does a player move in Monopoly if they roll snake eyes?", answer: 2 },
    { text: "How many noses does a slug have?", answer: 4 },
    { text: "What is the standard frame rate for movies (fps)?", answer: 24 },
    { text: "How many years are in a millennium?", answer: 1000 },
    { text: "What year was the game Minecraft released?", answer: 2011 },
    { text: "How many syllables are in the word 'Unbelievable'?", answer: 5 },
    { text: "How many fluid ounces are in a US cup?", answer: 8 },
    { text: "How many segments does an insect body have?", answer: 3 },
    { text: "In what year did Henry Ford introduce the Model T?", answer: 1908 },
    { text: "How many dots are on a standard pair of dominoes?", answer: 28 },
    { text: "How many letters are in the Hawaiian alphabet?", answer: 13 }

];

class GameManager {
    constructor(io, roomId) {
        this.io = io;
        this.roomId = roomId;
        this.players = new Map(); // socketId -> Player
        this.gameState = 'LOBBY'; // LOBBY, QUESTION, REVEAL, END
        this.currentQuestionIndex = 0;
        this.currentQuestion = null;
        this.answers = new Map(); // socketId -> { min, max }
        this.shuffledQuestions = [];
    }

    addPlayer(socketId, username) {
        const player = new Player(socketId, username);
        this.players.set(socketId, player);

        this.io.to(this.roomId).emit('update_player_list', Array.from(this.players.values()));

        // If game is in progress, send current state to new player (as spectator/waiting)
        if (this.gameState !== 'LOBBY') {
            // Logic for late joiners could go here
        }
    }

    removePlayer(socketId) {
        this.players.delete(socketId);
        this.answers.delete(socketId);
        this.io.to(this.roomId).emit('update_player_list', Array.from(this.players.values()));
    }

    startGame() {
        if (this.players.size < 1) return; // Need players to start

        // Shuffle questions
        this.shuffledQuestions = [...QUESTIONS].sort(() => Math.random() - 0.5);

        this.gameState = 'QUESTION';
        this.currentQuestionIndex = 0;
        this.nextQuestion();
    }

    nextQuestion() {
        if (this.currentQuestionIndex >= this.shuffledQuestions.length) {
            this.endGame();
            return;
        }

        this.currentQuestion = this.shuffledQuestions[this.currentQuestionIndex];
        this.answers.clear();
        this.gameState = 'QUESTION';

        this.io.to(this.roomId).emit('game_state_change', {
            state: 'QUESTION',
            question: this.currentQuestion.text
        });
    }

    submitAnswer(socketId, min, max) {
        if (this.gameState !== 'QUESTION') return;

        // Validate input
        min = parseFloat(min);
        max = parseFloat(max);
        if (isNaN(min) || isNaN(max)) return;

        this.answers.set(socketId, { min, max });

        // Check if all players answered
        if (this.answers.size === this.players.size) {
            this.revealResults();
        } else {
            // Notify how many have answered
            this.io.to(this.roomId).emit('answers_progress', {
                current: this.answers.size,
                total: this.players.size
            });
        }
    }

    revealResults() {
        this.gameState = 'REVEAL';
        const correctAnswer = this.currentQuestion.answer;
        const results = [];

        // Calculate scores
        // 1. Determine who is correct (answer within range)
        // 2. Among correct, who has smallest range

        let correctPlayers = [];

        for (const [socketId, range] of this.answers) {
            const player = this.players.get(socketId);
            const isCorrect = correctAnswer >= range.min && correctAnswer <= range.max;
            const rangeSize = range.max - range.min;
            const isExact = isCorrect && range.min === range.max; // Or rangeSize === 0

            results.push({
                username: player.username,
                range: range,
                isCorrect: isCorrect,
                rangeSize: rangeSize,
                isExact: isExact
            });

            if (isCorrect) {
                correctPlayers.push({ socketId, rangeSize, isExact });
            }
        }

        // Sort correct players by range size (ascending)
        correctPlayers.sort((a, b) => a.rangeSize - b.rangeSize);

        // Award points
        // Exact answer: 5 points
        // Smallest range (if not exact): 3 points
        // Others correct: 1 point

        if (correctPlayers.length > 0) {
            const bestPlayer = correctPlayers[0];
            const bestRangeSize = correctPlayers[0].rangeSize;

            for (const p of correctPlayers) {
                const player = this.players.get(p.socketId);

                if (p.rangeSize === bestRangeSize) {
                    // This is a winner
                    if (p.isExact) {
                        player.score += 5;
                    } else {
                        player.score += 3;
                    }
                } else {
                    // Runner up
                    player.score += 1;
                }
            }
        }

        this.io.to(this.roomId).emit('game_state_change', {
            state: 'REVEAL',
            correctAnswer: correctAnswer,
            results: results,
            players: Array.from(this.players.values()) // Send updated scores
        });

        // Wait 5 seconds then next question
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.nextQuestion();
        }, 8000);
    }

    endGame() {
        this.gameState = 'END';
        this.io.to(this.roomId).emit('game_state_change', {
            state: 'END',
            players: Array.from(this.players.values())
        });

        // Reset for next game after delay?
        setTimeout(() => {
            this.gameState = 'LOBBY';
            this.players.forEach(p => p.score = 0);
            this.io.to(this.roomId).emit('game_state_change', { state: 'LOBBY' });
            this.io.to(this.roomId).emit('update_player_list', Array.from(this.players.values()));
        }, 10000);
    }
}

module.exports = GameManager;
