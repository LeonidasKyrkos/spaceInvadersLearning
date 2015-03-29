// Starship bullshit //

var debounce = require('debounce');
var resize = require('./resize');
var Bullet = require('./bullet');

function Starship(starfield) {
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.lengthX = 76;
	this.lengthY = 150;
	this.speed = 15;
	this.shipDecal = '/img/optimised/f5s4.png';
	this.name = 'Starship';
	this.init();
}

Starship.prototype.init = function() {
	var canvas = document.getElementById('canvas');
	this.canvas = canvas;
	this.currentPosition = Math.round((this.canvas.width / 2) - (this.lengthX/2));
	this.yPosition = this.canvas.height - this.lengthY - 50;		
	this.leftCount = 0;
	this.rightCount = 0;
	this.bullets = [];
	this.bulletN = 0;
	window.addEventListener("resize",  debounce(resize.bind(this), 200));
	document.onkeydown = this.keydownHandler.bind(this);	

	this.draw();
	this.interval();
}

Starship.prototype.draw = function() {
	var ctx = this.canvas.getContext('2d');
	var ship = new Image();
	ship.src = this.shipDecal;
	ship.scope = this;
	ship.onload = function() {
		var _this = ship.scope;
		ctx.drawImage(ship,_this.currentPosition,_this.yPosition,_this.lengthX,_this.lengthY);

		ctx.fillStyle = ('#00F731');
		for(var i = 0; i < _this.bullets.length; i++) {
	        var bullet = _this.bullets[i];
	        ctx.beginPath();
	        ctx.arc(bullet.x, bullet.y, bullet.size, 2 * Math.PI, false);
	        ctx.fill();
	    }
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
		case 32:
			this.bulletHandler();
			break;

		default: return;
	}
}

Starship.prototype.goLeft = function() {
	if(this.leftCount > 0 && this.currentPosition > 0) {
		this.currentPosition -= this.speed;
		document.onkeyup = this.resetCount.bind(this);
		window.requestAnimationFrame(this.goLeft.bind(this));		
	}	
}

Starship.prototype.goRight = function() {
	if(this.rightCount > 0 && this.currentPosition < this.width - this.lengthX) {
		this.currentPosition += this.speed;
		document.onkeyup = this.resetCount.bind(this);
		window.requestAnimationFrame(this.goRight.bind(this));		
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

Starship.prototype.bulletHandler = function() {
	var ctx = this.canvas.getContext('2d');
	this.bullets.push(new Bullet((this.currentPosition + this.lengthX/2),this.yPosition));
}

Starship.prototype.update = function() {
	for(var i = 0; i < this.bullets.length; i++) {
		var bullet = this.bullets[i];
		bullet.y -= bullet.velocity;
	}
}

Starship.prototype.interval = function() {
	if(this.bullets.length) {
		this.update();
	}	
	this.draw();
	window.requestAnimationFrame(this.interval.bind(this));
}

module.exports = Starship;