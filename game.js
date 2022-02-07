class Game {
    constructor() {
        this.isStarted = false;
        this.players = {}; // stores the Player objects by the key of an ID and value of a Player object
        this.orderPlayers = []; // An Array of ID's of players, representing their order in the game. The current player will always be at an index of 0
        this.pile = []; //An Array of Card objects representing the central pile.  

    }
    addPlayer(username) {
        if (this.isStarted) throw "Error, already started the game";
    if (!username.trim()) throw "Error, empty username";
    //check for non-unique username
    for (var playerId of this.orderPlayers) {
      if (this.players[playerId].username === username) throw "Error, non-unique username";
    }
    var newPlayer = new Player(username);

    this.orderPlayers.push(newPlayer.id);
    this.players[newPlayer.id] = newPlayer;

    return newPlayer.id;
    }
}
