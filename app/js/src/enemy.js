function Enemy(nthEnemy,y,size,canvas,level) {
	this.position = nthEnemy;	
	this.row = Math.floor(this.position/10);
	this.yGap = this.row*10;
	if(this.position > 9) {		
		var number = this.position;
		var secondDigit = String(number).charAt(1);
		this.position = Number(secondDigit);
	}
	this.size = size;
	this.x = Math.round((canvas.width / 2) - 300) + ((this.size + 10) * this.position);
	this.y = 0 - ((this.size*(this.row+1)) + this.yGap);
	this.velocity = 1/level;
}


module.exports = Enemy;