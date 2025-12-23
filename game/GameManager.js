const Player = require('./Player');

const QUESTIONS = [
    { text: "How many grooves are on the edge of a UK 10 pence coin?", answer: 118 },
    { text: "What is the top speed of a garden snail in metres per hour?", answer: 48 },
    { text: "How many distinct pieces are in the LEGO 'Millennium Falcon' Ultimate Collector Series set?", answer: 7541 },
    { text: "What is the average number of sesame seeds on a Big Mac bun?", answer: 178 },
    { text: "How many minutes long is the movie 'Titanic'?", answer: 195 },
    { text: "How many millions of spots are on the 101 Dalmatians in the Disney movie?", answer: 6 },
    { text: "How many steps are there to the top of the Eiffel Tower?", answer: 1665 },
    { text: "What is the boiling point of Iron in degrees Celsius?", answer: 2862 },
    { text: "How many thousands of feathers does a swan have approximately?", answer: 25 },
    { text: "What is the maximum number of points you can score in a perfect game of Cribbage?", answer: 29 },
    { text: "How many spoken lines does Darth Vader have in the original Star Wars trilogy?", answer: 44 },
    { text: "What is the height of the Burj Khalifa in metres?", answer: 828 },
    { text: "How many billions of standard 2x4 LEGO bricks are needed to reach the moon?", answer: 40 },
    { text: "How many distinct languages exist in the world today (approx)?", answer: 7139 },
    { text: "What is the total number of squares on a standard Scrabble board?", answer: 225 },
    { text: "How many muscles are used to take a single step?", answer: 200 },
    { text: "What is the surface temperature of Venus in degrees Celsius?", answer: 462 },
    { text: "How many episodes of 'The Simpsons' were aired in the first 30 seasons?", answer: 662 },
    { text: "How many elevators are in the Empire State Building?", answer: 73 },
    { text: "How many litres of water does the average person use per day in the UK?", answer: 142 },
    { text: "What is the speed of sound in water (metres per second)?", answer: 1480 },
    { text: "How many ridges are on the edge of a US dime?", answer: 118 },
    { text: "What is the precise number of ways to make change for a US dollar?", answer: 293 },
    { text: "How many individual kernels are on an average ear of corn?", answer: 800 },
    { text: "What is the distance of the Tour de France in miles (approx average)?", answer: 2200 },
    { text: "How many distinct flavors are in the 'Dr. Pepper' recipe?", answer: 23 },
    { text: "How many paintings did Vincent Van Gogh sell during his lifetime?", answer: 1 },
    { text: "What is the heart rate of a blue whale in beats per minute?", answer: 6 },
    { text: "How many stitches are on a regulation baseball?", answer: 108 },
    { text: "How many individual baked beans are in a standard 415g Heinz tin (approx)?", answer: 465 },
    { text: "How many rivets were used in the construction of the Eiffel Tower (in millions)?", answer: 2 },
    { text: "What is the average number of hairs on a human head?", answer: 100000 },
    { text: "How many thousands of islands make up the country of Sweden?", answer: 267 },
    { text: "How many calories are in a standard avocado?", answer: 322 },
    { text: "How many active volcanoes are there in the world (approx)?", answer: 1350 },
    { text: "How many words are in the first Harry Potter book (UK edition)?", answer: 76944 },
    { text: "What is the approximate weight of a cumulus cloud in tonnes?", answer: 500 },
    { text: "How many distinct bones are in a python's body?", answer: 600 },
    { text: "How many thousands of miles of blood vessels are in the human body?", answer: 60 },
    { text: "How many times does a hummingbird beat its wings per second?", answer: 50 },
    { text: "How many rooms are in the White House?", answer: 132 },
    { text: "How many litres of milk does a cow produce in a year (approx)?", answer: 8700 },
    { text: "How many thousands of quills does a porcupine have approximately?", answer: 30 },
    { text: "How many windows are on the front facade of Buckingham Palace?", answer: 760 },
    { text: "What is the max lifespan of a Giant Tortoise in years?", answer: 190 },
    { text: "How many confirmed moons does Jupiter have?", answer: 95 },
    { text: "How many calories are in a whole large pepperoni pizza (Domino's)?", answer: 2640 },
    { text: "What is the bite force of a human in PSI?", answer: 162 },
    { text: "How many individual Cheerios are in a standard box?", answer: 2700 },
    { text: "How many thousands of miles is the circumference of the Earth at the equator?", answer: 24 },
    { text: "How many teeth does a garden snail have?", answer: 14000 },
    { text: "What is the total number of verses in the Bible (KJV)?", answer: 31102 },
    { text: "How many thousands of degrees Celsius is a lightning bolt?", answer: 27 },
    { text: "How many thousands of frames of animation were drawn for 'Snow White'?", answer: 166 },
    { text: "What is the weight of a standard gold bar in kilograms?", answer: 12 },
    { text: "How many thousands of times does the average person blink in a day?", answer: 28 },
    { text: "How many distinct species of ants are there?", answer: 12000 },
    { text: "How many miles away is the International Space Station?", answer: 254 },
    { text: "What is the frequency of the musical note 'Middle C' in Hz?", answer: 261 },
    { text: "How many cup holders are in a standard minivan?", answer: 12 },
    { text: "How many distinct pieces of wood were used to build the Spruce Goose?", answer: 0 },
    { text: "How many breaths does a blue whale take per minute while resting?", answer: 4 },
    { text: "How many layers of pasta are in a traditional lasagna?", answer: 4 },
    { text: "What is the speed of a sneeze in miles per hour?", answer: 100 },
    { text: "How many cocoa beans does it take to make a kilogram of chocolate?", answer: 880 },
    { text: "How many steps are in the Empire State Building run-up race?", answer: 1576 },
    { text: "What is the crush depth of a modern military submarine in metres (approx)?", answer: 730 },
    { text: "How many distinct combinations does a standard combination lock have?", answer: 64000 },
    { text: "How many kilograms does the Liberty Bell weigh?", answer: 943 },
    { text: "How many Earths could fit inside Jupiter?", answer: 1300 },
    { text: "How many taste buds are in a chicken's mouth?", answer: 24 },
    { text: "What is the number of grooves on a vinyl record per side?", answer: 1 },
    { text: "How many minutes does it take sunlight to reach Earth?", answer: 8 },
    { text: "How many bones are in a horse's skeleton?", answer: 205 },
    { text: "How many thousands of distinct characters are in the Chinese language (approx)?", answer: 50 },
    { text: "What is the length of the Amazon River in miles?", answer: 4000 },
    { text: "How many dimples are on a standard Titleist Pro V1 golf ball?", answer: 388 },
    { text: "How many times does a fly beat its wings per second?", answer: 200 },
    { text: "How many feet are in a nautical mile?", answer: 6076 },
    { text: "How many kilograms of food does a panda eat per day?", answer: 12 },
    { text: "How many millions of individual pixels are in a 4K resolution screen?", answer: 8 },
    { text: "How many trillions of distinct scents can the human nose detect?", answer: 1 },
    { text: "How many active geysers are in Yellowstone National Park?", answer: 500 },
    { text: "What is the rpm of a standard hard drive?", answer: 7200 },
    { text: "How many muscles are in a cat's ear?", answer: 32 },
    { text: "How many miles long is the Great Barrier Reef?", answer: 1429 },
    { text: "How many litres of saliva does a human produce in a year?", answer: 365 },
    { text: "How many seeds are in a standard pomegranate?", answer: 613 },
    { text: "How many millions of distinct colors can the human eye see?", answer: 1 },
    { text: "What is the brake horsepower (bhp) of a standard Ford Fiesta?", answer: 74 },
    { text: "How many billions of cups of coffee are consumed globally per day?", answer: 2 },
    { text: "How many metres high is the Hollywood sign?", answer: 14 },
    { text: "How many muscles does a caterpillar have?", answer: 4000 },
    { text: "How many millions of bubbles are in a pint of Guinness?", answer: 3 },
    { text: "How many miles can a wolf travel in 24 hours?", answer: 40 },
    { text: "How many distinct patent applications did Thomas Edison file?", answer: 1093 },
    { text: "What is the melting point of a diamond in degrees Celsius?", answer: 4027 },
    { text: "How many kilograms of waste does the average UK household produce per year?", answer: 400 },
    { text: "How many stripes are on a zebra (approx)?", answer: 80 },
    { text: "How many thousands of active satellites are currently orbiting Earth?", answer: 7 },
    { text: "How many distinct species of sharks are there?", answer: 440 },
    { text: "How many miles of nerves are in the human body?", answer: 45 },
    { text: "How many individual fries are in a McDonald's large fry?", answer: 86 },
    { text: "How many millions of bricks were used to build the Empire State Building?", answer: 10 },
    { text: "How many years does a cicada nymph stay underground (max)?", answer: 17 },
    { text: "How many feet tall is the letter 'M' in the McDonald's golden arches sign?", answer: 25 },
    { text: "How many thousands of distinct varieties of apples are grown worldwide?", answer: 7 },
    { text: "How many tonnes does a heavy cumulus cloud weigh?", answer: 500 },
    { text: "How many hairs are in a human eyebrow?", answer: 250 },
    { text: "How many distinct sounds can a dog hear compared to a human (multiplier)?", answer: 4 },
    { text: "How many millions of volts is a bolt of lightning?", answer: 300 },
    { text: "How many calories are in a standard banana?", answer: 105 },
    { text: "How many miles per hour is the terminal velocity of a skydiver?", answer: 120 },
    { text: "How many millions of stone blocks were used to build the Great Pyramid of Giza?", answer: 2 },
    { text: "How many distinct chemical elements are found in a smartphone?", answer: 70 },
    { text: "How many litres of blood does the human heart pump per day?", answer: 7570 },
    { text: "How many miles of yarn are in a standard golf ball?", answer: 26 },
    { text: "How many thousands of distinct species of beetles are there?", answer: 400 },
    { text: "How many kilograms does a sumo wrestler weigh on average?", answer: 150 },
    { text: "How many thousands of individual dots are in a typical Seurat painting?", answer: 300 },
    { text: "How many steps per minute is the tempo of a standard march?", answer: 120 },
    { text: "How many thousands of distinct parts does a modern F1 car have?", answer: 80 },
    { text: "How many kilograms does the average human skin weigh?", answer: 9 },
    { text: "How many thousands of miles away is the moon at its closest point?", answer: 225 },
    { text: "How many individual scales are on a pangolin?", answer: 1000 },
    { text: "How many beats per minute is the resting heart rate of a hamster?", answer: 450 },
    { text: "How many distinct vocalizations can a cat make?", answer: 100 },
    { text: "How many kilograms of bamboo does a giant panda eat daily?", answer: 12 },
    { text: "How many distinct bones are in the human foot?", answer: 26 },
    { text: "How many thousands of miles is the coastline of Australia?", answer: 16 },
    { text: "How many distinct organic compounds are in a cup of coffee?", answer: 1000 },
    { text: "How many litres of fuel does a Boeing 747 burn per second?", answer: 4 },
    { text: "How many distinct endings does the game 'Shadow the Hedgehog' have?", answer: 326 },
    { text: "How many millions of seeds are in a kilogram of poppy seeds?", answer: 2 },
    { text: "How many distinct feathers are on a peacock's tail?", answer: 200 },
    { text: "How many thousands of miles does a person walk in a lifetime (average)?", answer: 110 },
    { text: "How many thousands of distinct species of birds are there?", answer: 10 },
    { text: "How many individual flowers make up a sunflower head?", answer: 2000 },
    { text: "How many pounds does a gallon of water weigh (Imperial)?", answer: 10 },
    { text: "How many distinct muscles are in the human tongue?", answer: 8 },
    { text: "How many miles per hour can a peregrine falcon dive?", answer: 240 },
    { text: "How many distinct types of cheese are there in France?", answer: 1600 },
    { text: "How many litres of water does it take to produce one cotton t-shirt?", answer: 2700 },
    { text: "How many distinct satellites make up the GPS network?", answer: 31 },
    { text: "How many kilograms does a standard gold brick weigh?", answer: 12 },
    { text: "How many thousands of distinct genes are in the human genome?", answer: 20 },
    { text: "How many thousands of miles is the diameter of the sun?", answer: 865 },
    { text: "How many distinct species of bats are there?", answer: 1400 },
    { text: "How many Newtons of force is a karate chop?", answer: 3000 },
    { text: "How many millions of microbes are on a square inch of skin?", answer: 32 },
    { text: "How many litres of air does a human breathe per minute?", answer: 8 },
    { text: "How many distinct stars can be seen with the naked eye?", answer: 5000 },
    { text: "How many kilograms does the average human brain weigh?", answer: 1 },
    { text: "How many distinct islands are in the Philippines?", answer: 7641 },
    { text: "How many miles per hour is the speed of a nerve impulse?", answer: 268 },
    { text: "How many thousands of distinct muscles are in an elephant's trunk?", answer: 40 },
    { text: "How many litres of water does a camel's hump hold?", answer: 0 },
    { text: "How many distinct languages are spoken in Papua New Guinea?", answer: 840 },
    { text: "How many kilograms does the world's heaviest pumpkin weigh?", answer: 1226 },
    { text: "How many thousands of pieces of mail does the Royal Mail handle per second (approx)?", answer: 1 },
    { text: "How many miles is the length of the Nile River?", answer: 4130 },
    { text: "How many distinct bones are in a T-Rex skeleton?", answer: 300 },
    { text: "How many thousands of litres of water flow over Niagara Falls per second?", answer: 2400 },
    { text: "How many distinct cuts are in the movie 'Mad Max: Fury Road'?", answer: 2700 },
    { text: "How many kilograms does a suit of medieval armour weigh?", answer: 25 },
    { text: "How many thousands of distinct species of trees are there?", answer: 60 },
    { text: "How many miles per hour does the earth spin at the equator?", answer: 1037 },
    { text: "How many thousands of distinct items does the average supermarket carry?", answer: 33 },
    { text: "How many kilograms does a baby blue whale gain per day?", answer: 90 },
    { text: "How many distinct bones are in a giraffe's neck?", answer: 7 },
    { text: "How many thousands of litres of water does a residential swimming pool hold?", answer: 70 },
    { text: "How many distinct flavors of Kit Kat exist in Japan?", answer: 300 },
    { text: "How many miles deep is the Mariana Trench?", answer: 7 },
    { text: "How many trillions of distinct cells are in the human body?", answer: 37 },
    { text: "How many grams of honey does a bee make in its lifetime?", answer: 45 },
    { text: "How many distinct species of mosquitoes are there?", answer: 3500 },
    { text: "How many miles per hour can a kangaroo hop?", answer: 44 },
    { text: "How many distinct characters are in 'War and Peace'?", answer: 580 },
    { text: "How many kilograms does a cubic foot of gold weigh?", answer: 547 },
    { text: "How many distinct ridges are on a fingerprint?", answer: 150 },
    { text: "How many litres of water does an oak tree absorb per day?", answer: 190 },
    { text: "How many thousands of distinct islands are in Indonesia?", answer: 17 },
    { text: "How many thousands of miles is the circumference of the moon?", answer: 6 },
    { text: "How many distinct types of neurons are in the brain?", answer: 10000 },
    { text: "How many kilograms does the heaviest hailstone weigh?", answer: 1 },
    { text: "How many millions of distinct species of fungi are estimated to exist?", answer: 5 },
    { text: "How many miles per hour is the fastest tennis serve?", answer: 163 },
    { text: "How many distinct notes are on a standard piano?", answer: 88 },
    { text: "How many kilograms of meat does a tiger eat per sitting?", answer: 40 },
    { text: "How many distinct parts are in a mechanical watch?", answer: 130 },
    { text: "How many pints of beer are in a standard UK keg?", answer: 88 },
    { text: "How many distinct species of coral are there?", answer: 6000 },
    { text: "How many miles high is the edge of space (Karman Line)?", answer: 62 },
    { text: "How many distinct muscles does it take to smile?", answer: 17 },
    { text: "How many kilograms does a cubic metre of concrete weigh?", answer: 2400 },
    { text: "How many distinct species of snakes are venomous?", answer: 600 },
    { text: "How many miles per hour is the wind in a category 5 hurricane?", answer: 157 },
    { text: "How many distinct pieces of glass are in the Louvre Pyramid?", answer: 673 },
    { text: "How many kilograms of skin does a human shed per year?", answer: 4 },
    { text: "How many thousands of distinct species of bees are there?", answer: 20 },
    { text: "How many miles is the flight distance from London to New York?", answer: 3459 },
    { text: "How many distinct questions are in the game Trivial Pursuit (Genus edition)?", answer: 2400 },
    { text: "How many kilograms does a silverback gorilla weigh?", answer: 180 },
    { text: "How many thousands of distinct species of flowering plants are there?", answer: 369 },
    { text: "How many miles per hour does a cheetah run?", answer: 75 },
    { text: "How many distinct grooves are on a UK 5 pence coin?", answer: 80 },
    { text: "How many kilograms of wool does a sheep produce per year?", answer: 13 },
    { text: "How many distinct species of primates are there?", answer: 500 },
    { text: "How many thousands of miles is the length of the Great Wall of China?", answer: 13 },
    { text: "How many thousands of distinct words are in the English language (Oxford Dictionary)?", answer: 171 },
    { text: "How many kilograms does a bowling pin weigh?", answer: 1 },
    { text: "How many thousands of distinct species of fish are there?", answer: 34 },
    { text: "How many miles per hour can a sailfish swim?", answer: 68 },
    { text: "How many distinct bones are in the human hand?", answer: 27 },
    { text: "How many tonnes of food does the average human eat in a lifetime?", answer: 35 },
    { text: "How many thousands of distinct species of spiders are there?", answer: 48 },
    { text: "How many millions of miles is the distance from Earth to Mars (avg)?", answer: 140 },
    { text: "How many distinct muscles are in the human face?", answer: 43 },
    { text: "How many kilograms does a car tyre weigh?", answer: 9 },
    { text: "How many distinct species of lizards are there?", answer: 6000 },
    { text: "How many miles per hour can an ostrich run?", answer: 43 },
    { text: "How many distinct bones are in the human skull?", answer: 22 },
    { text: "How many millions of kilograms of garbage does New York City produce daily?", answer: 11 },
    { text: "How many distinct species of rodents are there?", answer: 2277 },
    { text: "How many miles is the length of the Mississippi River?", answer: 2320 },
    { text: "How many distinct muscles are in the human neck?", answer: 26 },
    { text: "How many kilograms does a standard brick weigh?", answer: 2 },
    { text: "How many distinct species of whales are there?", answer: 90 },
    { text: "How many miles per hour can a greyhound run?", answer: 45 },
    { text: "How many stations are there on the London Underground network?", answer: 272 },
    { text: "How many years did the Hundred Years' War actually last?", answer: 116 },
    { text: "How many millions of miles is the distance from the Earth to the Sun?", answer: 93 },
    { text: "How many capsules are on the London Eye?", answer: 32 },
    { text: "How many minutes is the average flight time from London to Sydney?", answer: 1320 },
    { text: "How many players are in a Gaelic Football team?", answer: 15 },
    { text: "How many thousands of people can be seated at Wembley Stadium?", answer: 90 },
    { text: "How many millions of copies of 'Thriller' by Michael Jackson have been sold?", answer: 70 },
    { text: "How many metres tall is The Shard in London?", answer: 310 }
    { text: "How many strings are on a standard concert grand harp?", answer: 47 },
    { text: "What is the maximum number of people that can fit in a standard London double-decker bus?", answer: 80 },
    { text: "How many thousands of light-years across is the Milky Way galaxy?", answer: 100 },
    { text: "How many petals are on a typical field daisy?", answer: 34 },
    { text: "How many distinct islands make up the state of Hawaii?", answer: 137 },
    { text: "How many millions of Lego minifigures are produced every year?", answer: 400 },
    { text: "What is the average number of grapes required to make a bottle of wine?", answer: 600 },
    { text: "How many kilograms of pressure can a crocodile's jaw exert per square inch?", answer: 3700 },
    { text: "How many minutes long is the extended edition of 'The Return of the King'?", answer: 263 },
    { text: "How many thousands of hairs are in a sea otter's fur per square inch?", answer: 1000 },
    { text: "What is the maximum number of players allowed on a Quidditch team (in the books)?", answer: 7 },
    { text: "How many distinct keys are on a standard computer keyboard (US layout)?", answer: 104 },
    { text: "How many litres of air can a human lung hold on average?", answer: 6 },
    { text: "How many thousands of miles is the total length of the US Interstate Highway System?", answer: 48 },
    { text: "How many distinct elements on the Periodic Table occur naturally?", answer: 94 },
    { text: "How many years does it take for a glass bottle to decompose in a landfill (in thousands)?", answer: 4000 },
    { text: "What is the height of a regulation NBA basketball hoop in feet?", answer: 10 },
    { text: "How many distinct species of owls exist worldwide?", answer: 200 },
    { text: "How many hundreds of millions of years ago did the first dinosaurs appear?", answer: 230 },
    { text: "How many distinct segments make up an earthworm's body (approx)?", answer: 150 },
    { text: "How many thousands of tons did the RMS Titanic weigh?", answer: 52 },
    { text: "What is the average number of words in a English language novel?", answer: 90000 },
    { text: "How many distinct characters are in the alphabet used for the Hawaiian language?", answer: 13 },
    { text: "How many kilograms of pressure is the human jaw capable of exerting?", answer: 70 },
    { text: "How many distinct locations are on a standard Monopoly board?", answer: 40 },
    { text: "How many thousands of years old is the Great Sphinx of Giza (estimated)?", answer: 4 },
    { text: "How many distinct valves are in a standard trumpet?", answer: 3 },
    { text: "How many millions of tons of plastic enter the ocean every year?", answer: 8 },
    { text: "How many distinct species of jellyfish are there?", answer: 2000 },
    { text: "How many kilograms does a standard 'checked' suitcase weigh at its maximum limit (typical)?", answer: 23 }
    { text: "How many strings are on a standard cello?", answer: 4 },
    { text: "How many minutes long is the 'I Have a Dream' speech by Martin Luther King Jr.?", answer: 17 },
    { text: "How many millions of dollars was the budget for the original 1977 Star Wars?", answer: 11 },
    { text: "How many distinct animated feature films has Disney released (up to Wish)?", answer: 62 },
    { text: "How many years did it take to film the movie 'Boyhood'?", answer: 12 },
    { text: "How many distinct keys are on a standard grand piano?", answer: 88 },
    { text: "How many episodes of 'Friends' were produced in total?", answer: 236 },
    { text: "How many distinct films did Alfred Hitchcock direct?", answer: 52 },
    { text: "How many strings are on a standard ukulele?", answer: 4 },
    { text: "How many minutes long is the record-breaking music video for 'Thriller'?", answer: 14 },
    { text: "How many distinct actors have played Batman in live-action theatrical films?", answer: 9 },
    { text: "How many seasons did the original 'Star Trek' series run for?", answer: 3 },
    { text: "How many millions of copies has 'Grand Theft Auto V' sold (approx)?", answer: 190 },
    { text: "How many distinct players are on the field at once in a Quidditch match?", answer: 14 },
    { text: "How many minutes long is the shortest Best Picture winner ('Marty')?", answer: 90 },
    { text: "How many distinct categories are awarded at the main Oscars ceremony?", answer: 23 },
    { text: "How many millions of dollars did it cost to make the 1997 movie 'Titanic'?", answer: 200 },
    { text: "How many distinct colors are in the official Google logo?", answer: 4 },
    { text: "How many years old was Shirley Temple when she won her first (honorary) Oscar?", answer: 6 },
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
        let correctPlayers = [];

        for (const [socketId, range] of this.answers) {
            const player = this.players.get(socketId);
            const isCorrect = correctAnswer >= range.min && correctAnswer <= range.max;
            const rangeSize = range.max - range.min;
            const isExact = isCorrect && range.min === range.max;

            results.push({
                username: player.username,
                range: range,
                isCorrect: isCorrect,
                rangeSize: rangeSize,
                isExact: isExact,
                points: 0 // Will be updated
            });

            if (isCorrect) {
                correctPlayers.push({ socketId, rangeSize, isExact, resultIndex: results.length - 1 });
            }
        }

        // Sort correct players by range size (ascending)
        correctPlayers.sort((a, b) => a.rangeSize - b.rangeSize);

        // Award points
        if (correctPlayers.length > 0) {
            const bestRangeSize = correctPlayers[0].rangeSize;

            for (const p of correctPlayers) {
                const player = this.players.get(p.socketId);
                let points = 0;

                if (p.rangeSize === bestRangeSize) {
                    // Best range
                    if (p.isExact) {
                        points = 5;
                    } else {
                        points = 3;
                    }
                } else {
                    // Runner up
                    points = 1;
                }

                player.score += points;
                results[p.resultIndex].points = points;
            }
        }

        this.io.to(this.roomId).emit('game_state_change', {
            state: 'REVEAL',
            correctAnswer: correctAnswer,
            results: results,
            players: Array.from(this.players.values())
        });

        // Check for winner
        const WINNING_SCORE = 15;
        let winner = null;
        // Find player with highest score >= 15
        const potentialWinners = Array.from(this.players.values()).filter(p => p.score >= WINNING_SCORE);
        if (potentialWinners.length > 0) {
            potentialWinners.sort((a, b) => b.score - a.score);
            winner = potentialWinners[0];
        }

        if (winner) {
            setTimeout(() => {
                this.endGame(winner);
            }, 8000);
        } else {
            // Next question
            setTimeout(() => {
                this.currentQuestionIndex++;
                this.nextQuestion();
            }, 8000);
        }
    }

    endGame(winner) {
        this.gameState = 'END';
        this.io.to(this.roomId).emit('game_state_change', {
            state: 'END',
            players: Array.from(this.players.values()),
            winner: winner
        });

        // Reset for next game after delay
        setTimeout(() => {
            this.gameState = 'LOBBY';
            this.players.forEach(p => p.score = 0);
            this.io.to(this.roomId).emit('game_state_change', { state: 'LOBBY' });
            this.io.to(this.roomId).emit('update_player_list', Array.from(this.players.values()));
        }, 15000); // Longer delay for celebration
    }
}

module.exports = GameManager;
