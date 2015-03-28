function Enemy(nthEnemy,y,velocity,canvas,rows) {
	this.position = nthEnemy;
	if(this.position > 9) {		
		var number = this.position;
		var secondDigit = String(number).charAt(1);
		this.position = Number(secondDigit);
	}
	this.size = Math.round((canvas.width / 100) * 6);
	this.x = Math.round((canvas.width / 100) * 20) + ((this.size + 10) * this.position);
	if(nthEnemy < 10) {
		this.y = 0 - this.size;
	}
	if(nthEnemy >= 10 && nthEnemy < 20) {
		this.y = 0 - ((this.size*2) + 10);
	}
	if(nthEnemy >= 20 && nthEnemy < 30) {
		this.y = 0 - ((this.size*3) + 20);
	}
	this.velocity = velocity;
}


module.exports = Enemy;