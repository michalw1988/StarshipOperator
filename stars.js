var stars = [];

var centerX = 400;
var centerY = 300;

class star {
  constructor(x, y, angle, depth, startShift, colour) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.depth = depth;
    this.speed = 1;
    this.startShift = startShift;
	this.colour = colour;
    this.lifeSpan = 0;
    
    var radians = this.angle * Math.PI / 180;
    this.x += Math.sin(radians) * this.startShift - Math.cos(radians) * this.startShift;
    this.y += Math.cos(radians) * this.startShift + Math.sin(radians) * this.startShift;
  }
  
  recalculate() {
    var radians = this.angle * Math.PI / 180;
    this.x += Math.sin(radians) * this.speed - Math.cos(radians) * this.speed;
    this.y += Math.cos(radians) * this.speed + Math.sin(radians) * this.speed;
    this.depth *= 1.02;
    this.speed *= 1.02;
    this.lifeSpan++;
  }
}


function addStartStars() {
  for (var i = 0; i < 300; i++) {
    var x = centerX;
    var y = centerY;
    var angle = Math.floor(Math.random() * 360);
    var depth = 3;
    var startShift = Math.floor(Math.random() * 400);
	var colour_r = 100 + Math.floor(Math.random() * 35);
	var colour_g = 100 + Math.floor(Math.random() * 35);
	var colour_b = 155 + Math.floor(Math.random() * 100);
	var colour = "rgb(" + colour_r + ", " + colour_g + ", " + colour_b + ")";
    stars.push(new star(x, y, angle, depth, startShift, colour));

    var relocate = Math.floor(Math.random() * 100);
    for (var n = 0; n < relocate; n++) {
		stars[i].recalculate();
    }
  }
}


function addNewStar() {
  var x = centerX;
  var y = centerY;
  var angle = Math.floor(Math.random() * 360);
  var depth = 3;
  var startShift = Math.floor(Math.random() * 400);
	var colour_r = 100 + Math.floor(Math.random() * 35);
	var colour_g = 100 + Math.floor(Math.random() * 35);
	var colour_b = 155 + Math.floor(Math.random() * 100);
  var colour = "rgb(" + colour_r + ", " + colour_g + ", " + colour_b + ")";
  stars.push(new star(x, y, angle, depth, startShift, colour));
}


function displayStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 800, 600);
  
  ctx.drawImage(gameBackgroundImage, 0, 0);

  //ctx.fillStyle = "red";
  for (var i = stars.length - 1; i >= 0; i--) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(stars[i].x, stars[i].y, stars[i].depth / 10, 0, Math.PI * 2, false);
	ctx.fillStyle = stars[i].colour;
    ctx.fill();
    ctx.restore();

    stars[i].recalculate();
    
    if (stars[i].lifeSpan == 150) {
    	stars.splice(i, 1);
    }
  }
  
  for (var i = 0; i < 5; i++) {
	addNewStar();
  }
}