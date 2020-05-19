
class Graphics{


    constructor(){

        console.log('Graphics')
        this.positions = {};
        this.animationQueue = [];
        this.clockspeed = 222;


        window.setInterval(()=>{

            if(this.animationQueue.length > 0){

                if(this.pause) return;

                let animation = this.animationQueue.shift();
                let elm = document.getElementById(animation.card.id);
                let newPosition = animation.position;

                elm.style.top = (newPosition.y + animation.offsetY) + 'px';
                elm.style.left = (newPosition.x + animation.offsetX) + 'px';

            }


        }, this.clockspeed);

    }

    // createDomCard(card){

    //     let rankLabel = card.rank.label;
    //     let suitLabel = card.suit.label;
    //     let rankIcon = card.rank.icon;
    //     let wrapper = this.createElementFromHTML('<div class="card" id="' + card.id + '"><div class="suit top">' + suitLabel + '</div><div class="rank top">'+rankLabel+'</div><div class="rank center">'+rankIcon+'</div><div class="suit bottom">'+suitLabel+'</div></div>');
    //     return wrapper.firstElementChild;
    // }


    // spawnCard(card, position){

    //     if(document.getElementById(card.id)){
    //         return;
    //     }

    //     let elm = this.createDomCard(card);

    //     if(card.suit.color == 'red'){
    //         elm.classList.add("red");
    //     }

    //     if(position){
    //         elm.style.top = position.y + 'px';
    //         elm.style.left = position.x + 'px';
    //     }

    //     document.body.appendChild(elm);
    // }

    createElementFromHTML(htmlString) {

        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();        
        return div; 
    }

    createPosition(x, y, name){

        this.positions[name] = {x: x, y: y};

        return this.positions[name];

    }

    queueMoveCard(card, position, offsetX=0, offsetY=0){

        this.animationQueue.push({
            card: card,
            position:position,
            offsetX: offsetX,
            offsetY: offsetY
        });
        return card;

    }

    moveCard(card, position, offsetX=0, offsetY=0 ){

        //first remove card from animation queue to stop queued animations from occuring for this card
        this.pause = true;
        for(let i = 0; i < this.animationQueue.length; i++){
            if(this.animationQueue[i].card.id == card.id){
                 this.animationQueue.splice(i, 1);
            }
        }


        let elm = document.getElementById(card.id);
        let newPosition = position;

        elm.style.top = (newPosition.y + offsetY) + 'px';
        elm.style.left = (newPosition.x + offsetX) + 'px';
        this.pause = false;
    }

    setZIndex(card, zindex){

        let elm = document.getElementById(card.id);
        elm.style.zIndex = zindex;
        return card;
    }


    spawnAndQueueMoveCard(card, position, offsetX=0, offsetY=0){
        this.spawnCard(card, position);
        this.queueMoveCard(card, position, offsetX, offsetY);
        return card;
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
}