const SUITS = {
  "DIAMOND":  {id: 0, name: 'diamond'},
  "CLUB":     {id: 2, name: 'club'},
  "HEART":    {id: 3, name: 'heart'},
  "SPADE":    {id: 4, name: 'spade'}
}

const RANKS = {
  "TWO":    {id: 2, name: 'two', label: '2'},
  "THREE":  {id: 3, name: 'three', label: '3'},
  "FOUR":   {id: 4, name: 'four', label: '4'},
  "FIVE":   {id: 5, name: 'five', label: '5'},
  "SIX":    {id: 6, name: 'six', label: '6'},
  "SEVEN":  {id: 7, name: 'seven', label: '7'},
  "EIGHT":  {id: 8, name: 'eight', label: '8'},
  "NINE":   {id: 9, name: 'nine', label: '9'},
  "TEN":    {id: 10, name: 'ten', label: '10'},
  "JACK":   {id: 11, name: 'jack', label: 'J'},
  "QUEEN":  {id: 12, name: 'queen', label: 'Q'},
  "KING":   {id: 13, name: 'king', label: 'K'},
  "ACE":    {id: 14, name: 'ace', label: 'A'}
}


class Card {
  
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.faceup = false;
  }

}