
const STATE = {
  
  "DONE":             0,
  "PLAYER_ACTION":    1,
  "DEALER_ACTION":    2
}


class GameManager {

    constructor(){
        
        this.visualDeck = new VisualizedDeck();
        this.audio = new Audio();
        this.state = STATE.DONE;
        
    }
    
    initialize(){
      

      this.discardPile = this.visualDeck.createPile(-300, 100, 'discardPile');
      this.playerPile = this.visualDeck.createPile(500, 400, 'playerPile');
      this.dealerPile = this.visualDeck.createPile(2000, -501, 'dealerPile', this.visualDeck.generateDeck(1));
      this.dealerHandPile = this.visualDeck.createPile(400, 50, 'dealerHandPile');

      this.visualDeck.dealer.shuffle(this.dealerPile.stack, 100);

    
    }



    discardHand(){

      if(this.state != STATE.DONE){ return; }

      this.visualDeck.giveAllCardsP(this.playerPile, this.discardPile, 'down');
      this.visualDeck.giveAllCardsP(this.dealerHandPile, this.discardPile);

      console.log(this.discardPile)
    }


    dealHand(){

      if(this.state != STATE.DONE){ return; }

      this.discardHand();

      if(this.dealerPile.stack.cards.length < 20){

        this.reShuffle();
        return;
      }

      this.visualDeck.giveCardP(this.dealerPile, this.playerPile);
      this.visualDeck.giveCardP(this.dealerPile, this.dealerHandPile, 'down');

      this.visualDeck.giveCardP(this.dealerPile, this.playerPile);
      this.visualDeck.giveCardP(this.dealerPile, this.dealerHandPile);
   
                
      this.state = STATE.PLAYER_ACTION;

      if(this.calculateHand(this.playerPile.stack) == 21){
        //blackjack
        this.state = STATE.DONE;
      }

      if(this.calculateHand(this.dealerHandPile.stack) == 21){
        //blackjack
        setTimeout(()=>{this.visualDeck.faceCardUp(this.dealerHandPile.stack.cards[0])}, 3000)
        this.state = STATE.DONE;
      }




    }

    reShuffle(){
      
      this.state = STATE.DEALER_ACTION;
      
      setTimeout(()=>{
        this.state = STATE.DONE;
      }, 6000);

      this.visualDeck.dealer.shuffle(this.discardPile.stack, 100);
      this.visualDeck.giveAllCardsP(this.discardPile, this.dealerPile, 'down');


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
      
      let card = this.visualDeck.giveCardP(this.dealerPile, this.playerPile, 'up'); 

      if(this.calculateHand(this.playerPile.stack) == 21){

        this.stand();
      }

      if(this.calculateHand(this.playerPile.stack) > 21){

        this.state = STATE.DONE;
      }

    }
    
    stand(){

      if(this.state != STATE.PLAYER_ACTION){ return; }


      this.dealerPlay();
      this.decideWinner();

      this.state = STATE.DONE;

    }

    dealerPlay(){

      this.state = STATE.DEALER_ACTION;
      let thresehold = 100;

      this.visualDeck.faceCardUp(this.dealerHandPile.stack.cards[0]);

      while(this.calculateHand(this.dealerHandPile.stack) < 17 && thresehold-- > 0){
        let card = this.visualDeck.giveCardP(this.dealerPile, this.dealerHandPile, 'up'); 
      }
      
      this.state = STATE.DONE;
    }


    decideWinner(){
      
      this.state = STATE.DONE;
      
      let dealerTotal = this.calculateHand(this.dealerHandPile);
      let playerTotal = this.calculateHand(this.playerPile);


      if(playerTotal > 21){        
        //('Bust! dealer Wins.', 2000);
        return;
      }

      if(dealerTotal > 21){        
        //('Dealer Busts! player wins!', 2000);
        return;
      }


      if(playerTotal == dealerTotal){
        //('push!', 2000);
      }else if(playerTotal > dealerTotal){
        //('winner winner chicken dinner!', 2000);
      }else{
        //('dealer Wins!', 2000);
      }
      
    }


}
