// class for particle
class particle {
  constructor(x, y, angle, speed, radius, colourR, colourG, colourB, colourA) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.radius = radius;
    this.colourR = colourR;
    this.colourG = colourG;
    this.colourB = colourB;
    this.colourA = colourA;
  }
  
  drawParticle() {
    ctx.fillStyle = "rgba(" + this.colourR + "," + this.colourG + "," + this.colourB + "," + this.colourA + ")";
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x + mapShiftX, this.y + mapShiftY, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }
}


// class for explosion
class explosion {
  constructor(x, y, lifeSpan, delay, type) {

	// parameters for all types
    this.x = x;
    this.y = y;
    this.lifeSpan = lifeSpan;
    this.delay = delay;
    this.particleList = [];

    // explosion parameters depending on type
    this.PARTICLE_COUNT = 0;
    this.PARTICLE_START_SPEED_1 = 0;
    this.PARTICLE_START_SPEED_2 = 0;
    this.PARTICLE_RADIUS_1 = 0;
    this.PARTICLE_RADIUS_2 = 0;
    this.PARTICLE_COLOR_R_START = 0;
    this.PARTICLE_COLOR_G_START = 0;
    this.PARTICLE_COLOR_B_START = 0;
    this.PARTICLE_COLOR_A_START = 0;
    this.PARTICLE_SPEED_CHANGE = 0;
    this.PARTICLE_RADIUS_CHANGE = 0;
    this.PARTICLE_COLOR_R_CHANGE = 0;
    this.PARTICLE_COLOR_G_CHANGE = 0;
    this.PARTICLE_COLOR_B_CHANGE = 0;
    this.PARTICLE_COLOR_A_CHANGE = 0;

    // setting parameters depending on type
    if (type == 1) { // big explosion flames
      this.PARTICLE_COUNT = 40;
      this.PARTICLE_START_SPEED_1 = 7;
      this.PARTICLE_START_SPEED_2 = 0;
      this.PARTICLE_RADIUS_1 = 15;
      this.PARTICLE_RADIUS_2 = 20;
      this.PARTICLE_COLOR_R_START = 255;
      this.PARTICLE_COLOR_G_START = 245;
      this.PARTICLE_COLOR_B_START = 170;
      this.PARTICLE_COLOR_A_START = 1;
      this.PARTICLE_SPEED_CHANGE = 0.83;
      this.PARTICLE_RADIUS_CHANGE = 0.92;
      this.PARTICLE_COLOR_R_CHANGE = 0;
      this.PARTICLE_COLOR_G_CHANGE = -10;
      this.PARTICLE_COLOR_B_CHANGE = -40;
      this.PARTICLE_COLOR_A_CHANGE = 0.87;
    }
    
    else if (type == 2) { // big explosion smoke
      this.PARTICLE_COUNT = 20;
      this.PARTICLE_START_SPEED_1 = 11;
      this.PARTICLE_START_SPEED_2 = 0;
      this.PARTICLE_RADIUS_1 = 5;
      this.PARTICLE_RADIUS_2 = 10;
      this.PARTICLE_COLOR_R_START = 120;
      this.PARTICLE_COLOR_G_START = 120;
      this.PARTICLE_COLOR_B_START = 120;
      this.PARTICLE_COLOR_A_START = 1;
      this.PARTICLE_SPEED_CHANGE = 0.83;
      this.PARTICLE_RADIUS_CHANGE = 0.92;
      this.PARTICLE_COLOR_R_CHANGE = 0;
      this.PARTICLE_COLOR_G_CHANGE = 0;
      this.PARTICLE_COLOR_B_CHANGE = 0;
      this.PARTICLE_COLOR_A_CHANGE = 0.9;
    }
    
    else if (type == 3) { // small explosion
	  this.PARTICLE_COUNT = 1;
      this.PARTICLE_START_SPEED_1 = 0;
      this.PARTICLE_START_SPEED_2 = 0;
      this.PARTICLE_RADIUS_1 = 0;
      this.PARTICLE_RADIUS_2 = 8;
      this.PARTICLE_COLOR_R_START = 255;
      this.PARTICLE_COLOR_G_START = 170;
      this.PARTICLE_COLOR_B_START = 0;
      this.PARTICLE_COLOR_A_START = 1;
      this.PARTICLE_SPEED_CHANGE = 1;
      this.PARTICLE_RADIUS_CHANGE = 1.1;
      this.PARTICLE_COLOR_R_CHANGE = 0;
      this.PARTICLE_COLOR_G_CHANGE = -80;
      this.PARTICLE_COLOR_B_CHANGE = -0;
      this.PARTICLE_COLOR_A_CHANGE = 0.8;
    }
    
    else if (type == 4 || type == 5 || type == 6 || type == 7 || type == 8) { // bonus taken
      this.PARTICLE_COUNT = 25;
      this.PARTICLE_START_SPEED_1 = 0;
      this.PARTICLE_START_SPEED_2 = 5;
      this.PARTICLE_RADIUS_1 = 10;
      this.PARTICLE_RADIUS_2 = 5;
      if (type == 4) { // colour for ammo
      	this.PARTICLE_COLOR_R_START = 255;
      	this.PARTICLE_COLOR_G_START = 0;
      	this.PARTICLE_COLOR_B_START = 0;
      }
      else if (type == 5) { // colour for shields
      	this.PARTICLE_COLOR_R_START = 0;
      	this.PARTICLE_COLOR_G_START = 230;
      	this.PARTICLE_COLOR_B_START = 0;
      }
      else if (type == 6) { // colour for fuel
      	this.PARTICLE_COLOR_R_START = 255;
      	this.PARTICLE_COLOR_G_START = 245;
      	this.PARTICLE_COLOR_B_START = 0;
      }
      else if (type == 7) { // colour for FTL fuel
      	this.PARTICLE_COLOR_R_START = 255;
      	this.PARTICLE_COLOR_G_START = 170;
      	this.PARTICLE_COLOR_B_START = 0;
      }
      else if (type == 8) { // colour for time
      	this.PARTICLE_COLOR_R_START = 120;
      	this.PARTICLE_COLOR_G_START = 120;
      	this.PARTICLE_COLOR_B_START = 120;
      }
      this.PARTICLE_COLOR_A_START = 1;
      this.PARTICLE_SPEED_CHANGE = 0.8;
      this.PARTICLE_RADIUS_CHANGE = 0.92;
      this.PARTICLE_COLOR_R_CHANGE = 0;
      this.PARTICLE_COLOR_G_CHANGE = 0;
      this.PARTICLE_COLOR_B_CHANGE = 0;
      this.PARTICLE_COLOR_A_CHANGE = 0.7;
    }
    
    else if (type == 9) { // jump
      this.PARTICLE_COUNT = 50;
      this.PARTICLE_START_SPEED_1 = 0;
      this.PARTICLE_START_SPEED_2 = 9;
      this.PARTICLE_RADIUS_1 = 10;
      this.PARTICLE_RADIUS_2 = 5;
      this.PARTICLE_COLOR_R_START = 120;
      this.PARTICLE_COLOR_G_START = 120;
      this.PARTICLE_COLOR_B_START = 120;
      this.PARTICLE_COLOR_A_START = 1;
      this.PARTICLE_SPEED_CHANGE = 0.83;
      this.PARTICLE_RADIUS_CHANGE = 0.92;
      this.PARTICLE_COLOR_R_CHANGE = 0;
      this.PARTICLE_COLOR_G_CHANGE = 0;
      this.PARTICLE_COLOR_B_CHANGE = 0;
      this.PARTICLE_COLOR_A_CHANGE = 0.7;
    }
    

    // add start particles
    for (var i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particleList.push(new particle(
        this.x,
        this.y,
        Math.floor(Math.random() * 360),
        Math.random() * this.PARTICLE_START_SPEED_1 + this.PARTICLE_START_SPEED_2,
        Math.random() * this.PARTICLE_RADIUS_1 + this.PARTICLE_RADIUS_2,
        this.PARTICLE_COLOR_R_START,
        this.PARTICLE_COLOR_G_START,
        this.PARTICLE_COLOR_B_START,
        this.PARTICLE_COLOR_A_START));
    }
  }
	
  // drawing all particles for this frame
  drawParticles() {
    for (var i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particleList[i].drawParticle();
    }
    this.recalculateValues();
  }

  // recalculating particle values
  recalculateValues() {
  	this.lifeSpan--;
    for (var i = 0; i < this.PARTICLE_COUNT; i++) {
      var radians = this.particleList[i].angle * Math.PI / 180;
      var speed = this.particleList[i].speed;
      this.particleList[i].x += Math.sin(radians) * speed - Math.cos(radians) * speed;
      this.particleList[i].y += Math.cos(radians) * speed + Math.sin(radians) * speed;
      this.particleList[i].speed *= this.PARTICLE_SPEED_CHANGE;
      this.particleList[i].radius *= this.PARTICLE_RADIUS_CHANGE;
      this.particleList[i].colourR += this.PARTICLE_COLOR_R_CHANGE;
      this.particleList[i].colourG += this.PARTICLE_COLOR_G_CHANGE;
      this.particleList[i].colourB += this.PARTICLE_COLOR_B_CHANGE;
      this.particleList[i].colourA *= this.PARTICLE_COLOR_A_CHANGE;
    }
  }
}