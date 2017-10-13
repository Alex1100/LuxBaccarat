import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      shoe: [[], [], [], [], [], [], [], []],
      playerCards: [],
      bankerCards: [],
      lastMoves: []
      dragon: false,
      panda: false,
      tie: false,
      playerWon: false,
      bankerWon: false
    }

    this.fisherYatesShuffle = this.fisherYatesShuffle.bind(this);
    this.shuffleShoe = this.shuffleShoe.bind(this);
    this.calculateDragon = this.calculateDragon.bind(this);
    this.calculatePanda = this.calculatePanda.bind(this);
    this.calculateTie = this.calculateTie.bind(this);
    this.calculateHandWinner = this.calculateHandWinner.bind(this);
    this.openCard = this.openCard.bind(this);
    this.openHouseCard = this.openHouseCard.bind(this);
    this.resetBonus = this.resetBonus.bind(this);
  }

  componentDidMount(){
    console.log("LOADED COMPONENT");
    this.shuffleShoe();
  }


  this.fisherYatesShuffle(array){
    let d = array.length, t, i;

    while (d) {
      i = Math.floor(Math.random() * d--);
      t = array[d];
      array[d] = array[i];
      array[i] = t;
    }

    return array;
  }

  this.shuffleShoe(){
    let newShoe = [];
    for(let i = 0; i < 8; i++){
      newShoe.push(this.fisherYatesShuffle(deckOfCards.deck));
    }
    this.setState({
      shoe: newShoe
    }, () => console.log("NEW SHOE IS: ", newShoe));
  }

  this.checkDragon(){
    if(this.bankerCards.length === 3 && this.bankerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0) === 7){
      this.setState({
        dragon: true,
        bankerWon: false,
        panda: false,
        playerWon: false,
        tie: false
      }, () => this.resetBonus())
    }
  }

  this.checkPanda(){
    if(this.playerCards.length === 3 && this.playerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0) === 8){
      this.setState({
        panda: true,
        playerWon: false,
        dragon: false,
        bankerWon: false,
        tie: false
      }, () => this.resetBonus())
    }
  }

  this.checkTie(){
    if(this.playerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0) && this.bankerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0)){
      this.setState({
        tie: true,
        dragon: false,
        bankerWon: false,
        panda: false,
        playerWon: false
      }, () => this.resetBonus())
    }
  }

  this.resetBonus(){
    this.setState({
      dragon: false,
      panda: false,
      tie: false,
      playerWon: false,
      bankerWon: false
    });
  }

  this.calculateHandWinner(){
    if(this.playerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0) > this.bankerCards.map(el => el[1]).reduce((acc, next) => acc + next, 0)){
      this.checkPanda();
      if(this.state.panda === false){
        this.setState({
          panda: false,
          playerWon: true,
          dragon: false
          bankerWon: false,
          tie: false,
        }, () => this.resetBonus());
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
        }, () => this.resetBonus());
      }
    } else {
      this.checkTie();
    }
  }

  this.openCard(){

  }

  this.openHouseCard(){

  }


  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const deckOfCards = {
  deck: [
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
  ]
};
