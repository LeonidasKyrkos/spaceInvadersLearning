function Enemy(nthEnemy,y,size,canvas,level) {
	this.position = nthEnemy;
	if(this.position > 9) {		
		var number = this.position;
		var secondDigit = String(number).charAt(1);
		this.position = Number(secondDigit);
	}
	this.size = size;
	this.x = Math.round((canvas.width / 2) - 300) + ((this.size + 10) * this.position);
	if(nthEnemy < 10) {
		this.y = 0 - this.size;
	}
	if(nthEnemy >= 10 && nthEnemy < 20) {
		this.y = 0 - ((this.size*2) + 10);
	}
	if(nthEnemy >= 20 && nthEnemy < 30) {
		this.y = 0 - ((this.size*3) + 20);
	}
	this.velocity = 1/level
	console.log(this.velocity);
}


module.exports = Enemy;