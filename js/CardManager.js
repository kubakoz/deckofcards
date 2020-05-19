

class CardManager{

  constructor(){


  }

  addStack(fromStack, toStack) {

    toStack.cards.push(...fromStack.cards);
    fromStack.cards.splice(0);
    
  }

  shuffle(stack, times) {

    if (!times) {
      times = 1
    }

    while (times-- > 0) {

      for (let i = 0; i < stack.cards.length; i++) {

        let randomNumber = Math.floor(Math.random() * stack.cards.length);
        let placeholder = stack.cards[i];

        stack.cards[i] = stack.cards[randomNumber];
        stack.cards[randomNumber] = placeholder;

      }

    }

  }

  addCard(stack, card) {
    stack.cards.push(card); 
    return card;   
  }

  removeCard(stack, card) {
    return stack.cards.pop();
    
  }

  giveCard(fromStack, toStack) {

    let card = fromStack.cards.pop()
    toStack.cards.push(card);

    return card;

  }
  
  giveSpecificCard(fromStack, toStack, card){
  
    const index = fromStack.cards.indexOf(card);
    
    if (index > -1) {

      fromStack.cards.splice(index, 1);
      toStack.cards.push(card);

    }

    return card;
      
  }
  
  giveCardByType(fromStack, toStack, rank, suit, all){  	
      
    for(let i = 0; i < fromStack.cards.length; i++){
      
      if(fromStack.cards[i].suit == suit && fromStack.cards[i].rank == rank){      		
            
        fromStack.giveSpecificCard(fromStack.cards[i], toStack);

        if(!all) return;

      }
      
    }
  
  }

  giveCardByPosition(fromStack, toStack, position){

    if(position>-1 && position < fromStack.cards.length){
      fromStack.giveSpecificCard(fromStack.cards[position], toStack);   
    }

  }

  giveAllCards(fromStack, toStack){

    toStack.cards.push(...fromStack.cards);
    fromStack.cards.splice(0);
    return toStack;

  }

  generateDeck(num=1) {
      console.log("generateDeck")
      var stack = new CardStack();
      let id = 1;
      while(num-- > 0){
        for (let suit in SUITS) {
          for (let rank in RANKS) {

            this.addCard(stack, new Card(SUITS[suit], RANKS[rank], 'Card_' + id++));

          }
        }  
      }
      
      console.log(stack);

      return stack;
    }

}