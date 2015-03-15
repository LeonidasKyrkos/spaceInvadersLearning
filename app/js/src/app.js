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
	    this.minVelocity = 15;
	    this.maxVelocity = 30;
	    this.stars = 100;
	    Starfield.prototype.init = starfieldInit(this,div);
	    Starfield.prototype.start = starfieldStart(this);
	    Starfield.prototype.draw = starfieldDraw(this);
	}



	function starfieldInit(el,container) {
	    var self = el;
	 
	    //  Store the div.
	    el.containerDiv = container;
	    self.width = window.innerWidth;
	    self.height = window.innerHeight;
	 
	    //  Create the canvas.
	    var canvas = document.createElement('canvas');
	    container.append(canvas);
	    el.canvas = canvas;
	    el.canvas.width = el.width;
	    el.canvas.height = el.height;

	    window.onresize = debounce(function(){ calcSize(self) }, 200);
	}

	function starfieldStart(el) {
		var stars = [];
		for(var i = 0; i < el.stars; i++) {
			stars[i] = new Star(Math.random()*el.width, Math.random()*el.height, Math.random()*3+1,(Math.random()*(el.maxVelocity - el.minVelocity))+el.minVelocity);
		}
		el.stars = stars;
	}

	function Star(x, y, size, velocity) {
	    this.x = x;
	    this.y = y; 
	    this.size = size;
	    this.velocity = velocity;
	}

	function starfieldDraw(el) {
		var ctx = el.canvas.getContext('2d');

		ctx.fillStyle = ('#000000');
		ctx.fillRect(0, 0, el.width, el.height);

		ctx.fillStyle = ('#FFFFFF');
		for(var i = 0; i < el.stars.length; i++) {
	        var star = el.stars[i];
	        ctx.fillRect(star.x, star.y, star.size, star.size);
	    }
	}
	

	function calcSize(self) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw;
	}

	var starfield = new Starfield();
}());