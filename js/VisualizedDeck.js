
class VisualizedDeck{


       constructor(){


        this.gfx = new Graphics();
        this.dealer = new CardManager();
        this.cardPiles = {};


    }

    createDomCard(card){

        let rankLabel = card.rank.label;
        let suitLabel = card.suit.label;
        let rankIcon = card.rank.icon;
        let wrapper = this.gfx.createElementFromHTML('<div class="card" id="' + card.id + '"><div class="suit top">' + suitLabel + '</div><div class="rank top">'+rankLabel+'</div><div class="rank center">'+rankIcon+'</div><div class="suit bottom">'+suitLabel+'</div></div>');
        return wrapper.firstElementChild;
    }


    spawnCard(card, position){

        if(document.getElementById(card.id)){
            return;
        }

        let elm = this.createDomCard(card);

        if(card.suit.color == 'red'){
            elm.classList.add("red");
        }

        if(position){
            elm.style.top = position.y + 'px';
            elm.style.left = position.x + 'px';
        }

        document.body.appendChild(elm);
    }


    createPosition(x, y, name){

        return this.gfx.createPosition(x, y, name);
        

    }

    getPosition(name){
        return this.gfx.positions[name];
    }

    createPile(x, y, name, stack){

        let pile = {
            name: name,
            position: this.createPosition(x, y, name),
            stack: stack || new CardStack(),
            offsetX: 100,
            offsetY: 4
        }

        pile.cards = pile.stack.cards;

        this.cardPiles[name] = pile;
        return pile;

    }

    queueMoveCard(card, position, offsetX=0, offsetY=0){

        return this.gfx.queueMoveCard(card, position, offsetX, offsetY)

    }

    moveCard(card, position, offsetX=0, offsetY=0 ){

        //first remove card from animation queue to stop queued animations from occuring for this card
        this.gfx.moveCard(card, position, offsetX, offsetY)
    }

    setZIndex(card, zindex){

        return this.gfx.setZIndex(card, zindex);
    }


    faceCardDown(card){
        let elm = document.getElementById(card.id);
        elm.classList.add('down');
        return card;
    }

    faceCardUp(card){
        let elm = document.getElementById(card.id);
        elm.classList.remove('down');   
        return card;
    }

    giveCard(fromStack, toStack){
        return this.dealer.giveCard(fromStack, toStack);
    }

    giveCardP(fromPile, toPile, face='up'){

        let offsetX = toPile.offsetX * toPile.stack.cards.length-1;
        let offsetY = toPile.offsetY * toPile.stack.cards.length-1;
        let card = this.dealer.giveCard(fromPile.stack, toPile.stack);

        this.spawnCard(card, fromPile.position);
        this.gfx.queueMoveCard(card, toPile.position, offsetX, offsetY);
        this.gfx.setZIndex(card, toPile.stack.cards.length);

        (face=='up') ? this.faceCardUp(card) : this.faceCardDown(card);

        return card;
    }

    giveAllCards(fromStack, toStack, face='up', queue=true){
        return this.dealer.giveAllCards(fromStack, toStack);

    }

    giveAllCardsP(fromPile, toPile, face='down', queue=true){

        for(let i = 0; i < fromPile.cards.length; i++){
            this.gfx.queueMoveCard(fromPile.stack.cards[i], toPile.position);        
        }

        return this.dealer.giveAllCards(fromPile.stack, toPile.stack);
    }


    generateDeck(num=1) {
      return this.dealer.generateDeck(num);
    }
}