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
}

Level.prototype.enemyHandler = function() {
	for(var i = 0; i < this.enemyN; i++) {
		this.enemies[i] = new Enemy(i,this.yPosition,0.1,this.canvas,this.currentLevel);
	}
	this.interval();
}

Level.prototype.draw = function() {
	var ctx = this.canvas.getContext('2d');	
	ctx.fillStyle = ('#FFFFFF');
	for(var i = 0; i < this.enemies.length; i++) {
        var enemy = this.enemies[i];
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    }
    if(this.enemies.length < 1) {
    	this.currentLevel += 1;
    	this.init();
    }
}

Level.prototype.update = function() {
	for(var i = 0; i < this.enemies.length; i++) {
		var enemy = this.enemies[i];
		enemy.y += enemy.velocity;
	}
}

Level.prototype.collisionHandler = function() {
	for(var i = 0; i < this.enemies.length; i++) {
		for(var j = 0; j < this.ship.bullets.length; j++) {
			var enemy = this.enemies[i];
			var bullet = this.ship.bullets[j];
			if(bullet.x >= enemy.x && bullet.x <= enemy.x + enemy.size && bullet.y <= enemy.y + enemy.size) {
				this.ship.bullets.splice(j,1);
				this.enemies.splice(i,1);
			}
		}
	}
}

Level.prototype.interval = function() {
	this.draw();
	this.update();	
	this.collisionHandler();
	window.requestAnimationFrame(this.interval.bind(this));
}

module.exports = Level;