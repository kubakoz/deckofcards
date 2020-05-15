
const STATE = {
  
  "DONE":             0,
  "PLAYER_ACTION":    1,
  "DEALER_ACTION":    2
}


class GameManager {

    constructor(){
        
        this.dealer = new CardManager();
        this.gfx = new Graphics();
        this.audio = new Audio();
        this.state = STATE.DONE;
        
    }
    
    initialize(){
      

      this.gfx.createPosition(-300, 100, 'discardPile');
      this.gfx.createPosition(500, 400, 'playerPile');
      this.gfx.createPosition(2000, -501, 'dealerPile');
      this.gfx.createPosition(400, 50, 'dealerHandPile');


      this.dealerDeck = this.generateDeck(4);
      this.dealer.shuffle(this.dealerDeck, 100);

      this.discardDeck = new CardStack();
      this.playerHand = new CardStack();
      this.dealerHand = new CardStack();

    
    }




    dealHand(){

      if(this.state != STATE.DONE){ return; }

      this.audio.cancelAll();





      for(let i = 0; i < this.playerHand.cards.length; i++){
        this.gfx.queueMoveCard(this.playerHand.cards[i], this.gfx.positions['discardPile']);        
      }

      for(let i = 0; i < this.dealerHand.cards.length; i++){
        this.gfx.queueMoveCard(this.dealerHand.cards[i], this.gfx.positions['discardPile']);
      }

      if(this.dealerDeck.cards.length < 20){
        this.reShuffle();
        return;
      }

      this.dealer.giveAllCards(this.playerHand, this.discardDeck);
      this.dealer.giveAllCards(this.dealerHand, this.discardDeck);

      this.dealer.giveCard(this.dealerDeck, this.playerHand);
      this.dealer.giveCard(this.dealerDeck, this.dealerHand);

      this.gfx.spawnCard(this.playerHand.cards[0], this.gfx.positions['dealerPile']);
      this.gfx.queueMoveCard(this.playerHand.cards[0], this.gfx.positions['playerPile']);
      this.gfx.setZIndex(this.playerHand.cards[0], 0);
      this.gfx.faceCardUp(this.playerHand.cards[0]);

      this.gfx.spawnCard(this.dealerHand.cards[0], this.gfx.positions['dealerPile']);
      this.gfx.queueMoveCard(this.dealerHand.cards[0], this.gfx.positions['dealerHandPile']);
      this.gfx.setZIndex(this.dealerHand.cards[0], 0);
      this.gfx.faceCardDown(this.dealerHand.cards[0]);

      this.dealer.giveCard(this.dealerDeck, this.playerHand);
      this.dealer.giveCard(this.dealerDeck, this.dealerHand);

      this.gfx.spawnCard(this.playerHand.cards[1], this.gfx.positions['dealerPile']);      
      this.gfx.queueMoveCard(this.playerHand.cards[1], this.gfx.positions['playerPile'], 100, 0);      
      this.gfx.setZIndex(this.playerHand.cards[1], 1);      
      this.gfx.faceCardUp(this.playerHand.cards[1]);


      this.gfx.spawnCard(this.dealerHand.cards[1], this.gfx.positions['dealerPile']);
      this.gfx.queueMoveCard(this.dealerHand.cards[1], this.gfx.positions['dealerHandPile'], 100, 0);
      this.gfx.setZIndex(this.dealerHand.cards[1], 1);
      this.gfx.faceCardUp(this.dealerHand.cards[1]);     
      
           
    

      this.audio.say('Player Has: ' + this.calculateHand(this.playerHand));
      
      this.state = STATE.PLAYER_ACTION;

      if(this.calculateHand(this.playerHand) == 21){
        this.audio.say('Black JACK!');
        this.state = STATE.DONE;
      }

      if(this.calculateHand(this.dealerHand) == 21){
        this.audio.say('Dealer has Black JACK!');
        setTimeout(()=>{this.gfx.faceCardUp(this.dealerHand.cards[0])}, 3000)
        this.state = STATE.DONE;
      }




    }

