class Audio {

    constructor(){
        
       this.queue = [];
    }


    say(message) {
		
	    var speech = new SpeechSynthesisUtterance();

	    // Set the text and voice attributes.
	    speech.text = message;
	    speech.volume = 1;
	    speech.rate = 1;
	    speech.pitch = 1;

	    this.synth = window.speechSynthesis.speak(speech);
	}


	sayDelayed(message, delay){
		
		let timer = window.setTimeout(()=>{
			this.say(message);
		}, delay);

		this.queue.push(timer)
	}

	cancelAll(){
		
		for(let i = 0; i < this.queue.length; i++){
			window.clearTimeout(this.queue[i]);
		}
		if(this.synth){
			this.synth.cancel();	
		}


	}

 }