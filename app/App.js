import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      shoe: {},
      playerCards: [],
      bankerCards: [],
      lastMoves: {},
      dragon: false,
      panda: false,
      tie: false,
      playerWon: false,
      bankerWon: false,
      naturalPlayer: false,
      naturalBanker: false,
      currentPlayers: ['Player1', 'Player2', 'Player3', 'Player4']
    }

    this.fisherYatesShuffle = this.fisherYatesShuffle.bind(this);
    this.shuffleShoe = this.shuffleShoe.bind(this);
    this.deal = this.deal.bind(this);
    this.openPlayerCard = this.openPlayerCard.bind(this);
    this.openBankerCard = this.openBankerCard.bind(this);
    this.drawPlayerCard = this.drawPlayerCard.bind(this);
    this.drawBankerCard = this.drawBankerCard.bind(this);
    this.checkDragon = this.checkDragon.bind(this);
    this.checkPanda = this.checkPanda.bind(this);
    this.checkTie = this.checkTie.bind(this);
    this.checkHandWinner = this.checkHandWinner.bind(this);
    this.resetBonus = this.resetBonus.bind(this);
  }

  componentDidMount(){
    if(this.state.shoe.size === undefined || this.state.shoe.size === 0){
      this.shuffleShoe();
    }
  }

  fisherYatesShuffle(array){
    let d = array.length, t, i;

    while (d) {
      i = Math.floor(Math.random() * d--);
      t = array[d];
      array[d] = array[i];
      array[i] = t;
    }

    return array;
  }

  shuffleShoe(){
    let newShoe = shoeOfCards;
    let firstCard;
    let burnCount = 0;
    for(let i = 0; i < 8; i++){
      let newDeck = this.fisherYatesShuffle(Object.values(deckOfCards.deck));
      for(let j = 0; j < newDeck.length; j++){
        if(i === 0 && j === 0){
          if(
              newDeck[i][0].slice(0, 2) === '10' ||
              newDeck[i][0].slice(0, 2)[0] === 'J' ||
              newDeck[i][0].slice(0, 2)[0] === 'Q' ||
              newDeck[i][0].slice(0, 2)[0] === 'K'
            ){
              firstCard = newDeck[i][0];
              burnCount = 10;
            } else {
              firstCard = newDeck[i][0];
              burnCount = newDeck[i][1];
            }
        }

        newShoe.enqueue(newDeck[j]);

        if(burnCount > 0){
          newShoe.dequeue()
          burnCount--;
        }
      }
    }

    this.setState({
      shoe: newShoe
    }, () => console.log("NEW SHOE IS: ", newShoe));
  }

  deal(){
    this.setState({
      playerCards: this.state.playerCards.push(this.state.shoe.getFirstInQueue()),
      shoe: this.state.shoe.dequeue()
    }, () => {
      this.setState({
        bankerCards: this.state.bankerCards.push(this.state.shoe.getFirstInQueue()),
        shoe: this.state.shoe.dequeue()
      }, () => {
        this.setState({
          playerCards: thist.state.playerCards.push(this.state.shoe.getFirstInQueue()),
          shoe: this.state.shoe.dequeue()
        }, () => {
          this.setState({
            bankerCards: this.state.bankerCards.push(this.state.shoe.getFirstInQueue()),
            shoe: this.state.shoe.dequeue()
          });
        });
      });
    });
  }

  openPlayerCard(){
    //change style property
    //need to account for
    //what bets are placed
    //if player bets placed then
    //find the highest placed better
    //and let them open the card
    //once card is opened then switch
    //style from one image to another
    //image for the corresponding
    //card dealt
  }

  openBankerCard(){
    //change style property
    //need to account for
    //what bets are placed
    //if banker bets placed then
    //find the highest placed better
    //and let them open the card
    //once card is opened then switch
    //style from one image to another
    //image for the corresponding
    //card dealt
  }

  drawPlayerCard(){
    //make last moves also a a queue
    //that notarizes who won and what
    //results were

    //if the players
    //first two cards
    //total 5 or less,
    //then this function
    //shoud fire off
    //and deal an additional
    //card and set state to push
    //the new card in the
    //playersCards array
  }

  drawBankerCard(){
    //make last moves also a queue
    //that notarizes who won and what
    //results were

    //if the bankers first two cards total
    //7 or more then this function should
    //not fire off

    //if the player did not draw a third card
    //aka if player has a natural
    //and banker has two cards
    //equalling 5 or less

    //or

    //1st possibilty
    //players 3rd card: 0 || 1 || 9
    //bankers hand: 3 or less

    //2nd possibility
    //players third card: 2 || 3
    //bankers hand: 4 or less

    //3rd possibility
    //players third card: 4 || 5
    //bankers hand: 5 or less

    //4th possibility
    //players third card: 6 || 7
    //bankers hand: 6 or less

    //5th possibility
    //players third card: 8
    //bankers hand: 2 or less
  }

  checkHandWinner(){
    if(this.playerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0) > this.bankerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0)){
      this.checkPanda();
      if(this.state.panda === false){
        this.setState({
          panda: false,
          playerWon: true,
          dragon: false,
          bankerWon: false,
          tie: false,
        }, () => {
          //request some animation
          //frame to disply
          //winner
          this.resetBonus()
        });
      }
    } else if(this.playerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0) < this.bankerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0)){
      this.checkDragon();
      if(this.state.dragon === false){
        this.setState({
          bankerWon: true,
          dragon: false,
          panda: false,
          playerWon: false,
          tie: false
        }, () => {
          //request some animation
          //frame to disply
          //winner
          this.resetBonus()
        });
      }
    } else {
      this.checkTie();
    }
  }

  checkDragon(){
    //pays 40 to 1
    if(this.bankerCards.length === 3 && this.bankerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0) === 7){
      this.setState({
        dragon: true,
        bankerWon: false,
        panda: false,
        playerWon: false,
        tie: false
      });
    }
  }

  checkPanda(){
    //pays 25 to 1
    if(this.playerCards.length === 3 && this.playerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0) === 8){
      this.setState({
        panda: true,
        playerWon: true,
        dragon: false,
        bankerWon: false,
        tie: false
      });
    }
  }

  checkTie(){
    //pays 8 to 1
    if(this.playerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0) && this.bankerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0)){
      this.setState({
        tie: true,
        dragon: false,
        bankerWon: false,
        panda: false,
        playerWon: false
      }, () => {
        //request some animation
        //frame to disply
        //winner
        this.resetBonus();
      });
    }
  }

  resetBonus(){
    this.setState({
      dragon: false,
      panda: false,
      tie: false,
      playerWon: false,
      bankerWon: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={bonusOptions.container}>
          <View style={pandaStyle.container}>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              source={require('../assets/images/panda_luxbaccarat.jpg')} />
          </View>
          <View style={tieStyle.container}>
            <Text style={{color: 'white'}}>
              Tie
            </Text>
          </View>
          <View style={dragonStyle.container}>
            <Image
                style={{width: 50, height: 50, borderRadius: 25}}
                source={require('../assets/images/dragon_board_luxbaccarat.jpg')} />
          </View>
        </View>
        <View style={bankerPlayerWrapperStyles.container}>
          <View>
            <Text style={{color: 'red'}}>
              Banker
            </Text>
          </View>
          <View>
            <Text style={{color: 'blue'}}>
              Player
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

let Queue = function() {
  this.count = 0;
  this.container = {};
};

Queue.prototype.enqueue = function(card){
  this.container[this.count] = card;
  this.count++;
};

Queue.prototype.getFirstInQueue = function(){
  return this.container[0];
};

Queue.prototype.dequeue = function(){
  var removed = this.container[0];
  delete this.container[0];
  this.count--;

  for(let i = 0; i < this.count + 1; i++){
    this.container[i] = this.container[i + 1];
    if(this.container[i] === undefined){
      delete this.container[i];
    }
  }

  return this.container;
};

Queue.prototype.size = function(){
  return this.count;
};

const shoeOfCards = new Queue();

const outcomes = new Queue();

const deckOfCards = {
  deck: {
    'AH': ['AH', 1],
    'AS': ['AS', 1],
    'AC': ['AC', 1],
    'AD': ['AD', 1],
    '2H': ['2H', 2],
    '2S': ['2S', 2],
    '2C': ['2C', 2],
    '2D': ['2D', 2],
    '3H': ['3H', 3],
    '3S': ['3S', 3],
    '3C': ['3C', 3],
    '3D': ['3D', 3],
    '4H': ['4H', 4],
    '4S': ['4S', 4],
    '4C': ['4C', 4],
    '4D': ['4D', 4],
    '5H': ['5H', 5],
    '5S': ['5S', 5],
    '5C': ['5C', 5],
    '5D': ['5D', 5],
    '6H': ['6H', 6],
    '6S': ['6S', 6],
    '6C': ['6C', 6],
    '6D': ['6D', 6],
    '7H': ['7H', 7],
    '7S': ['7S', 7],
    '7C': ['7C', 7],
    '7D': ['7D', 7],
    '8H': ['8H', 8],
    '8S': ['8S', 8],
    '8C': ['8C', 8],
    '8D': ['8D', 8],
    '9H': ['9H', 9],
    '9S': ['9S', 9],
    '9C': ['9C', 9],
    '9D': ['9D', 9],
    '10H': ['10H', 0],
    '10S': ['10S', 0],
    '10C': ['10C', 0],
    '10D': ['10D', 0],
    'JH': ['JH', 0],
    'JS': ['JS', 0],
    'JC': ['JC', 0],
    'JD': ['JD', 0],
    'QH': ['QH', 0],
    'QS': ['QS', 0],
    'QC': ['QC', 0],
    'QD': ['QD', 0],
    'KH': ['KH', 0],
    'KS': ['KS', 0],
    'KC': ['KC', 0],
    'KD': ['KD', 0]
  }
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#296f60',
  }
}

const bonusOptions = {
  container: {

  },
};

const pandaStyle = {
  container: {

  },
};

const dragonStyle = {
  container: {

  },
};

const tieStyle = {
  container: {

  },
};

const bankerPlayerWrapperStyles = {
  container: {

  },
};


