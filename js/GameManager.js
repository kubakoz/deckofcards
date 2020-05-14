class GameManager {

    constructor(){
        
        this.dealer = new CardManager();
        this.gfx = new Graphics();
        
    }
    
    initialize(){
      

      this.gfx.createPosition(-300, 100, 'discardPile');
      this.gfx.createPosition(500, 400, 'playerPile');
      this.gfx.createPosition(900, -501, 'dealerPile');
      this.gfx.createPosition(400, 50, 'dealerHandPile');


      this.dealerDeck = this.generateDeck(3);
      this.dealer.shuffle(this.dealerDeck, 100);

      this.discardDeck = new CardStack();
      this.playerHand = new CardStack();
      this.dealerHand = new CardStack();

    
    }


    dealHand(){

      for(let i = 0; i < this.playerHand.cards.length; i++){
        this.gfx.queueMoveCard(this.playerHand.cards[i], this.gfx.positions['discardPile']);        
      }

      for(let i = 0; i < this.dealerHand.cards.length; i++){
        this.gfx.queueMoveCard(this.dealerHand.cards[i], this.gfx.positions['discardPile']);
      }

      this.dealer.giveAllCards(this.playerHand, this.discardDeck);
      this.dealer.giveAllCards(this.dealerHand, this.discardDeck);

      this.dealer.giveCard(this.dealerDeck, this.playerHand);
      this.dealer.giveCard(this.dealerDeck, this.dealerHand);

      this.gfx.spawnCard(this.playerHand.cards[0], this.gfx.positions['dealerPile']);
      this.gfx.queueMoveCard(this.playerHand.cards[0], this.gfx.positions['playerPile']);

      this.gfx.spawnCard(this.dealerHand.cards[0], this.gfx.positions['dealerPile']);
      this.gfx.queueMoveCard(this.dealerHand.cards[0], this.gfx.positions['dealerHandPile']);

      this.dealer.giveCard(this.dealerDeck, this.playerHand);
      this.dealer.giveCard(this.dealerDeck, this.dealerHand);

      this.gfx.spawnCard(this.playerHand.cards[1], this.gfx.positions['dealerPile']);
      this.gfx.queueMoveCard(this.playerHand.cards[1], this.gfx.positions['playerPile'], 100, 0);

      this.gfx.spawnCard(this.dealerHand.cards[1], this.gfx.positions['dealerPile']);
      this.gfx.queueMoveCard(this.dealerHand.cards[1], this.gfx.positions['dealerHandPile'], 100, 0);      
      
      


      console.log('dealer shows: ');
      console.log(this.dealerHand.cards[1]);

      console.log(this.playerHand);
      console.log(this.calculateHand(this.playerHand));

      if(this.calculateHand(this.playerHand) == 21){
        console.log('Black JACK!')
      }

      if(this.calculateHand(this.dealerHand) == 21){
        console.log('Dealer has Black JACK!')
      }

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
      
      let card = this.dealer.giveCard(this.dealerDeck, this.playerHand);


      this.gfx.spawnCard(card, this.gfx.positions['dealerPile']);
      this.gfx.queueMoveCard(card, this.gfx.positions['playerPile'], 100*(this.playerHand.cards.length-1));  

      console.log(this.calculateHand(this.playerHand));

      if(this.calculateHand(this.playerHand) == 21){
        console.log('twenty one!')
      }

      if(this.calculateHand(this.playerHand) > 21){
        console.log('player busts!')
      }

    }
    
    stand(){

      this.dealerPlay();
      this.decideWinner();

    }

    dealerPlay(){
      let thresehold = 100;
      while(this.calculateHand(this.dealerHand) < 17 && thresehold-- > 0){
        let card = this.dealer.giveCard(this.dealerDeck, this.dealerHand); 

        this.gfx.spawnCard(card, this.gfx.positions['dealerPile']);
        this.gfx.queueMoveCard(card, this.gfx.positions['dealerHandPile'], 100*(this.dealerHand.cards.length-1));    

      }
    }


    decideWinner(){

      let dealerTotal = this.calculateHand(this.dealerHand);
      let playerTotal = this.calculateHand(this.playerHand);

      console.log('dealer shows:');
      console.log(this.dealerHand);

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
