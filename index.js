const NumOfPlayers = 4;
class Card {
  constructor(suit, rank, value, image, team) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
    this.image = "Cards/" + this.rank + "_of_" + this.suit + ".png";
    //addImage();

  }

  addImage() {
    // var h = document.querySelector(".player1");
    // h.insertAdjacentHTML("afterend", "<button><img src='Cards/2_of_clubs.png' class='one 1'></button>");

    var img = document.createElement('img');
    img.src = "Cards/2_of_clubs.png";
  }
}

var h = new Card("clubs", "ace", 14);

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
        // this.cards.addImage();
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
  // addClass(){
  //   for (var i=0; i <5; i++){
  //     document.querySelector("img").classList.add("one");
  //       }
  //   for (var j=0; j <5; j++){
  //     document.querySelector(".one")[j].setAttribute("src", this.playerCards[j].image);
  //   }

}

class Board {
  constructor() {
    this.cardsInMiddle = [];
    this.players = [];
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
      this.players[i].playerCards = d.cards.slice((d.cards.length/NumOfPlayers)*i, (d.cards.length / NumOfPlayers)*(i+1));
    }
  }

  display() {
    var p = [".one", ".two", ".three", ".four"];
    for (var i = 0; i < NumOfPlayers; i++) {

      for (var j = 0; j < 13; j++) {
        //document.querySelectorAll(p[i])[j].setAttribute("src", this.players[i].playerCards[j].image);
        var s = this.players[i].playerCards[j].image;
        document.querySelectorAll(p[i])[j].style.backgroundImage = 'url('+s+')';
      }
    }
  }
}

let gameBoard = new Board();
gameBoard.start('Mario', 'Luigi', 'a', 'b');
gameBoard.display();

console.log(gameBoard.players);
