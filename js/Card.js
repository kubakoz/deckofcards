const SUITS = {
  "DIAMOND":  {id: 0, name: 'diamond', label: '&#9830;', color: 'red'},
  "CLUB":     {id: 2, name: 'club', label: '&#9827;', color: 'black'},
  "HEART":    {id: 3, name: 'heart', label: '&#9829;', color: 'red'},
  "SPADE":    {id: 4, name: 'spade', label: '&#9824;', color: 'black'}
}

const RANKS = {
  "TWO":    {id: 2, name: 'two', label: '2', defaultValue : 2},
  "THREE":  {id: 3, name: 'three', label: '3', defaultValue : 3},
  "FOUR":   {id: 4, name: 'four', label: '4', defaultValue : 4},
  "FIVE":   {id: 5, name: 'five', label: '5', defaultValue : 5},
  "SIX":    {id: 6, name: 'six', label: '6', defaultValue : 6},
  "SEVEN":  {id: 7, name: 'seven', label: '7', defaultValue : 7},
  "EIGHT":  {id: 8, name: 'eight', label: '8', defaultValue : 8},
  "NINE":   {id: 9, name: 'nine', label: '9', defaultValue : 9},
  "TEN":    {id: 10, name: 'ten', label: '10', defaultValue : 10},
  "JACK":   {id: 11, name: 'jack', label: 'J', defaultValue : 11},
  "QUEEN":  {id: 12, name: 'queen', label: 'Q', defaultValue : 12},
  "KING":   {id: 13, name: 'king', label: 'K', defaultValue : 13},
  "ACE":    {id: 14, name: 'ace', label: 'A', defaultValue : 14}
}


class Card {
  
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.faceup = false;
  }

}