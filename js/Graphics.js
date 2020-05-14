
class Graphics{


	constructor(){

		this.positions = {};
		this.animationQueue = [];

		window.setInterval(()=>{

			if(this.animationQueue.length > 0){

				let animation = this.animationQueue.shift();
				let elm = document.getElementById(animation.card.id);
				let newPosition = animation.position;

				elm.style.top = (newPosition.y + animation.offsetY) + 'px';
				elm.style.left = (newPosition.x + animation.offsetX) + 'px';

			}


		}, 300);

	}

	createDomCard(card){

		let rankLabel = card.rank.label;
		let suitLabel = card.suit.label;
		let rankIcon = card.rank.icon;
		let wrapper = this.createElementFromHTML('<div class="card" id="' + card.id + '"><div class="suit top">' + suitLabel + '</div><div class="rank top">'+rankLabel+'</div><div class="rank center">'+rankIcon+'</div><div class="suit bottom">'+suitLabel+'</div></div>');
		return wrapper.firstElementChild;
	}


	spawnCard(card, position){
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

	createElementFromHTML(htmlString) {

		var div = document.createElement('div');
		div.innerHTML = htmlString.trim();
  		// Change this to div.childNodes to support multiple top-level nodes
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

	}

	moveCard(card, position, offsetX=0, offsetY=0 ){

		let elm = document.getElementById(card.id);
		let newPosition = position;

		elm.style.top = (newPosition.y + offsetY) + 'px';
		elm.style.left = (newPosition.x + offsetX) + 'px';
	}

	spawnAndQueueMoveCard(card, position, offsetX=0, offsetY=0){
		this.spawnCard(card, position);
		this.queueMoveCard(card, position, offsetX, offsetY);
	}

	faceCardDown(card){
		let elm = document.getElementById(card.id);
		elm.classList.add('down');
	}

	faceCardUp(card){
		let elm = document.getElementById(card.id);
		elm.classList.remove('down');	
	}
}