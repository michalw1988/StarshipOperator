var flameBack = 0;
var flameFront = 0;
var flameLeftFront = 0;
var flameLeftBack = 0;
var flameRightFront = 0;
var flameRightBack = 0;

function drawFlames() {

	// increasing flame variables
	if (keys["up"] == true && fuel > 0.5) {
		if (flameBack < 3) { flameBack++; }
	}
	if (keys["down"] == true && fuel > 0.2) {
		if (speedChangeX != 0 || speedChangeY != 0 || angleChange != 0) { // display breaking flames only if ship is moving
			if (flameBack < 3) { flameBack++; }
			if (flameFront < 3) { flameFront++; }
			if (flameLeftFront < 3) { flameLeftFront++; }
			if (flameLeftBack < 3) { flameLeftBack++; }
			if (flameRightFront < 3) { flameRightFront++; }
			if (flameRightBack < 3) { flameRightBack++; }
		}
		else { // when there's no movement, there's no need to display flames
			if (flameBack > 0) { flameBack--; }
			if (flameFront > 0) { flameFront--; }
			if (flameLeftFront > 0) { flameLeftFront--; }
			if (flameLeftBack > 0) { flameLeftBack--; }
			if (flameRightFront > 0) { flameRightFront--; }
			if (flameRightBack > 0) { flameRightBack--; }
		}
	}
	if (keys["left"] == true && fuel > 0.1) {
		if (flameLeftBack < 3) { flameLeftBack++; }
		if (flameRightFront < 3) { flameRightFront++; }
	}
	if (keys["right"] == true && fuel > 0.1) {
		if (flameLeftFront < 3) { flameLeftFront++; }
		if (flameRightBack < 3) { flameRightBack++; }
	}
	if (keys["comma"] == true && fuel > 0.25) {
		if (flameRightFront < 3) { flameRightFront++; }
		if (flameRightBack < 3) { flameRightBack++; }
	}
	if (keys["dot"] == true && fuel > 0.25) {
		if (flameLeftFront < 3) { flameLeftFront++; }
		if (flameLeftBack < 3) { flameLeftBack++; }
	}
	
	
	// decreasing flame variables
	if (keys["up"] == false && keys["down"] == false) {
		if (flameBack > 0) { flameBack--; }
	}
	if (keys["down"] == false) {
		if (flameFront > 0) { flameFront--; }
	}
	if (keys["right"] == false && keys["dot"] == false && keys["down"] == false) {
		if (flameLeftFront > 0) { flameLeftFront--; }
	}
	if (keys["left"] == false && keys["dot"] == false && keys["down"] == false) {
		if (flameLeftBack > 0) { flameLeftBack--; }
	}
	if (keys["left"] == false && keys["comma"] == false && keys["down"] == false) {
		if (flameRightFront > 0) { flameRightFront--; }
	}
	if (keys["right"] == false && keys["comma"] == false && keys["down"] == false) {
		if (flameRightBack > 0) { flameRightBack--; }
	}
	
	// displaying flames
	if (flameBack == 1) {
		ctx.save();
		ctx.translate(400 - 14*Math.cos(angle * Math.PI / 180) - 28*Math.sin(angle * Math.PI / 180), 300 - 14*Math.sin(angle * Math.PI / 180) + 28*Math.cos(angle * Math.PI / 180));
		ctx.rotate(angle * Math.PI / 180);
		ctx.drawImage(flameImage, 0, 0, 5, 8, -2, 0, 5, 8);
		ctx.restore();
		ctx.save();
		ctx.translate(400 + 14*Math.cos(angle * Math.PI / 180) - 28*Math.sin(angle * Math.PI / 180), 300 + 14*Math.sin(angle * Math.PI / 180) + 28*Math.cos(angle * Math.PI / 180));
		ctx.rotate(angle * Math.PI / 180);
		ctx.drawImage(flameImage, 0, 0, 5, 8, -2, 0, 5, 8);
		ctx.restore();
	}
	else if (flameBack == 2) {
		ctx.save();
		ctx.translate(400 - 14*Math.cos(angle * Math.PI / 180) - 28*Math.sin(angle * Math.PI / 180), 300 - 14*Math.sin(angle * Math.PI / 180) + 28*Math.cos(angle * Math.PI / 180));
		ctx.rotate(angle * Math.PI / 180);
		ctx.drawImage(flameImage, 7, 0, 5, 12, -2, 0, 5, 12);
		ctx.restore();
		ctx.save();
		ctx.translate(400 + 14*Math.cos(angle * Math.PI / 180) - 28*Math.sin(angle * Math.PI / 180), 300 + 14*Math.sin(angle * Math.PI / 180) + 28*Math.cos(angle * Math.PI / 180));
		ctx.rotate(angle * Math.PI / 180);
		ctx.drawImage(flameImage, 7, 0, 5, 12, -2, 0, 5, 12);
		ctx.restore();
	}
	else if (flameBack == 3) {
		ctx.save();
		ctx.translate(400 - 14*Math.cos(angle * Math.PI / 180) - 28*Math.sin(angle * Math.PI / 180), 300 - 14*Math.sin(angle * Math.PI / 180) + 28*Math.cos(angle * Math.PI / 180));
		ctx.rotate(angle * Math.PI / 180);
		ctx.drawImage(flameImage, 14, 0, 7, 15, -3, 0, 7, 15);
		ctx.restore();
		ctx.save();
		ctx.translate(400 + 14*Math.cos(angle * Math.PI / 180) - 28*Math.sin(angle * Math.PI / 180), 300 + 14*Math.sin(angle * Math.PI / 180) + 28*Math.cos(angle * Math.PI / 180));
		ctx.rotate(angle * Math.PI / 180);
		ctx.drawImage(flameImage, 14, 0, 7, 15, -3, 0, 7, 15);
		ctx.restore();
	}
	
	
	if (flameFront == 1) {
		ctx.save();
		ctx.translate(400 - 13*Math.cos(angle * Math.PI / 180) - 10*Math.sin(angle * Math.PI / 180), 300 - 13*Math.sin(angle * Math.PI / 180) + 10*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 180) * Math.PI / 180);
		ctx.drawImage(flameImage, 0, 0, 5, 8, -2, 0, 5, 8);
		ctx.restore();
		ctx.save();
		ctx.translate(400 + 15*Math.cos(angle * Math.PI / 180) - 10*Math.sin(angle * Math.PI / 180), 300 + 15*Math.sin(angle * Math.PI / 180) + 10*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 180) * Math.PI / 180);
		ctx.drawImage(flameImage, 0, 0, 5, 8, -2, 0, 5, 8);
		ctx.restore();
	}
	else if (flameFront == 2) {
		ctx.save();
		ctx.translate(400 - 13*Math.cos(angle * Math.PI / 180) - 10*Math.sin(angle * Math.PI / 180), 300 - 13*Math.sin(angle * Math.PI / 180) + 10*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 180) * Math.PI / 180);
		ctx.drawImage(flameImage, 7, 0, 5, 12, -2, 0, 5, 12);
		ctx.restore();
		ctx.save();
		ctx.translate(400 + 15*Math.cos(angle * Math.PI / 180) - 10*Math.sin(angle * Math.PI / 180), 300 + 15*Math.sin(angle * Math.PI / 180) + 10*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 180) * Math.PI / 180);
		ctx.drawImage(flameImage, 7, 0, 5, 12, -2, 0, 5, 12);
		ctx.restore();
	}
	else if (flameFront == 3) {
		ctx.save();
		ctx.translate(400 - 13*Math.cos(angle * Math.PI / 180) - 10*Math.sin(angle * Math.PI / 180), 300 - 13*Math.sin(angle * Math.PI / 180) + 10*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 180) * Math.PI / 180);
		ctx.drawImage(flameImage, 14, 0, 7, 15, -3, 0, 7, 15);
		ctx.restore();
		ctx.save();
		ctx.translate(400 + 15*Math.cos(angle * Math.PI / 180) - 10*Math.sin(angle * Math.PI / 180), 300 + 15*Math.sin(angle * Math.PI / 180) + 10*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 180) * Math.PI / 180);
		ctx.drawImage(flameImage, 14, 0, 7, 15, -3, 0, 7, 15);
		ctx.restore();
	}
	
	
	if (flameLeftFront == 1) {
		ctx.save();
		ctx.translate(400 - 14*Math.cos(angle * Math.PI / 180) + 18*Math.sin(angle * Math.PI / 180), 300 - 14*Math.sin(angle * Math.PI / 180) - 18*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 0, 0, 5, 8, -2, 0, 5, 8);
		ctx.restore();
	}
	else if (flameLeftFront == 2) {
		ctx.save();
		ctx.translate(400 - 14*Math.cos(angle * Math.PI / 180) + 18*Math.sin(angle * Math.PI / 180), 300 - 14*Math.sin(angle * Math.PI / 180) - 18*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 7, 0, 5, 12, -2, 0, 5, 12);
		ctx.restore();
	}
	else if (flameLeftFront == 3) {
		ctx.save();
		ctx.translate(400 - 14*Math.cos(angle * Math.PI / 180) + 18*Math.sin(angle * Math.PI / 180), 300 - 14*Math.sin(angle * Math.PI / 180) - 18*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 14, 0, 7, 15, -3, 0, 7, 15);
		ctx.restore();
	}
	
	
	if (flameLeftBack == 1) {
		ctx.save();
		ctx.translate(400 - 19*Math.cos(angle * Math.PI / 180) - 18*Math.sin(angle * Math.PI / 180), 300 - 19*Math.sin(angle * Math.PI / 180) + 18*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 0, 0, 5, 8, -2, 0, 5, 8);
		ctx.restore();
	}
	else if (flameLeftBack == 2) {
		ctx.save();
		ctx.translate(400 - 19*Math.cos(angle * Math.PI / 180) - 18*Math.sin(angle * Math.PI / 180), 300 - 19*Math.sin(angle * Math.PI / 180) + 18*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 7, 0, 5, 12, -2, 0, 5, 12);
		ctx.restore();
	}
	else if (flameLeftBack == 3) {
		ctx.save();
		ctx.translate(400 - 19*Math.cos(angle * Math.PI / 180) - 18*Math.sin(angle * Math.PI / 180), 300 - 19*Math.sin(angle * Math.PI / 180) + 18*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle + 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 14, 0, 7, 15, -3, 0, 7, 15);
		ctx.restore();
	}
	
	
	if (flameRightFront == 1) {
		ctx.save();
		ctx.translate(400 + 14*Math.cos(angle * Math.PI / 180) + 17*Math.sin(angle * Math.PI / 180), 300 + 14*Math.sin(angle * Math.PI / 180) - 17*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle - 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 0, 0, 5, 8, -2, 0, 5, 8);
		ctx.restore();
	}
	else if (flameRightFront == 2) {
		ctx.save();
		ctx.translate(400 + 14*Math.cos(angle * Math.PI / 180) + 17*Math.sin(angle * Math.PI / 180), 300 + 14*Math.sin(angle * Math.PI / 180) - 17*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle - 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 7, 0, 5, 12, -2, 0, 5, 12);
		ctx.restore();
	}
	else if (flameRightFront == 3) {
		ctx.save();
		ctx.translate(400 + 14*Math.cos(angle * Math.PI / 180) + 17*Math.sin(angle * Math.PI / 180), 300 + 14*Math.sin(angle * Math.PI / 180) - 17*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle - 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 14, 0, 7, 15, -3, 0, 7, 15);
		ctx.restore();
	}
	
	
	if (flameRightBack == 1) {
		ctx.save();
		ctx.translate(400 + 19*Math.cos(angle * Math.PI / 180) - 19*Math.sin(angle * Math.PI / 180), 300 + 19*Math.sin(angle * Math.PI / 180) + 19*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle - 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 0, 0, 5, 8, -2, 0, 5, 8);
		ctx.restore();
	}
	else if (flameRightBack == 2) {
		ctx.save();
		ctx.translate(400 + 19*Math.cos(angle * Math.PI / 180) - 19*Math.sin(angle * Math.PI / 180), 300 + 19*Math.sin(angle * Math.PI / 180) + 19*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle - 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 7, 0, 5, 12, -2, 0, 5, 12);
		ctx.restore();
	}
	else if (flameRightBack == 3) {
		ctx.save();
		ctx.translate(400 + 19*Math.cos(angle * Math.PI / 180) - 19*Math.sin(angle * Math.PI / 180), 300 + 19*Math.sin(angle * Math.PI / 180) + 19*Math.cos(angle * Math.PI / 180));
		ctx.rotate((angle - 90) * Math.PI / 180);
		ctx.drawImage(flameImage, 14, 0, 7, 15, -3, 0, 7, 15);
		ctx.restore();
	}
	

	if (flameBack == 3) { flameBack = 1; }
	if (flameFront == 3) { flameFront = 1; }
	if (flameLeftFront == 3) { flameLeftFront = 1; }
	if (flameLeftBack == 3) { flameLeftBack = 1; }
	if (flameRightFront == 3) { flameRightFront = 1; }
	if (flameRightBack == 3) { flameRightBack = 1; }

}