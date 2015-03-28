// shared stuff //



function resize() {
	switch(this.name) {

		case 'Starfield':
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			for(var i = 0; i < this.stars.length; i++) {
				this.stars[i] = this.starHandler(this.stars[i]);
			}
			this.draw();
			break;


		case 'Starship': 
			this.offset = Math.round((this.currentPosition / this.width) * 100) / 100;
			this.width = this.canvas.width;
			this.currentPosition = (Math.round((this.width * this.offset) * 100) / 100);
			break;


		default: return;
	}
}





module.exports = resize;