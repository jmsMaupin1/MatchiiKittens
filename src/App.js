import React, { Component } from 'react';
import './App.css';
import MatchiiCard from './Card.js';
import BlueKitty from '../img/kitty-blue.png';
import PurpleKitty from '../img/kitty-purple.png';
import OrangeKitty from '../img/kitty-orange.png';
import PlumKitty from '../img/kitty-plum.png';
import Puppy from '../img/puppy.png';

let uniqueCards = [
  {image: BlueKitty, selected: false, visible: true},
  {image: PurpleKitty, selected: false, visible: true},
  {image: OrangeKitty, selected: false, visible: true},
  {image: PlumKitty, selected: false, visible: true}
];

class App extends Component {
  constructor(props) {
    super(props);
    let arrayOfCards = [];
    uniqueCards.forEach(card => {
      let copy = {
        image: card.image,
        selected: card.selected,
        visible: card.visible
      };
      arrayOfCards.push(card);
      arrayOfCards.push(copy);
    });
    this.state = {arrayOfCards};
  }

  flipCard(index, callback) {
    this.setState((state, props) => {
      let cards = state.arrayOfCards;
      cards[index].selected = !cards[index].selected;
      return {
        arrayOfCards: cards
      }
    }, callback);
  }

  hideCard(index) {
    this.flipCard(index);
    this.setState((state, props) => {
      let cards = state.arrayOfCards;
      cards[index].visible = false;
      return {
        arrayOfCards: cards
      }
    });
  }

  countFlippedCards(){
    return this.state.arrayOfCards.filter((image)=>{
      return image.selected;
    }).length;
  }

  countVisibleCards(){
    return this.state.arrayOfCards.filter((image)=>{
      return image.visible;
    }).length;
  }

  doesMatch() {
    let flippedCards = this.state.arrayOfCards.filter((card, index)=>{
      return card.selected;
    });
    return flippedCards[0].image === flippedCards[1].image;
  }

  handleClick(index) {
    this.flipCard(index, ()=>{
      if(this.countFlippedCards() == 2) {
        if(!this.doesMatch()) {
          this.state.arrayOfCards.map((card, index, arr)=>{
            if(card.selected) {
              setTimeout(() => {
                this.flipCard(index);
              }, 1000);
            }
          })
        } else {
          this.state.arrayOfCards.map((card, index, arr)=>{
            if(card.selected) {
              setTimeout(() => {
                this.hideCard(index);
                if(this.countVisibleCards()===0)
                  console.log("YOU WIN");
              }, 1000);
            }
          })

        }
      }
    });
  }

  render() {
    var self = this;
    return (
      <div className="App">
        {
          this.state.arrayOfCards.map(function (card, index) {
            return (<MatchiiCard key={index} index={index} onClick={self.handleClick.bind(self)} card={card} />)
          })
        }
      </div>
    );
  }
}

export default App;
