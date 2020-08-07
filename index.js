const NumOfPlayers = 4;
const numOfCards = 52;
var p = [".one", ".two", ".three", ".four"];



class Card {
  constructor(suit, rank, value, image, team) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
    this.image = "Cards/" + this.rank + "_of_" + this.suit + ".png";
  }

}

class Deck {
  constructor() {
    this.cards = [];
  }

  createDeck() {
    var suits = ['clubs', 'diamonds', 'hearts', 'spades'];
    var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    for (var i = 0; i < suits.length; i++) {
      for (var j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], values[j]));
      }
    }
  }

  shuffleDeck() {
    let location1, location2, tmp;
    for (let i = 0; i < 1000; i++) {
      location1 = Math.floor((Math.random() * this.cards.length));
      location2 = Math.floor((Math.random() * this.cards.length));
      tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
}

class Player {
  constructor(name) {
    this.playerName = name;
    this.playerCards = [];
  }

}

class Board {
  constructor() {
    this.cardsInMiddle = [];
    this.players = [];
  }
  namePrompt() {
    var names = []
    for (var i = 1; i <= NumOfPlayers; i++) {
      names.push(prompt("Enter player " + i + " name"));
    }
    return names;
  }
  start(playerOneName, playerTwoName, playerThreeName, playerFourName) {
    this.players.push(new Player(playerOneName));
    this.players.push(new Player(playerTwoName));
    this.players.push(new Player(playerThreeName));
    this.players.push(new Player(playerFourName));

    let d = new Deck();
    d.createDeck();
    d.shuffleDeck();
    for (var i = 0; i < NumOfPlayers; i++) {
      this.players[i].playerCards = d.cards.slice((d.cards.length / NumOfPlayers) * i, (d.cards.length / NumOfPlayers) * (i + 1));
    }
  }

  display() {

    for (var i = 0; i < NumOfPlayers; i++) {
      document.querySelectorAll(".playername")[i].innerHTML = this.players[i].playerName + "";

      for (var j = 0; j < 13; j++) {
        var s = this.players[i].playerCards[j];
        document.querySelectorAll(p[i])[j].style.backgroundImage = 'url(' + s.image + ')';
        document.querySelectorAll(p[i])[j].classList.add(s.suit + "-" + s.rank + "-" + s.value);
        console.log(document.querySelectorAll(p[i])[j]);
      }
    }
  }
  addToBoard(card, team) {
    if (this.cardsInMiddle.length === 4) {
      this.cardsInMiddle = [];
    }
    var values = card.split("-");

    if ((team == "one") && (this.cardsInMiddle.length ==0)) {
      this.cardsInMiddle.push(new Card(values[0], values[1], values[2]));
      return true;
    }
    else if ((team == "two") && (this.cardsInMiddle.length ==1)) {
      this.cardsInMiddle.push(new Card(values[0], values[1], values[2]));
      return true;
    }
    else if ((team == "three") && (this.cardsInMiddle.length ==2)) {
      this.cardsInMiddle.push(new Card(values[0], values[1], values[2]));
      return true;
    }
    else if ((team == "four") && (this.cardsInMiddle.length ==3)) {
      this.cardsInMiddle.push(new Card(values[0], values[1], values[2]));
      return true;
    }
    else{
      return false;
    }

  }
  displayBoard() {
    var s = this.cardsInMiddle.length;
    console.log(s);
    for (var i = 0; i < s; i++) {
      var t = this.cardsInMiddle[i];
      document.querySelectorAll(".bcard")[i].style.backgroundImage = 'url(' + t.image + ')';
    }
  }
}

let gameBoard = new Board();
// names = gameBoard.namePrompt();
// gameBoard.start(names[0], names[1], names[2], names[3]);
gameBoard.start("a", "b", "c", "d");
gameBoard.display();

var p = [".one", ".two", ".three", ".four"];
for (var i = 0; i < 52; i++) {
  // if (i%NumOfPlayers === )
  var f = p[(i % NumOfPlayers)];

  document.querySelectorAll("button")[i].addEventListener("click", function() {
    var clicked = this.classList[1];
    var team = this.classList[0];
    console.log(team);
    console.log(clicked);
    var signal = gameBoard.addToBoard(clicked, team);
    if (signal == true){
       this.classList.add("invisible");
     }
    gameBoard.displayBoard();
  });
}

gameBoard.displayBoard();
