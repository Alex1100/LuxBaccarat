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
      shoe: [],
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

  componentWillMount(){
    if(this.state.shoe.length === 0 && this.state.shoe.hasOwnProperty('size') === false){
      this.shuffleShoe();
    } else if(this.state.shoe.size() === 0){
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
    }, () => {
      this.deal();
    });
  }

  deal(){
    console.log('fired off deal fubction: ', this.state.shoe.size());
    const pHand = [this.state.shoe.container[0], this.state.shoe.container[2]];
    const bHand = [this.state.shoe.container[1], this.state.shoe.container[3]];
    console.log("PLAYER HAND IS: ", pHand);
    console.log("BANKER HAND IS: ", bHand);
    this.setState({
      playerCards: pHand,
      bankerCards: bHand,
      shoe: this.state.shoe.dequeue().dequeue().dequeue().dequeue()
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
        {this.state.shoe.container ?
            <View style={cards.container}>
              <View style={firstCard.container}>
              {
                Object.values(this.state.shoe.container).slice(0, 52).map((element, index) => (
                    <Image
                      key={index}
                      style={card[`card${index}`]}
                      source={require('../assets/images/card_back.png')} />
                ))
              }
              </View>
            </View>
          : <View><Text>HEYYY</Text></View>
        }
        <View style={cardDisplay.container}>
          <View style={displayPlayer.container}>
            <Text style={displayPlayer.textStyle}>
              Player
            </Text>
            { this.state.playerCards.length > 0 ?
              <View style={dealtPlayerCard.container}>
                {
                  this.state.playerCards.map((element, index) => {
                      switch(element[0]){
                      case 'AC':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_AC.svg.png')} />
                      case 'AD':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_AD.svg.png')} />
                      case 'AH':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_AH.svg.png')} />
                      case 'AS':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_AS.svg.png')} />
                      case '10C':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_10C.svg.png')} />
                      case '10D':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_10D.svg.png')} />
                      case '10H':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_10H.svg.png')} />
                      case '10S':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_10D.svg.png')} />
                      case '2C':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_2C.svg.png')} />
                      case '2D':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_2D.svg.png')} />
                      case '2H':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_2H.svg.png')} />
                      case '2S':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_2S.svg.png')} />
                      case '3C':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_3C.svg.png')} />
                      case '3D':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_3D.svg.png')} />
                      case '3H':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_3H.svg.png')} />
                      case '3S':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_3S.svg.png')} />
                      case '4C':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_4C.svg.png')} />
                      case '4D':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_4D.svg.png')} />
                      case '4H':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_4H.svg.png')} />
                      case '4S':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_4S.svg.png')} />
                      case '5C':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_5C.svg.png')} />
                      case '5D':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_5D.svg.png')} />
                      case '5H':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_5H.svg.png')} />
                      case '5S':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_5S.svg.png')} />
                      case '6C':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_6C.svg.png')} />
                      case '6D':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_6D.svg.png')} />
                      case '6H':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_6H.svg.png')} />
                      case '6S':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_6S.svg.png')} />
                      case '7C':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_7C.svg.png')} />
                      case '7D':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_7D.svg.png')} />
                      case '7H':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_7H.svg.png')} />
                      case '7S':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_7S.svg.png')} />
                      case '8C':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_8C.svg.png')} />
                      case '8D':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_8D.svg.png')} />
                      case '8H':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_8H.svg.png')} />
                      case '8S':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_8S.svg.png')} />
                      case '9C':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_9C.svg.png')} />
                      case '9D':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_9D.svg.png')} />
                      case '9H':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_9H.svg.png')} />
                      case '9S':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_9S.svg.png')} />
                      case 'JC':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_JC.svg.png')} />
                      case 'JD':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_JD.svg.png')} />
                      case 'JH':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_JH.svg.png')} />
                      case 'JS':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_JS.svg.png')} />
                      case 'QC':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_QC.svg.png')} />
                      case 'QD':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_QD.svg.png')} />
                      case 'QH':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_QH.svg.png')} />
                      case 'QS':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_QS.svg.png')} />
                      case 'KC':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_KC.svg.png')} />
                      case 'KD':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_KD.svg.png')} />
                      case 'KH':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_KH.svg.png')} />
                      case 'KS':
                        return <Image
                                  key={index}
                                  style={dealtPlayerCard.card}
                                  source={require('../assets/images/card_KS.svg.png')} />
                      default: null
                    }
                  })
                }
              </View> : null
            }
          </View>
          <View style={displayBanker.container}>
            <Text style={displayBanker.textStyle}>
              Banker
            </Text>
            { this.state.bankerCards.length > 0 ?
              <View style={dealtBankerCard.container}>
                {
                  this.state.bankerCards.map((element, index) => {
                      switch(element[0]){
                      case 'AC':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_AC.svg.png')} />
                      case 'AD':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_AD.svg.png')} />
                      case 'AH':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_AH.svg.png')} />
                      case 'AS':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_AS.svg.png')} />
                      case '10C':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_10C.svg.png')} />
                      case '10D':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_10D.svg.png')} />
                      case '10H':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_10H.svg.png')} />
                      case '10S':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_10D.svg.png')} />
                      case '2C':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_2C.svg.png')} />
                      case '2D':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_2D.svg.png')} />
                      case '2H':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_2H.svg.png')} />
                      case '2S':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_2S.svg.png')} />
                      case '3C':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_3C.svg.png')} />
                      case '3D':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_3D.svg.png')} />
                      case '3H':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_3H.svg.png')} />
                      case '3S':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_3S.svg.png')} />
                      case '4C':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_4C.svg.png')} />
                      case '4D':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_4D.svg.png')} />
                      case '4H':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_4H.svg.png')} />
                      case '4S':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_4S.svg.png')} />
                      case '5C':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_5C.svg.png')} />
                      case '5D':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_5D.svg.png')} />
                      case '5H':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_5H.svg.png')} />
                      case '5S':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_5S.svg.png')} />
                      case '6C':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_6C.svg.png')} />
                      case '6D':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_6D.svg.png')} />
                      case '6H':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_6H.svg.png')} />
                      case '6S':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_6S.svg.png')} />
                      case '7C':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_7C.svg.png')} />
                      case '7D':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_7D.svg.png')} />
                      case '7H':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_7H.svg.png')} />
                      case '7S':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_7S.svg.png')} />
                      case '8C':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_8C.svg.png')} />
                      case '8D':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_8D.svg.png')} />
                      case '8H':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_8H.svg.png')} />
                      case '8S':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_8S.svg.png')} />
                      case '9C':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_9C.svg.png')} />
                      case '9D':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_9D.svg.png')} />
                      case '9H':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_9H.svg.png')} />
                      case '9S':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_9S.svg.png')} />
                      case 'JC':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_JC.svg.png')} />
                      case 'JD':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_JD.svg.png')} />
                      case 'JH':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_JH.svg.png')} />
                      case 'JS':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_JS.svg.png')} />
                      case 'QC':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_QC.svg.png')} />
                      case 'QD':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_QD.svg.png')} />
                      case 'QH':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_QH.svg.png')} />
                      case 'QS':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_QS.svg.png')} />
                      case 'KC':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_KC.svg.png')} />
                      case 'KD':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_KD.svg.png')} />
                      case 'KH':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_KH.svg.png')} />
                      case 'KS':
                        return <Image
                                  key={index}
                                  style={dealtBankerCard.card}
                                  source={require('../assets/images/card_KS.svg.png')} />
                      default: null
                    }
                  })
                }
              </View> : null
            }
          </View>
        </View>
        <View style={betOptions.container}>
          <View style={bonusOptions.container}>
            <View style={pandaStyle.container}>
              <Image
                style={pandaStyle.image}
                source={require('../assets/images/panda_luxbaccarat.jpg')} />
            </View>
            <View style={tieStyle.container}>
              <Text style={tieStyle.textStyle}>
                TIE
              </Text>
            </View>
            <View style={dragonStyle.container}>
              <Image
                  style={dragonStyle.image}
                  source={require('../assets/images/dragon_board_luxbaccarat.jpg')} />
            </View>
          </View>
          <View style={bankerPlayerWrapperStyles.container}>
            <View style={bankerStyles.container}>
              <Text style={bankerStyles.textStyle}>
                Banker
              </Text>
            </View>
            <View style={playerStyles.container}>
              <Text style={playerStyles.textStyle}>
                Player
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

let Queue = function() {
  this.count = 0;
  this.container = {};
  this.getFirstInQueue = function(){
    return this.container[0];
  };
  this.dequeue = function(){
    var removed = this.container[0];
    delete this.container[0];
    this.count--;

    for(let i = 0; i < this.count + 1; i++){
      this.container[i] = this.container[i + 1];
      if(this.container[i] === undefined){
        delete this.container[i];
      }
    }

    return this;
  };

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

const dealtPlayerCard = {
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 50,
    top: 10,
    width: 65,
    height: 100,
  },
  card: {
    width: 65,
    marginRight: 5,
    height: 80,
    backgroundColor: 'red'
  }
}

const dealtBankerCard = {
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    top: 10,
    width: 65,
    height: 100,
  },
  card: {
    width: 65,
    height: 80,
    marginLeft: 5,
    backgroundColor: 'red'
  }
}


const cardDisplay = {
  container: {
    justifyContent: 'center',
    width: 279,
    height: 200,
    top: 70,
    left: 47.5,
    opacity: 0.7,
  }
}

const displayPlayer = {
  container: {
    width: 140,
    height: 200,
    top: 60,
    borderRightWidth: 2,
    borderColor: '#e2a643',
  },
  textStyle: {
    textAlign: 'center',
    color: '#1c63ba',
    fontSize: 40,
    fontStyle: 'italic',
    textShadowColor: 'white',
    textShadowRadius: 2,
    textShadowOffset: {width: 2, height: 2}
  }
}

const displayBanker = {
  container: {
    width: 140,
    height: 200,
    bottom: 140,
    left: 139,
    borderLeftWidth: 2,
    borderColor: '#e2a643',
  },
  textStyle: {
    textAlign: 'center',
    color: '#a32c2e',
    fontSize: 40,
    fontStyle: 'italic',
    textShadowColor: 'white',
    textShadowRadius: 2,
    textShadowOffset: {width: 2, height: 2}
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#296f60',
  }
}

const bonusOptions = {
  container: {
    justifyContent: 'center',
    bottom: 100,
  },
};

const pandaStyle = {
  container: {
    justifyContent: 'center',
    width: 45,
    height: 45,
    paddingLeft: 4,
    borderRightWidth: 0.5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2a643',
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 17.5
  }
};

const dragonStyle = {
  container: {
    justifyContent: 'center',
    width: 45,
    height: 45,
    left: 105,
    bottom: 90,
    paddingLeft: 4,
    borderLeftWidth: 0.5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2a643'
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'flex-start'
  }
};

const tieStyle = {
  container: {
    justifyContent: 'center',
    width: 60,
    height: 45,
    bottom: 45,
    left: 45,
    borderLeftWidth: 0.5,
    borderBottomWidth: 1,
    borderRightWidth: 0.5,
    borderTopWidth: 1,
    borderColor: '#e2a643'
  },
  textStyle: {
    color: 'white',
    textAlign: 'center'
  }
};

const bankerPlayerWrapperStyles = {
  container: {
    justifyContent: 'center',
    width: 150,
    height: 155,
    bottom: 190
  },
};

const betOptions = {
  container: {
    margin: 115,
    top: 140,
    width: 150,
    height: 200
  },
};

const bankerStyles = {
  container: {
    width: 150,
    height: 77.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: '#a32c2e',
    borderColor: '#e2a643'
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 30,
    color: '#e2a643',
    top: 17
  }
};

const playerStyles = {
  container: {
    width: 150,
    height: 77.5,
    borderTopWidth: 0.5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e2a643',
    backgroundColor: '#1c63ba'
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 30,
    color: '#e2a643',
    top: 17
  }
};

const cards = {
  container: {
    left: 200,
    bottom: 50,
    width: 170,
    marginTop: 100,
    right: 400,
    backgroundColor: 'orange',
  }
}

const firstCard = {
  container: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70
  }
}

const card = {
  container: {
    height: 70,
  },
  card0: {
    width: 50,
    height: 70
  },
  card1: {
    width: 2,
    height: 70
  },
  card2: {
    width: 2,
    height: 70
  },
  card3: {
    width: 2,
    height: 70
  },
  card4: {
    width: 2,
    height: 70
  },
  card5: {
    width: 2,
    height: 70
  },
  card6: {
    width: 2,
    height: 70
  },
  card7: {
    width: 2,
    height: 70
  },
  card8: {
    width: 2,
    height: 70
  },
  card9: {
    width: 2,
    height: 70
  },
  card10: {
    width: 2,
    height: 70
  },
  card11: {
    width: 2,
    height: 70
  },
  card12: {
    width: 2,
    height: 70
  },
  card13: {
    width: 2,
    height: 70
  },
  card14: {
    width: 2,
    height: 70
  },
  card15: {
    width: 2,
    height: 70
  },
  card16: {
    width: 2,
    height: 70
  },
  card17: {
    width: 2,
    height: 70
  },
  card18: {
    width: 2,
    height: 70
  },
  card19: {
    width: 2,
    height: 70
  },
  card20: {
    width: 2,
    height: 70
  },
  card21: {
    width: 2,
    height: 70
  },
  card22: {
    width: 2,
    height: 70
  },
  card23: {
    width: 2,
    height: 70
  },
  card24: {
    width: 2,
    height: 70
  },
  card25: {
    width: 2,
    height: 70
  },
  card26: {
    width: 2,
    height: 70
  },
  card27: {
    width: 2,
    height: 70
  },
  card28: {
    width: 2,
    height: 70
  },
  card29: {
    width: 2,
    height: 70
  },
  card30: {
    width: 2,
    height: 70
  },
  card31: {
    width: 2,
    height: 70
  },
  card32: {
    width: 2,
    height: 70
  },
  card33: {
    width: 2,
    height: 70
  },
  card34: {
    width: 2,
    height: 70
  },
  card35: {
    width: 2,
    height: 70
  },
  card36: {
    width: 2,
    height: 70
  },
  card37: {
    width: 2,
    height: 70
  },
  card38: {
    width: 2,
    height: 70
  },
  card39: {
    width: 2,
    height: 70
  },
  card40: {
    width: 2,
    height: 70
  },
  card41: {
    width: 2,
    height: 70
  },
  card42: {
    width: 2,
    height: 70
  },
  card43: {
    width: 2,
    height: 70
  },
  card44: {
    width: 2,
    height: 70
  },
  card45: {
    width: 2,
    height: 70
  },
  card46: {
    width: 2,
    height: 70
  },
  card47: {
    width: 2,
    height: 70
  },
  card48: {
    width: 2,
    height: 70
  },
  card49: {
    width: 2,
    height: 70
  },
  card50: {
    width: 2,
    height: 70
  },
  card51: {
    width: 2,
    height: 70
  },
  card52: {
    width: 2,
    height: 70
  },
  card53: {
    width: 2,
    height: 70
  },
  card54: {
    width: 2,
    height: 70
  },
  card55: {
    width: 2,
    height: 70
  },
  card56: {
    width: 2,
    height: 70
  },
  card57: {
    width: 2,
    height: 70
  },
  card58: {
    width: 2,
    height: 70
  },
  card59: {
    width: 2,
    height: 70
  },
  card60: {
    width: 2,
    height: 70
  },
  card61: {
    width: 2,
    height: 70
  },
  card62: {
    width: 2,
    height: 70
  },
  card63: {
    width: 2,
    height: 70
  },
  card64: {
    width: 2,
    height: 70
  },
  card65: {
    width: 2,
    height: 70
  },
  card66: {
    width: 2,
    height: 70
  },
  card67: {
    width: 2,
    height: 70
  },
  card68: {
    width: 2,
    height: 70
  },
  card69: {
    width: 2,
    height: 70
  },
  card70: {
    width: 2,
    height: 70
  },
  card71: {
    width: 2,
    height: 70
  },
  card72: {
    width: 2,
    height: 70
  },
  card73: {
    width: 2,
    height: 70
  },
  card74: {
    width: 2,
    height: 70
  },
  card75: {
    width: 2,
    height: 70
  },
  card76: {
    width: 2,
    height: 70
  },
  card77: {
    width: 2,
    height: 70
  },
  card78: {
    width: 2,
    height: 70
  },
  card79: {
    width: 2,
    height: 70
  },
  card80: {
    width: 2,
    height: 70
  },
  card81: {
    width: 2,
    height: 70
  },
  card82: {
    width: 2,
    height: 70
  },
  card83: {
    width: 2,
    height: 70
  },
  card84: {
    width: 2,
    height: 70
  },
  card85: {
    width: 2,
    height: 70
  },
  card86: {
    width: 2,
    height: 70
  },
  card87: {
    width: 2,
    height: 70
  },
  card88: {
    width: 2,
    height: 70
  },
  card89: {
    width: 2,
    height: 70
  },
  card90: {
    width: 2,
    height: 70
  },
  card91: {
    width: 2,
    height: 70
  },
  card92: {
    width: 2,
    height: 70
  },
  card93: {
    width: 2,
    height: 70
  },
  card94: {
    width: 2,
    height: 70
  },
  card95: {
    width: 2,
    height: 70
  },
  card96: {
    width: 2,
    height: 70
  },
  card97: {
    width: 2,
    height: 70
  },
  card98: {
    width: 2,
    height: 70
  },
  card99: {
    width: 2,
    height: 70
  },
  card100: {
    width: 2,
    height: 70
  },
  card101: {
    width: 2,
    height: 70
  },
  card102: {
    width: 2,
    height: 70
  },
  card103: {
    width: 2,
    height: 70
  },
  card104: {
    width: 2,
    height: 70
  },
  card105: {
    width: 2,
    height: 70
  },
  card106: {
    width: 2,
    height: 70
  },
  card107: {
    width: 2,
    height: 70
  },
  card108: {
    width: 2,
    height: 70
  },
  card109: {
    width: 2,
    height: 70
  },
  card110: {
    width: 2,
    height: 70
  },
  card111: {
    width: 2,
    height: 70
  },
  card112: {
    width: 2,
    height: 70
  },
  card113: {
    width: 2,
    height: 70
  },
  card114: {
    width: 2,
    height: 70
  },
  card115: {
    width: 2,
    height: 70
  },
  card116: {
    width: 2,
    height: 70
  },
  card117: {
    width: 2,
    height: 70
  },
  card118: {
    width: 2,
    height: 70
  },
  card119: {
    width: 2,
    height: 70
  },
  card120: {
    width: 2,
    height: 70
  },
  card121: {
    width: 2,
    height: 70
  },
  card122: {
    width: 2,
    height: 70
  },
  card123: {
    width: 2,
    height: 70
  },
  card124: {
    width: 2,
    height: 70
  },
  card125: {
    width: 2,
    height: 70
  },
  card126: {
    width: 2,
    height: 70
  },
  card127: {
    width: 2,
    height: 70
  },
  card128: {
    width: 2,
    height: 70
  },
  card129: {
    width: 2,
    height: 70
  },
  card130: {
    width: 2,
    height: 70
  },
  card131: {
    width: 2,
    height: 70
  },
  card132: {
    width: 2,
    height: 70
  },
  card133: {
    width: 2,
    height: 70
  },
  card134: {
    width: 2,
    height: 70
  },
  card135: {
    width: 2,
    height: 70
  },
  card136: {
    width: 2,
    height: 70
  },
  card137: {
    width: 2,
    height: 70
  },
  card138: {
    width: 2,
    height: 70
  },
  card139: {
    width: 2,
    height: 70
  },
  card140: {
    width: 2,
    height: 70
  },
  card141: {
    width: 2,
    height: 70
  },
  card142: {
    width: 2,
    height: 70
  },
  card143: {
    width: 2,
    height: 70
  },
  card144: {
    width: 2,
    height: 70
  },
  card145: {
    width: 2,
    height: 70
  },
  card146: {
    width: 2,
    height: 70
  },
  card147: {
    width: 2,
    height: 70
  },
  card148: {
    width: 2,
    height: 70
  },
  card149: {
    width: 2,
    height: 70
  },
  card150: {
    width: 2,
    height: 70
  },
  card151: {
    width: 2,
    height: 70
  },
  card152: {
    width: 2,
    height: 70
  },
  card153: {
    width: 2,
    height: 70
  },
  card154: {
    width: 2,
    height: 70
  },
  card155: {
    width: 2,
    height: 70
  },
  card156: {
    width: 2,
    height: 70
  },
  card157: {
    width: 2,
    height: 70
  },
  card158: {
    width: 2,
    height: 70
  },
  card159: {
    width: 2,
    height: 70
  },
  card160: {
    width: 2,
    height: 70
  },
  card161: {
    width: 2,
    height: 70
  },
  card162: {
    width: 2,
    height: 70
  },
  card163: {
    width: 2,
    height: 70
  },
  card164: {
    width: 2,
    height: 70
  },
  card165: {
    width: 2,
    height: 70
  },
  card166: {
    width: 2,
    height: 70
  },
  card167: {
    width: 2,
    height: 70
  },
  card168: {
    width: 2,
    height: 70
  },
  card169: {
    width: 2,
    height: 70
  },
  card170: {
    width: 2,
    height: 70
  },
  card171: {
    width: 2,
    height: 70
  },
  card172: {
    width: 2,
    height: 70
  },
  card173: {
    width: 2,
    height: 70
  },
  card174: {
    width: 2,
    height: 70
  },
  card175: {
    width: 2,
    height: 70
  },
  card176: {
    width: 2,
    height: 70
  },
  card177: {
    width: 2,
    height: 70
  },
  card178: {
    width: 2,
    height: 70
  },
  card179: {
    width: 2,
    height: 70
  },
  card180: {
    width: 2,
    height: 70
  },
  card181: {
    width: 2,
    height: 70
  },
  card182: {
    width: 2,
    height: 70
  },
  card183: {
    width: 2,
    height: 70
  },
  card184: {
    width: 2,
    height: 70
  },
  card185: {
    width: 2,
    height: 70
  },
  card186: {
    width: 2,
    height: 70
  },
  card187: {
    width: 2,
    height: 70
  },
  card188: {
    width: 2,
    height: 70
  },
  card189: {
    width: 2,
    height: 70
  },
  card190: {
    width: 2,
    height: 70
  },
  card191: {
    width: 2,
    height: 70
  },
  card192: {
    width: 2,
    height: 70
  },
  card193: {
    width: 2,
    height: 70
  },
  card194: {
    width: 2,
    height: 70
  },
  card195: {
    width: 2,
    height: 70
  },
  card196: {
    width: 2,
    height: 70
  },
  card197: {
    width: 2,
    height: 70
  },
  card198: {
    width: 2,
    height: 70
  },
  card199: {
    width: 2,
    height: 70
  },
  card200: {
    width: 2,
    height: 70
  },
  card201: {
    width: 2,
    height: 70
  },
  card202: {
    width: 2,
    height: 70
  },
  card203: {
    width: 2,
    height: 70
  },
  card204: {
    width: 2,
    height: 70
  },
  card205: {
    width: 2,
    height: 70
  },
  card206: {
    width: 2,
    height: 70
  },
  card207: {
    width: 2,
    height: 70
  },
  card208: {
    width: 2,
    height: 70
  },
  card209: {
    width: 2,
    height: 70
  },
  card210: {
    width: 2,
    height: 70
  },
  card211: {
    width: 2,
    height: 70
  },
  card212: {
    width: 2,
    height: 70
  },
  card213: {
    width: 2,
    height: 70
  },
  card214: {
    width: 2,
    height: 70
  },
  card215: {
    width: 2,
    height: 70
  },
  card216: {
    width: 2,
    height: 70
  },
  card217: {
    width: 2,
    height: 70
  },
  card218: {
    width: 2,
    height: 70
  },
  card219: {
    width: 2,
    height: 70
  },
  card220: {
    width: 2,
    height: 70
  },
  card221: {
    width: 2,
    height: 70
  },
  card222: {
    width: 2,
    height: 70
  },
  card223: {
    width: 2,
    height: 70
  },
  card224: {
    width: 2,
    height: 70
  },
  card225: {
    width: 2,
    height: 70
  },
  card226: {
    width: 2,
    height: 70
  },
  card227: {
    width: 2,
    height: 70
  },
  card228: {
    width: 2,
    height: 70
  },
  card229: {
    width: 2,
    height: 70
  },
  card230: {
    width: 2,
    height: 70
  },
  card231: {
    width: 2,
    height: 70
  },
  card232: {
    width: 2,
    height: 70
  },
  card233: {
    width: 2,
    height: 70
  },
  card234: {
    width: 2,
    height: 70
  },
  card235: {
    width: 2,
    height: 70
  },
  card236: {
    width: 2,
    height: 70
  },
  card237: {
    width: 2,
    height: 70
  },
  card238: {
    width: 2,
    height: 70
  },
  card239: {
    width: 2,
    height: 70
  },
  card240: {
    width: 2,
    height: 70
  },
  card241: {
    width: 2,
    height: 70
  },
  card242: {
    width: 2,
    height: 70
  },
  card243: {
    width: 2,
    height: 70
  },
  card244: {
    width: 2,
    height: 70
  },
  card245: {
    width: 2,
    height: 70
  },
  card246: {
    width: 2,
    height: 70
  },
  card247: {
    width: 2,
    height: 70
  },
  card248: {
    width: 2,
    height: 70
  },
  card249: {
    width: 2,
    height: 70
  },
  card250: {
    width: 2,
    height: 70
  },
  card251: {
    width: 2,
    height: 70
  },
  card252: {
    width: 2,
    height: 70
  },
  card253: {
    width: 2,
    height: 70
  },
  card254: {
    width: 2,
    height: 70
  },
  card255: {
    width: 2,
    height: 70
  },
  card256: {
    width: 2,
    height: 70
  },
  card257: {
    width: 2,
    height: 70
  },
  card258: {
    width: 2,
    height: 70
  },
  card259: {
    width: 2,
    height: 70
  },
  card260: {
    width: 2,
    height: 70
  },
  card261: {
    width: 2,
    height: 70
  },
  card262: {
    width: 2,
    height: 70
  },
  card263: {
    width: 2,
    height: 70
  },
  card264: {
    width: 2,
    height: 70
  },
  card265: {
    width: 2,
    height: 70
  },
  card266: {
    width: 2,
    height: 70
  },
  card267: {
    width: 2,
    height: 70
  },
  card268: {
    width: 2,
    height: 70
  },
  card269: {
    width: 2,
    height: 70
  },
  card270: {
    width: 2,
    height: 70
  },
  card271: {
    width: 2,
    height: 70
  },
  card272: {
    width: 2,
    height: 70
  },
  card273: {
    width: 2,
    height: 70
  },
  card274: {
    width: 2,
    height: 70
  },
  card275: {
    width: 2,
    height: 70
  },
  card276: {
    width: 2,
    height: 70
  },
  card277: {
    width: 2,
    height: 70
  },
  card278: {
    width: 2,
    height: 70
  },
  card279: {
    width: 2,
    height: 70
  },
  card280: {
    width: 2,
    height: 70
  },
  card281: {
    width: 2,
    height: 70
  },
  card282: {
    width: 2,
    height: 70
  },
  card283: {
    width: 2,
    height: 70
  },
  card284: {
    width: 2,
    height: 70
  },
  card285: {
    width: 2,
    height: 70
  },
  card286: {
    width: 2,
    height: 70
  },
  card287: {
    width: 2,
    height: 70
  },
  card288: {
    width: 2,
    height: 70
  },
  card289: {
    width: 2,
    height: 70
  },
  card290: {
    width: 2,
    height: 70
  },
  card291: {
    width: 2,
    height: 70
  },
  card292: {
    width: 2,
    height: 70
  },
  card293: {
    width: 2,
    height: 70
  },
  card294: {
    width: 2,
    height: 70
  },
  card295: {
    width: 2,
    height: 70
  },
  card296: {
    width: 2,
    height: 70
  },
  card297: {
    width: 2,
    height: 70
  },
  card298: {
    width: 2,
    height: 70
  },
  card299: {
    width: 2,
    height: 70
  },
  card300: {
    width: 2,
    height: 70
  },
  card301: {
    width: 2,
    height: 70
  },
  card302: {
    width: 2,
    height: 70
  },
  card303: {
    width: 2,
    height: 70
  },
  card304: {
    width: 2,
    height: 70
  },
  card305: {
    width: 2,
    height: 70
  },
  card306: {
    width: 2,
    height: 70
  },
  card307: {
    width: 2,
    height: 70
  },
  card308: {
    width: 2,
    height: 70
  },
  card309: {
    width: 2,
    height: 70
  },
  card310: {
    width: 2,
    height: 70
  },
  card311: {
    width: 2,
    height: 70
  },
  card312: {
    width: 2,
    height: 70
  },
  card313: {
    width: 2,
    height: 70
  },
  card314: {
    width: 2,
    height: 70
  },
  card315: {
    width: 2,
    height: 70
  },
  card316: {
    width: 2,
    height: 70
  },
  card317: {
    width: 2,
    height: 70
  },
  card318: {
    width: 2,
    height: 70
  },
  card319: {
    width: 2,
    height: 70
  },
  card320: {
    width: 2,
    height: 70
  },
  card321: {
    width: 2,
    height: 70
  },
  card322: {
    width: 2,
    height: 70
  },
  card323: {
    width: 2,
    height: 70
  },
  card324: {
    width: 2,
    height: 70
  },
  card325: {
    width: 2,
    height: 70
  },
  card326: {
    width: 2,
    height: 70
  },
  card327: {
    width: 2,
    height: 70
  },
  card328: {
    width: 2,
    height: 70
  },
  card329: {
    width: 2,
    height: 70
  },
  card330: {
    width: 2,
    height: 70
  },
  card331: {
    width: 2,
    height: 70
  },
  card332: {
    width: 2,
    height: 70
  },
  card333: {
    width: 2,
    height: 70
  },
  card334: {
    width: 2,
    height: 70
  },
  card335: {
    width: 2,
    height: 70
  },
  card336: {
    width: 2,
    height: 70
  },
  card337: {
    width: 2,
    height: 70
  },
  card338: {
    width: 2,
    height: 70
  },
  card339: {
    width: 2,
    height: 70
  },
  card340: {
    width: 2,
    height: 70
  },
  card341: {
    width: 2,
    height: 70
  },
  card342: {
    width: 2,
    height: 70
  },
  card343: {
    width: 2,
    height: 70
  },
  card344: {
    width: 2,
    height: 70
  },
  card345: {
    width: 2,
    height: 70
  },
  card346: {
    width: 2,
    height: 70
  },
  card347: {
    width: 2,
    height: 70
  },
  card348: {
    width: 2,
    height: 70
  },
  card349: {
    width: 2,
    height: 70
  },
  card350: {
    width: 2,
    height: 70
  },
  card351: {
    width: 2,
    height: 70
  },
  card352: {
    width: 2,
    height: 70
  },
  card353: {
    width: 2,
    height: 70
  },
  card354: {
    width: 2,
    height: 70
  },
  card355: {
    width: 2,
    height: 70
  },
  card356: {
    width: 2,
    height: 70
  },
  card357: {
    width: 2,
    height: 70
  },
  card358: {
    width: 2,
    height: 70
  },
  card359: {
    width: 2,
    height: 70
  },
  card360: {
    width: 2,
    height: 70
  },
  card361: {
    width: 2,
    height: 70
  },
  card362: {
    width: 2,
    height: 70
  },
  card363: {
    width: 2,
    height: 70
  },
  card364: {
    width: 2,
    height: 70
  },
  card365: {
    width: 2,
    height: 70
  },
  card366: {
    width: 2,
    height: 70
  },
  card367: {
    width: 2,
    height: 70
  },
  card368: {
    width: 2,
    height: 70
  },
  card369: {
    width: 2,
    height: 70
  },
  card370: {
    width: 2,
    height: 70
  },
  card371: {
    width: 2,
    height: 70
  },
  card372: {
    width: 2,
    height: 70
  },
  card373: {
    width: 2,
    height: 70
  },
  card374: {
    width: 2,
    height: 70
  },
  card375: {
    width: 2,
    height: 70
  },
  card376: {
    width: 2,
    height: 70
  },
  card377: {
    width: 2,
    height: 70
  },
  card378: {
    width: 2,
    height: 70
  },
  card379: {
    width: 2,
    height: 70
  },
  card380: {
    width: 2,
    height: 70
  },
  card381: {
    width: 2,
    height: 70
  },
  card382: {
    width: 2,
    height: 70
  },
  card383: {
    width: 2,
    height: 70
  },
  card384: {
    width: 2,
    height: 70
  },
  card385: {
    width: 2,
    height: 70
  },
  card386: {
    width: 2,
    height: 70
  },
  card387: {
    width: 2,
    height: 70
  },
  card388: {
    width: 2,
    height: 70
  },
  card389: {
    width: 2,
    height: 70
  },
  card390: {
    width: 2,
    height: 70
  },
  card391: {
    width: 2,
    height: 70
  },
  card392: {
    width: 2,
    height: 70
  },
  card393: {
    width: 2,
    height: 70
  },
  card394: {
    width: 2,
    height: 70
  },
  card395: {
    width: 2,
    height: 70
  },
  card396: {
    width: 2,
    height: 70
  },
  card397: {
    width: 2,
    height: 70
  },
  card398: {
    width: 2,
    height: 70
  },
  card399: {
    width: 2,
    height: 70
  },
  card400: {
    width: 2,
    height: 70
  },
  card401: {
    width: 2,
    height: 70
  },
  card402: {
    width: 2,
    height: 70
  },
  card403: {
    width: 2,
    height: 70
  },
  card404: {
    width: 2,
    height: 70
  },
  card405: {
    width: 2,
    height: 70
  },
  card406: {
    width: 2,
    height: 70
  },
  card407: {
    width: 2,
    height: 70
  },
  card408: {
    width: 2,
    height: 70
  },
  card409: {
    width: 2,
    height: 70
  },
  card410: {
    width: 2,
    height: 70
  },
  card411: {
    width: 2,
    height: 70
  },
  card412: {
    width: 2,
    height: 70
  },
  card413: {
    width: 2,
    height: 70
  },
  card414: {
    width: 2,
    height: 70
  },
  card415: {
    width: 2,
    height: 70
  },

}


