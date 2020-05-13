class GameManager {

    constructor(){
        
        
    }
    
    initialize(){
    
      this.deck = this.generateDeck().addStack(this.generateDeck()).addStack(this.generateDeck());
      this.deck.shuffle(2);
    
    }
    
    
    generateDeck() {
      var stack = new CardStack();

      for (let suit in SUITS) {
        for (let rank in RANKS) {

          stack.addCard(new Card(suit, rank));

        }
      }

      return stack;
    }

}
