// class for enemy
class enemy {
	constructor(x, y, angle) {
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.shields = 100;
		this.fireAllowed = 0;
		this.whichGun = 1;
	}
	drawEnemy() {
		ctx.save();
		
		ctx.translate(this.x + mapShiftX, this.y + mapShiftY);
		ctx.rotate(this.angle * Math.PI / 180);
		ctx.drawImage(enemyImage, -enemyImage.width/2, -enemyImage.height/2);
		ctx.restore();
	}
	
	// calculate distance from enemy to my ship
	calculateDistance() {
		var x1 = this.x + mapShiftX;
		var x2 = 400;
		var y1 = this.y + mapShiftY;
		var y2 = 300;
		var distance = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
		
		return distance;
	}
	
	// rotate enemy ship to face my ship
	rotateEnemy() {
		var distance = this.calculateDistance();
		if (distance < 500) {
			var x1 = this.x + mapShiftX;
			var x2 = 400;
			var y1 = this.y + mapShiftY;
			var y2 = 300;
			var angleToMe = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI - 90;
		  
			if (this.angle > angleToMe.toFixed(0)) {
				this.angle -= 1.5;
				if (this.angle.toFixed(0) - angleToMe.toFixed(0) >= 180) { this.angle -= 360; }
			}
			else if (this.angle < angleToMe.toFixed(0)) {
				this.angle += 1.5;
				if (this.angle.toFixed(0) - angleToMe.toFixed(0) <= -180) { this.angle += 360; }
			}
		}
	}
	
	// fire bullets
	fire() {
		var distance = this.calculateDistance();
			
		if (distance < 400) {
			if (this.fireAllowed == 0) {
				if (this.whichGun == 1) {
					var deg = this.angle * Math.PI / 180;
					enemyBulletList.push(new bullet(this.x - 28 * Math.sin(deg) + 7 * Math.cos(deg) + mapShiftX, this.y + 28 * Math.cos(deg) + 7 * Math.sin(deg) + mapShiftY, this.angle+180, "#fc0"));
					this.whichGun = 2;
				}
				else {
					var deg = this.angle * Math.PI / 180;
					enemyBulletList.push(new bullet(this.x - 28 * Math.sin(deg) - 7 * Math.cos(deg) + mapShiftX, this.y + 28 * Math.cos(deg) - 7 * Math.sin(deg) + mapShiftY, this.angle+180, "#fc0"));
					this.whichGun = 1;
				}
				// sound of bullet fired
				var volume = 1 / (distance/100);
				if (soundSettings == 1) { soundList.push(new sound('sound/enemyLaser.wav', 30, volume)); }
				this.fireAllowed++;
			}
			else {
				this.fireAllowed++;
				if (this.fireAllowed == 10) {this.fireAllowed = 0; }
			}
		}
	}
}


function checkEnemyCollisions() {
	// for all enemies
	for(var i = enemyList.length - 1; i >= 0; i--) {
		
		// for all of my bullets
		for(var n = myBulletList.length - 1; n >= 0; n--) {			
			// calculate distances
			var dx = enemyList[i].x + mapShiftX - myBulletList[n].x;
			var dy = enemyList[i].y + mapShiftY - myBulletList[n].y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			
			// if collision detected
			if (distance < 18) {
			
				// add small explosion
				explosionList.push(new explosion(myBulletList[n].x - mapShiftX, myBulletList[n].y - mapShiftY, 10, 0, 3));
				if (soundSettings == 1) { soundList.push(new sound('sound/smallExplosion.wav', 30, 1)); }
				// remove bullet
				myBulletList.splice(n, 1);	
				// weaken enemy shields
				enemyList[i].shields -= 25;
				
				// kill enemy if he has no shields
				if (enemyList[i].shields < 0) {
					// add big explosion
					explosionList.push(new explosion(enemyList[i].x - 4, enemyList[i].y - 5, 30, 3, 1));
					explosionList.push(new explosion(enemyList[i].x + 4, enemyList[i].y - 4, 30, 7, 1));
					explosionList.push(new explosion(enemyList[i].x, enemyList[i].y, 30, 0, 2));
					if (soundSettings == 1) { soundList.push(new sound('sound/bigExplosion.wav', 30, 1)); }
				
					enemyList.splice(i, 1);
				}
			}
		}
		
		// for my ship
		if (levelFailed == false) {
			for (var n = 0; n < collisionPoints.length; n++) {
				var deg = angle*Math.PI / 180;
				var shiftX = collisionPoints[n][0];
				var shiftY = collisionPoints[n][1];
				var circlePointX = 400 + Math.cos(deg)*shiftX - Math.sin(deg)*shiftY;
				var circlePointY = 300 + Math.sin(deg)*shiftX + Math.cos(deg)*shiftY;
				
				var dx = enemyList[i].x + mapShiftX - circlePointX;
				var dy = enemyList[i].y + mapShiftY - circlePointY;
				var distance = Math.sqrt(dx * dx + dy * dy);
				
				// if collision detected
				if (distance < 15 + 10) {
					// kill enemy ship
					explosionList.push(new explosion(enemyList[i].x - 4, enemyList[i].y - 5, 30, 3, 1));
					explosionList.push(new explosion(enemyList[i].x + 4, enemyList[i].y - 4, 30, 7, 1));
					explosionList.push(new explosion(enemyList[i].x, enemyList[i].y, 30, 0, 2));
					
					// remove enemy from the map
					enemyList.splice(i, 1);
					
					// kill my ship
					shields = 0;
					explosionList.push(new explosion(396 - mapShiftX, 295 - mapShiftY, 30, 3, 1));
					explosionList.push(new explosion(404 - mapShiftX, 296 - mapShiftY, 30, 7, 1));
					explosionList.push(new explosion(400 - mapShiftX, 300 - mapShiftY, 30, 0, 2));
				}
			}		
		}
	}
}