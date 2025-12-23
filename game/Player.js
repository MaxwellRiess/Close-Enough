class Player {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.score = 0;
        this.currentRange = null; // { min: number, max: number }
        this.abilities = {
            COPY: true,
            DOUBLE: true,
            SWAP: true
        };
    }
}

module.exports = Player;
