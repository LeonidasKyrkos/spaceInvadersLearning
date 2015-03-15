'use strict';

var $ = require('jquery');
var debounce = require('debounce');
window.$ = $;

(function(){

	// star bullshit //

	function Starfield() {
		var div = $('#starfield');
	    this.fps = 30;
	    this.canvas = null;
	    this.width = 0;
	    this.height = 0;
	    this.minVelocity = 55;
	    this.maxVelocity = 300;
	    this.stars = 300;
	    this.intervalID = starfieldInterval(this);
	}

	Starfield.prototype.init = function(div) {
    	var self = this;
	    self.containerDiv = div;

	    self.width = window.innerWidth;
	    self.height = window.innerHeight;		 
	    
	    var canvas = document.createElement('canvas');
	    div.append(canvas);
	    this.canvas = canvas;
	    this.canvas.width = this.width;
	    this.canvas.height = this.height;

	    window.onresize = debounce(function(){ calcSize(self) }, 200);
    };

	Starfield.prototype.start = function() {
		var stars = [];
		for(var i = 0; i < this.stars; i++) {
			stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}
		this.stars = stars;
	};

	function Star(x, y, size, velocity) {
	    this.x = x;
	    this.y = y; 
	    this.size = size;
	    this.velocity = velocity;
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
				this.stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
			}
		}
	};

	function starfieldInterval(el) {
		setInterval(function() {
	        el.update(el);
	        el.draw(el);	
	    }, 1000 / el.fps, el);
	}
	

	function calcSize(self) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
	}

	var $container = $('#starfield');
	var starfield = new Starfield();
	starfield.init($container);
	starfield.start();
}());