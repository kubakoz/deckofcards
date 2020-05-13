class CardStack {

  constructor() {

    this.cards = [];
  }

  addStack(cardStack) {
    this.cards = this.cards.concat(cardStack.cards);
    cardStack.cards = [];
    return this;
  }

  shuffle(times) {

    if (!times) {
      times = 1
    }

    while (times-- > 0) {

      for (let i = 0; i < this.cards.length; i++) {

        let randomNumber = Math.floor(Math.random() * this.cards.length);
        let placeholder = this.cards[i];

        this.cards[i] = this.cards[randomNumber];
        this.cards[randomNumber] = placeholder;

      }

    }

  }

  addCard(card) {
    this.cards.push(card);
    return this;
  }

  removeCard(card) {
    return this.cards.pop();
    
  }

  giveCard(toStack) {

    toStack.cards.push(this.cards.pop());
    return this;

  }
  
  giveSpecificCard(card, toStack){
  
    const index = this.cards.indexOf(card);
    
    if (index > -1) {
      this.cards.splice(index, 1);
    }
    
    toStack.cards.push(card);
  }
  
  giveCardByType(rank, suit, toStack, all){  	
      
    for(let i = 0; i < this.cards.length; i++){
      
      if(this.cards[i].suit == suit && this.cards[i].rank == rank){      		
            
          this.giveSpecificCard(this.cards[i], toStack);         
          if(!all) return;
      }
      
    }
  
  }

  giveCardByPosition(position, toStack){

    if(position>-1 && position < this.cards.length){
      this.giveSpecificCard(this.cards[position], toStack);   
    }

  }

  giveAllCards(toStack){
    toStack.addStack(this);
  }

}
