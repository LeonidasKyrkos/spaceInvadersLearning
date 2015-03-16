'use strict';

//var $ = require('jquery');
//window.$ = $;
var debounce = require('debounce');
var Star = require('./star');


// star bullshit //

function Starfield(div) {
    this.fps = 60;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.minVelocity = 55;
    this.maxVelocity = 200;
    this.stars = 300;
    this.div = div;
    this.init();

    //calc number of stars based on area//
}

Starfield.prototype.init = function() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;		 
    
    var canvas = document.createElement('canvas');	    
    this.div.appendChild(canvas);

    console.log(this.div);

	this.canvas = canvas;
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    window.onresize = debounce(this.calcSize.bind(this), 200);

    this.start();
};

Starfield.prototype.start = function() {
	var stars = [];
	for(var i = 0; i < this.stars; i++) {
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		// write function for creation of stars //
	}
	this.stars = stars;
	this.interval();
};

Starfield.prototype.draw = function() {
	var ctx = this.canvas.getContext('2d');

	ctx.fillStyle = ('#000000');
	ctx.fillRect(0, 0, this.width, this.height);

	ctx.fillStyle = ('#FFFFFF');
	for(var i = 0; i < this.stars.length; i++) {
        var star = this.stars[i];
        ctx.fillRect(star.x, star.y, star.size, star.size);
    }
};

Starfield.prototype.update = function() {
	var dt = 1 / this.fps;
	for(var i = 0; i < this.stars.length; i++) {
		var star = this.stars[i];
		star.y += dt * star.velocity;

		if(star.y > this.height) {
			this.stars[i] = new Star(Math.random()*this.width, 0, Math.random()*3+1,(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
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
	this.draw();
}

var container = document.getElementById('starfield');
var starfield = new Starfield(container);