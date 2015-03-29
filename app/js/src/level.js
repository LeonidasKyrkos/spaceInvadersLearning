var Enemy = require('./enemy');

function Level(level,ship) {
	this.currentLevel = level;	
	this.ship = ship;

	this.init();
}

Level.prototype.init = function() {
	var canvas = document.getElementById('canvas');
	this.canvas = canvas;
	this.enemies = [];
	this.enemyN = this.currentLevel * 10;
	this.enemyHandler();
	this.lost = false;
	this.lostBoxWidth = 300;
	this.lostBoxHeight = 150;
}

Level.prototype.enemyHandler = function() {
	for(var i = 0; i < this.enemyN; i++) {
		this.enemies[i] = new Enemy(i,this.yPosition,50,this.canvas,this.currentLevel);
	}
	this.interval();
}

Level.prototype.draw = function() {
	var ctx = this.canvas.getContext('2d');	
	ctx.fillStyle = ('#FFFFFF');
	for(var i = 0; i < this.enemies.length; i++) {
        var enemy = this.enemies[i];
        var enemyImg = new Image();
        enemyImg.src = '/img/optimised/me.png';
        ctx.drawImage(enemyImg,enemy.x,enemy.y,enemy.size,enemy.size);
    }
    if(this.enemies.length < 1) {
    	this.currentLevel += 1;
    	this.ship.bullets.splice(1,this.ship.bullets.length);
    	this.init();
    }
    if(this.lost) {
    	ctx.fillStyle = ('red');
    	ctx.fillRect(this.canvas.width/2 - this.lostBoxWidth/2,this.canvas.height/2 - this.lostBoxHeight/2, this.lostBoxWidth,this.lostBoxHeight);
    	ctx.fillStyle = ('black');
    	ctx.font = '70px Arial';
    	ctx.fillText('You lose',this.canvas.width/2 - this.lostBoxWidth/2 + 15,this.canvas.height/2 + 20)
    }
}

Level.prototype.update = function() {
	for(var i = 0; i < this.enemies.length; i++) {
		var enemy = this.enemies[i];
		for(var j = 0; j < this.ship.bullets.length; j++) {
			var bullet = this.ship.bullets[j];
			if(bullet.x >= enemy.x && bullet.x <= enemy.x + enemy.size && bullet.y <= enemy.y + enemy.size) {
				this.enemies.splice(i,1);
				this.ship.bullets.splice(j,1);
				if(i === this.enemies.length) {					
					i--;
				}
			}
		}
		if(enemy.y + enemy.size >= this.canvas.height || enemy.y >= this.ship.yPosition - enemy.size && enemy.x >= this.ship.currentPosition && enemy.x <= this.ship.currentPosition + this.ship.lengthX) {
			this.lost = true;
		} else {
			enemy.y += enemy.velocity;
		}				
	}
	for(var k = 0; k < this.ship.bullets.length; k++) {
		var bullet = this.ship.bullets[k];
		if (bullet.y < 0) {
			this.ship.bullets.splice(j,1);
		}
	}
}

Level.prototype.interval = function() {
	if(!this.lost) {
		this.draw();
		this.update();	
		window.requestAnimationFrame(this.interval.bind(this));
	} else {
		this.draw();
		console.log('bellend!');
		window.requestAnimationFrame(this.interval.bind(this));
	}
	
}

module.exports = Level;