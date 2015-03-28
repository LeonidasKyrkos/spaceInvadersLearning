var debounce = require('debounce');
var Star = require('./star');

// star bullshit //

function Starfield(div) {
    this.fps = 60;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.minVelocity = 100;
    this.maxVelocity = 275;
    this.stars = 300;
    this.div = div;
    this.init();

    //calc number of stars based on area//
}

Starfield.prototype.init = function() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;		 
    
    var canvas = document.getElementById('canvas'); 

	this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    window.onresize = debounce(this.calcSize.bind(this), 200);

    this.start();
};

Starfield.prototype.start = function() {
	var stars = [];
	for(var i = 0; i < this.stars; i++) {
		stars[i] = this.starHandler(stars[i]);
	}
	this.stars = stars;
	this.interval();
};

Starfield.prototype.starHandler = function(currentStar,starStatus) {
	var startPoint;
	if(starStatus === 'died') {
		startPoint = 0;
	} else {
		startPoint = Math.random()*this.height;
	}	
	currentStar = new Star(Math.random()*this.width, startPoint, Math.random()*2+1,(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	return currentStar;
}

Starfield.prototype.draw = function() {
	var ctx = this.canvas.getContext('2d');

	var background = new Image();
	background.src = '/img/optimised/universe.jpg';
	background.scope = this;
	background.baseHeight = 1080;
	background.baseWidth = 1920; 
	background.width = background.baseWidth;
	background.height = background.baseHeight;
	background.onload = function() {
		ctx.drawImage(background,0,0,background.width,background.height);
		var _this = background.scope;

		ctx.fillStyle = ('#FFFFFF');
		for(var i = 0; i < _this.stars.length; i++) {
	        var star = _this.stars[i];
	        ctx.fillRect(star.x, star.y, star.size, star.size);
	    }
	};
};

Starfield.prototype.update = function() {
	var dt = 1 / this.fps;
	for(var i = 0; i < this.stars.length; i++) {
		var star = this.stars[i];
		star.y += dt * star.velocity;

		if(star.y > this.height) {
			this.stars[i] = this.starHandler(this.stars[i],'died');
		}
	}
};

Starfield.prototype.interval = function() {
	this.update();
    this.draw();
	window.requestAnimationFrame(this.interval.bind(this));
}


Starfield.prototype.calcSize = function() {
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	for(var i = 0; i < this.stars; i++) {
		stars[i] = this.starHandler(stars[i],died);
	}
	this.draw();
}

module.exports = Starfield;