// class for bonus
class bonus {
	constructor(x, y, type) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.angle = Math.floor(Math.random() * 360);
	}
	drawBonus() {
		ctx.save();
		ctx.translate(this.x + mapShiftX, this.y + mapShiftY);
		ctx.rotate(this.angle * Math.PI / 180);
		if (this.type == 1) { ctx.drawImage(bonus1Image, -bonus1Image.width/2, -bonus1Image.height/2); }
		else if (this.type == 2) { ctx.drawImage(bonus2Image, -bonus2Image.width/2, -bonus2Image.height/2); }
		else if (this.type == 3) { ctx.drawImage(bonus3Image, -bonus3Image.width/2, -bonus3Image.height/2); }
		else if (this.type == 4) { ctx.drawImage(bonus4Image, -bonus4Image.width/2, -bonus4Image.height/2); }
		else if (this.type == 5) { ctx.drawImage(bonus5Image, -bonus5Image.width/2, -bonus5Image.height/2); }
		ctx.restore();
		this.angle += 1.5;
	}
}


// collision checking for bonuses
function checkBonusCollisions() {
	// for all bonuses
	for(var i = bonusList.length - 1; i >= 0; i--) {
		// for all of my ship's collision points
		for (var n = 0; n < collisionPoints.length; n++) {
			var deg = angle*Math.PI / 180;
			var shiftX = collisionPoints[n][0];
			var shiftY = collisionPoints[n][1];
			var circlePointX = 400 + Math.cos(deg)*shiftX - Math.sin(deg)*shiftY;
			var circlePointY = 300 + Math.sin(deg)*shiftX + Math.cos(deg)*shiftY;
			
			var dx = bonusList[i].x + mapShiftX - circlePointX;
			var dy = bonusList[i].y + mapShiftY - circlePointY;
			var distance = Math.sqrt(dx * dx + dy * dy);
			
			// if collision detected
			if (distance < 11 + 10) {
				if (bonusList[i].type == 1) {
					explosionList.push(new explosion(bonusList[i].x, bonusList[i].y, 20, 0, 4));
					ammo += 100;
					if (ammo > 100) { ammo = 100; }
				}
				if (bonusList[i].type == 2) {
					explosionList.push(new explosion(bonusList[i].x, bonusList[i].y, 20, 0, 5));
					shields += 100;
					if (shields > 100) { shields = 100; }
				}
				if (bonusList[i].type == 3) {
					explosionList.push(new explosion(bonusList[i].x, bonusList[i].y, 20, 0, 6));
					fuel += 100;
					if (fuel > 100) { fuel = 100; }
				}
				if (bonusList[i].type == 4) {
					explosionList.push(new explosion(bonusList[i].x, bonusList[i].y, 20, 0, 7));
					FTLFuel += 100;
					if (FTLFuel > 100) { FTLFuel = 100; }
				}
				if (bonusList[i].type == 5) {
					explosionList.push(new explosion(bonusList[i].x, bonusList[i].y, 20, 0, 8));
					time += 10000;
				}
				
				// remove bonus
				bonusList.splice(i, 1);
				// add bonus sound
				if (soundSettings == 1) { soundList.push(new sound('sound/bonus.wav', 30, 1)); }
				
			}
		}
		
	}
}