// Starship bullshit //

function Starship() {
	this.width = 75;
	this.height = 150;
	this.shipDecal = '/img/optimised/f5s4.png';
	
	this.init();
}

Starship.prototype.init = function() {
	var canvas = document.getElementById('canvas');
	this.canvas = canvas;
	this.currentPosition = (this.canvas.width / 2) - (this.width/2);
	this.yPosition = this.canvas.height - this.height - 50;
	this.draw();
	this.interval();
	this.speed = 10;
	this.leftCount = 0;
	this.rightCount = 0;
	document.onkeydown = this.keydownHandler.bind(this);
}

Starship.prototype.draw = function() {
	var ctx = this.canvas.getContext('2d');

	var ship = new Image();
	ship.src = this.shipDecal;
	ship.scope = this;
	ship.onload = function() {
		var _this = ship.scope;
		ctx.drawImage(ship,_this.currentPosition,_this.yPosition,_this.width,_this.height);
	};
}

Starship.prototype.keydownHandler = function(e) {
	e = e || window.event;
	switch(e.which || e.keycode) {
		case 37:
			if(this.leftCount === 0) {
				this.leftCount += 1;
				this.rightCount = 0;
				this.goLeft();				
			}			
			break;
		case 39:
			if(this.rightCount === 0) {
				this.rightCount += 1;
				this.leftCount = 0;
				this.goRight();				
			}
			break;

		default: return;
	}
}

Starship.prototype.goLeft = function() {
	if(this.leftCount > 0) {
		this.currentPosition -= 10;
		window.requestAnimationFrame(this.goLeft.bind(this));
		document.onkeyup = this.resetCount.bind(this);
	}	
}

Starship.prototype.goRight = function() {
	if(this.rightCount > 0) {
		this.currentPosition += 10;
		window.requestAnimationFrame(this.goRight.bind(this));
		document.onkeyup = this.resetCount.bind(this);
	}	
}

Starship.prototype.resetCount = function(e) {
	if(e.which === 37 || e.keycode === 37) {
		this.leftCount = 0;
		return;
	}
	if(e.which === 39 || e.keycode === 39) {
		this.rightCount = 0;
		return;
	}
	
}

Starship.prototype.interval = function() {
	this.draw();
	window.requestAnimationFrame(this.interval.bind(this));
}





module.exports = Starship;