    reShuffle(){

      for(let i = 0; i < this.discardDeck.cards.length; i++){

        this.gfx.faceCardDown(this.discardDeck.cards[i]);
        this.gfx.queueMoveCard(this.discardDeck.cards[i], this.gfx.positions['dealerPile']);

      }
      this.dealer.giveAllCards(this.discardDeck, this.dealerDeck);


    }

    
    calculateHand(cardStack){

      let sum=0;
      let aces = 0;

      for(let i = 0; i < cardStack.cards.length; i++){

        let card = cardStack.cards[i];

        if(card.rank.defaultValue == 14){
            aces++;
            sum += 11;
        }else{
            sum += Math.min(10, card.rank.defaultValue);
        }
          
      }

      while(sum > 21 && aces-- > 0){
        sum -=10;
      }

      return sum;

    }

    hit(){

      
      if(this.state != STATE.PLAYER_ACTION){ return; }
      
      this.audio.cancelAll();

      let card = this.dealer.giveCard(this.dealerDeck, this.playerHand);
      

      this.gfx.spawnCard(card, this.gfx.positions['dealerPile']);
      this.gfx.queueMoveCard(card, this.gfx.positions['playerPile'], 100*(this.playerHand.cards.length-1));
      this.gfx.setZIndex(card, this.playerHand.cards.length);      
      this.gfx.faceCardUp(card);  

      this.audio.say(this.calculateHand(this.playerHand));

      if(this.calculateHand(this.playerHand) == 21){

        this.stand();
      }

      if(this.calculateHand(this.playerHand) > 21){
        this.audio.say('too many!')
        this.state = STATE.DONE;
      }

    }
    
    stand(){

      if(this.state != STATE.PLAYER_ACTION){ return; }

      this.audio.cancelAll();

      this.dealerPlay();
      this.decideWinner();

      this.state = STATE.DONE;

    }

    dealerPlay(){

      this.state = STATE.DEALER_ACTION;
      let thresehold = 100;

      this.gfx.faceCardUp(this.dealerHand.cards[0]);

      while(this.calculateHand(this.dealerHand) < 17 && thresehold-- > 0){
        let card = this.dealer.giveCard(this.dealerDeck, this.dealerHand); 

        this.gfx.spawnCard(card, this.gfx.positions['dealerPile']);
        this.gfx.queueMoveCard(card, this.gfx.positions['dealerHandPile'], 100*(this.dealerHand.cards.length-1));   
        this.gfx.setZIndex(card, this.dealerHand.cards.length);      
        this.gfx.faceCardUp(card);   

      }
      
      this.state = STATE.DONE;
    }


    decideWinner(){
      
      this.state = STATE.DONE;
      
      let dealerTotal = this.calculateHand(this.dealerHand);
      let playerTotal = this.calculateHand(this.playerHand);

      console.log('dealer shows:');
      console.log(this.dealerHand);


      if(playerTotal > 21){        
        this.audio.sayDelayed('Bust! dealer Wins.', 2000);
        return;
      }

      if(dealerTotal > 21){        
        this.audio.sayDelayed('Dealer Busts! player wins!', 2000);
        return;
      }


      if(playerTotal == dealerTotal){
        this.audio.sayDelayed('push!', 2000);
      }else if(playerTotal > dealerTotal){
        this.audio.sayDelayed('winner winner chicken dinner!', 2000);
      }else{
        this.audio.sayDelayed('dealer Wins!', 2000);
      }
      
    }

    generateDeck(num=1) {
      console.log("generateDeck")
      var stack = new CardStack();
      let id = 1;
      while(num-- > 0){
        for (let suit in SUITS) {
          for (let rank in RANKS) {

            this.dealer.addCard(stack, new Card(SUITS[suit], RANKS[rank], 'Card_' + id++));

          }
        }  
      }
      
      console.log(stack);

      return stack;
    }

}
