class GameManager {

    constructor(){
        
        
    }
    
    initialize(){
    
      this.dealerDeck = this.generateDeck(3);
      this.dealerDeck.shuffle(3);

      this.discardDeck = new CardStack();
      this.playerHand = new CardStack();
      this.dealerHand = new CardStack();

    
    }


    dealHand(){

      this.playerHand.giveAllCards(this.discardDeck);
      this.dealerHand.giveAllCards(this.discardDeck);

      this.dealerDeck.giveCard(this.playerHand);
      this.dealerDeck.giveCard(this.dealerHand);

      this.dealerDeck.giveCard(this.playerHand);
      this.dealerDeck.giveCard(this.dealerHand);

      console.log(this.playerHand);
      console.log(this.calculateHand(this.playerHand));

    }
    
    calculateHand(cardStack){

      let sum=0;
      let aces = [];

      for(let i = 0; i < cardStack.cards.length; i++){

        let card = cardStack.cards[i];

        if(card.rank.defaultValue == 14){
            aces.push(card);
        }else{
            sum += Math.min(10, card.rank.defaultValue);
        }
          
      }

      for(let i = 0; i < aces.length; i++){
         if(sum + 11 > 21){
            sum += 1;
         }else{
            sum += 11;
         }
      }
      return sum;

    }

    hit(){
      this.dealerDeck.giveCard(this.playerHand);
      console.log(this.calculateHand(this.playerHand));
    }
    
    stand(){

      this.dealerPlay();
      this.decideWinner();

    }

    dealerPlay(){
      let thresehold = 100;
      while(this.calculateHand(this.dealerHand) < 17 && thresehold-- > 0){
        this.dealerDeck.giveCard(this.dealerHand);        
      }
    }


    decideWinner(){

      let dealerTotal = this.calculateHand(this.dealerHand);
      let playerTotal = this.calculateHand(this.playerHand);

      if(playerTotal > 21){
        console.log('player busts!');
        console.log('dealer Wins!');
        return;
      }

      if(dealerTotal > 21){
        console.log('dealer busts!');
        console.log('player wins!');
        return;
      }


      if(playerTotal == dealerTotal){
        console.log('push!');
      }else if(playerTotal > dealerTotal){
        console.log('player wins!');
      }else{
        console.log('dealer Wins!');
      }

    }

    generateDeck(num=1) {
      console.log("generateDeck")
      var stack = new CardStack();

      while(num-- > 0){
        for (let suit in SUITS) {
          for (let rank in RANKS) {

            stack.addCard(new Card(SUITS[suit], RANKS[rank]));

          }
        }  
      }
      
      console.log(stack);

      return stack;
    }

}
