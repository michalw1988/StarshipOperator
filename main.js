var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;
var ctx = canvas.getContext("2d");

canvas.addEventListener("click", mouseClick);
canvas.addEventListener("mousemove", mouseMove);
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

//setInterval(mainLoop, 33); // start main loop
var preloader = setInterval(preloading, 33); // start main loop

var whatToDisplay = 0;
var soundSettings = 1;

// mouse coordinates;
var mouseX = 0;
var mouseY = 0;

// keys array
var keys = {
	up: false,
	down: false,
	right: false,
	left: false,
	space: false,
	ctrl: false,
	comma: false,
	dot: false,
	esc: false
};

var level = 0;
var needToLoadData = true;

var angle = 0;
var mapShiftX = 0;
var mapShiftY = 0;

var angleChange = 0;
var speedChangeX = 0;
var speedChangeY = 0;

var ammo = 0;
var shields = 0;
var fuel = 0;
var FTLFuel = 0;
var time = 0;
var jumpDistance = 0;

var whichGun = 1;
var fireAllowed = 0;

var starsShiftX = 0;
var starsShiftY = 0

var collisionPoints = [
	[0, 0],
	[0, -25],
	[-5, -16],
	[5, -16],
	[-9, 20],
	[9, 20],
	[0, 25]
];

var myBulletList = [];
var enemyBulletList = [];
var bonusList = [];
var enemyList = [];
var explosionList = [];
var soundList = [];

var levelCompleted = false;
var levelFailed = false;
var levelEndTimer = -1;

var frameBrightness = 50;
var brightnessIncrease = true;

var finishX = -1000;
var finishY = -1000;

// ---------------------------------------------------------

// class for bullet
class bullet {
	constructor(x, y, angle, colour) {
		this.x = x;
		this.y = y; 
		this.angle = angle;
		this.colour = colour;
	}
	drawBullet() {
		ctx.save();
		ctx.fillStyle = this.colour;
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle * Math.PI / 180);
		ctx.fillRect(0, 0, 1, 10);
		ctx.restore();
	}
	recalculateBulletPosition() {
		this.x += Math.sin(this.angle * Math.PI / 180) * 20;
		this.y -= Math.cos(this.angle * Math.PI / 180) * 20;
		this.x += speedChangeX;
		this.y += speedChangeY;
	}
}

// ---------------------------------------------------------

// preloading images
function preloading() {
	if (gameBackgroundImage.ready == true &&
		gameTitleImage.ready == true &&
		shipImage.ready == true &&
		wallImage.ready == true &&
		finishImage.ready == true &&
		flameImage.ready == true &&
		bonus1Image.ready == true &&
		bonus2Image.ready == true &&
		bonus3Image.ready == true &&
		bonus4Image.ready == true &&
		bonus5Image.ready == true &&
		enemyImage.ready == true &&
		menu1aImage.ready == true &&
		menu2aImage.ready == true &&
		menu3aImage.ready == true &&
		menu4aImage.ready == true &&
		menu5aImage.ready == true &&
		menu1bImage.ready == true &&
		menu2bImage.ready == true &&
		menu3bImage.ready == true &&
		menu4bImage.ready == true &&
		menu5bImage.ready == true &&
		backgroundLoop.ready == true &&
		engineSound.ready == true &&
		bigExplosionSound.ready == true &&
		bonusSound.ready == true &&
		clickSound.ready == true &&
		enemyLaserSound.ready == true &&
		levelCompletedSound.ready == true &&
		myLaserSound.ready == true &&
		smallExplosionSound.ready == true &&
		warpSound.ready == true
		) {
		
		// stop showing the loading screen
		clearInterval(preloader);
		
		// start background music
		backgroundLoop.loop = true;
		backgroundLoop.play();
		
		// settings for engine sound
		engineSound.volume = 0.5;
		engineSound.loop = true;
		
		// start main game loop
		var gameLoop = setInterval(mainLoop, 33);
	}
	// display "Loading..." text (if images and audio is not loaded)
	else {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 800, 600);
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = "20px Verdana";
		ctx.fillText("Loading...", 400, 310);
	}
}

// ---------------------------------------------------------

addStartStars();

// main loop
function mainLoop() {
	if (whatToDisplay == 0) { // main menu
		displayMenu();
	}
	else if (whatToDisplay == 1) { // start new game
	 	if (levelEndTimer != 0) { displayGame(); }
	}
	else if (whatToDisplay == 2) { // select level
		displaySelectLevelBox();
	}
	else if (whatToDisplay == 3) { // about the game
		displayAboutBox();
	}
}


function displaySelectLevelBox() {
	displayMenu();
	ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
	ctx.fillRect(0, 0, 800, 600);
	ctx.strokeStyle = "#555";
	ctx.strokeRect(149, 99, 502, 402);
	ctx.fillStyle = "#000";
	ctx.fillRect(150, 100, 500, 400);
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.font = "22px Verdana";
	ctx.fillText("SELECT LEVEL", 400, 138);
	ctx.fillStyle = "#555";
	ctx.fillRect(190, 155, 420, 1);
	ctx.textAlign = "right";
	ctx.font = "12px verdana";
	ctx.fillText("Click outside the box to close it", 790, 588);
	
	var numberOfLevels = 30;
	var levelsAvailable = 0;
	
	// get actual top level from cookie file
	if (!getCookie("StarshipOperatorLevel")) {
		levelsAvailable = 0;
	}
	else {
		var levelsAvailable = Math.floor(getCookie("StarshipOperatorLevel"));
	}
	
	var levelPosX = 0;
	var levelPosY = 0;
	ctx.textAlign = "center";
	ctx.font = "17px Verdana";
	
	// display available levels
	for(var i = 0; i <= levelsAvailable; i++) {
		levelPosX = 250 + 150*Math.floor(i/10);
		levelPosY = 190 + i%10*31;
		if (mouseX > levelPosX-45 &&  mouseX < levelPosX+45 && mouseY > levelPosY-18 && mouseY < levelPosY + 4) {
			ctx.fillStyle = "#8af";
		}
		else {
			ctx.fillStyle = "white";
		}	
		ctx.fillText("LEVEL " + (i+1), levelPosX, levelPosY);
	}
	
	// display unavailable levels
	ctx.fillStyle = "#555";
	for(var i = levelsAvailable+1; i < numberOfLevels; i++) {
		levelPosX = 250 + 150*Math.floor(i/10);
		levelPosY = 190 + i%10*31;
		var lvl = Math.floor(i)+1;
		ctx.fillText("LEVEL " + lvl, levelPosX, levelPosY);
	}
}


// "About" box
function displayAboutBox() {
	displayMenu();	
	ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
	ctx.fillRect(0, 0, 800, 600);
	ctx.strokeStyle = "#555";
	ctx.strokeRect(149, 99, 502, 402);
	ctx.fillStyle = "#000";
	ctx.fillRect(150, 100, 500, 400);
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.font = "22px Verdana";
	ctx.fillText("ABOUT THE GAME", 400, 138);
	ctx.fillStyle = "#555";
	ctx.fillRect(190, 155, 420, 1);
	
	ctx.textAlign = "right";
	ctx.font = "12px verdana";
	ctx.fillText("Click outside the box to close it", 790, 588);
	
	var aboutText = "Rush to the finish line, navigate through labyrinths, kill enemy ships or do whatever mission objective says. Just be careful - space won't forgive you even a slightest mistake.\nGood luck!\n\nKeys you may need:\n[up] - accelerate\n[down] - slow down\n[left] - rotate counter-clockwise\n[right] - rotate clockwise\n[<] - move left\n[>] - move right\n[space] - open fire\n[ctrl] - use FTL engine";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.font = "13px verdana";
	wrapText(ctx, aboutText, 400, 182, 430, 17);
	
	ctx.fillStyle = "#555";
	ctx.fillRect(190, 420, 420, 1); 
	
	var creditsText = "Sound effects from http://www.freesound.org\nMain score is 'Furious Freak' by Kevin MacLeod (incompetech.com)\nLicensed under Creative Commons: By Attribution 3.0\nhttp://creativecommons.org/licenses/by/3.0/";
	ctx.font = "11px verdana";
	ctx.fillStyle = "white";
	wrapText(ctx, creditsText, 400, 440, 480, 15);
}


// game
function displayGame() {
	// load level data if needed
	if (needToLoadData == true) {
		loadLevelData(level);
	}
	
	// draw background image
	ctx.drawImage(gameBackgroundImage, 800/2 - gameBackgroundImage.width/2 + starsShiftX, 600/2 - gameBackgroundImage.height/2 + starsShiftY);
	
	// draw level map
	drawMap(level);
	
	
	// reacting on pressed keys (if I'm still alive)
	if (levelFailed == false && levelCompleted == false) { reactOnKeys(); }

	
	// drawing bonuses
	for(var i = bonusList.length - 1; i >= 0; i--) {
		bonusList[i].drawBonus();
	}
	
	// drawing enemies
	for(var i = enemyList.length - 1; i >= 0; i--) {
		enemyList[i].drawEnemy();
		enemyList[i].rotateEnemy();
		enemyList[i].fire();
	}
	
	// drawing bullets
	for(var i = myBulletList.length - 1; i >= 0; i--) {
		myBulletList[i].drawBullet();
		myBulletList[i].recalculateBulletPosition();
	}
	for(var i = enemyBulletList.length - 1; i >= 0; i--) {
		enemyBulletList[i].drawBullet();
		enemyBulletList[i].recalculateBulletPosition();
	}
	
	// drawing ship
	if (shields > 0) {
		drawJumpIndicator();
		drawShip();	
		drawFlames();
	}
	recalculateShipPosition();
	if (fireAllowed > 0) fireAllowed--;
	
	
	// drawing explosions
	for (var i = explosionList.length - 1; i >= 0; i--) {
		if (explosionList[i].delay == 0) {
			explosionList[i].drawParticles();
		}
		else {
			explosionList[i].delay--;
		}
		if (explosionList[i].lifeSpan < 0) {
			explosionList.splice(i, 1);
		}
	}	
	
	// drawing bars, timer and enemies count
	drawBars();
	drawTimer();
	drawEnemyCount();
	writeMissionObjective();
	drawBackToMenuInfo();
	
	// checking collisions
	checkBulletsAndWallsCollisons();
	checkMyShipAndWallsCollisons();
	if (levelFailed == false) { checkBonusCollisions(); }
	checkEnemyCollisions();
	checkEnemyBulletsAndMyShipCollision();
	
	// checking if I'm not too far away from the map
	checkIfImNotTooFarAway();
	
	// checking if I lost / won
	checkIfLevelFailed();
	checkIfLevelCompleted();
	
	if (soundSettings == 1) { playEngineSound(); }
	removeUnusedSounds();
}


// displaying main menu
function displayMenu() {
	// stars animation in the background
	displayStars();
		
	// game title
	ctx.drawImage(gameTitleImage, 50, 140);
	
	// menu buttons:
	// button "NEW GAME"
	if (mouseX >= 310 && mouseX <= 490 && mouseY >= 350 && mouseY <= 374) {
		ctx.drawImage(menu1bImage, 310, 350);
	}
	else {
		ctx.drawImage(menu1aImage, 310, 350);
	}
	// button "SELECT LEVEL"
	if (mouseX >= 310 && mouseX <= 490 && mouseY >= 385 && mouseY <= 409) {
		ctx.drawImage(menu2bImage, 310, 385);
	}
	else {
		ctx.drawImage(menu2aImage, 310, 385);
	}
	// button "ABOUT"
	if (mouseX >= 310 && mouseX <= 490 && mouseY >= 420 && mouseY <= 444) {
		ctx.drawImage(menu3bImage, 310, 420);
	}
	else {
		ctx.drawImage(menu3aImage, 310, 420);
	}
	// button "SOUND: ON / OFF"
	if (mouseX >= 310 && mouseX <= 490 && mouseY >= 455 && mouseY <= 479) {
		if (soundSettings == 1) { ctx.drawImage(menu4bImage, 310, 455); }
		else { ctx.drawImage(menu5bImage, 310, 455); }
	}
	else {
		if (soundSettings == 1) { ctx.drawImage(menu4aImage, 310, 455); }
		else { ctx.drawImage(menu5aImage, 310, 455); }
	}
	
	if (whatToDisplay == 0) {
		ctx.fillStyle = "#555";
		ctx.textAlign = "right";
		ctx.font = "12px verdana";
		ctx.fillText("version 1.0", 790, 588);
	}
}


// loading level data
function loadLevelData(level) {
	//save level number in cookie file if there's no cookie file yet
	if (!getCookie("StarshipOperatorLevel")) {
		setCookie("StarshipOperatorLevel", level, 365);
	}
	// save level number in cookie file only if it's higher
	else {
		var savedLevel = getCookie("StarshipOperatorLevel");
		if (level > savedLevel) {
			setCookie("StarshipOperatorLevel", level, 365);
		}
	}
	
	// clearing old lists
	myBulletList = [];
	bonusList = [];
	enemyList = [];
	enemyBulletList = [];
	explosionList = [];

	// loading new parameters
	mapShiftX = -startPositionX[level] + 400;
	mapShiftY = -startPositionY[level] + 300;
	angle = startAngle[level];
	
	ammo = startAmmo[level];
	shields = startShields[level];
	fuel = startFuel[level];
	FTLFuel = startFTLFuel[level];
	time = startTime[level];
	
	finishX = -1000;
	finishY = -1000;
	
	angleChange = 0;
	speedChangeX = 0;
	speedChangeY = 0;
	jumpDistance = 0;

	whichGun = 1;
	fireAllowed = 0;

	starsShiftX = 0;
	starsShiftY = 0
	
	levelEndTimer = -1;
	
	// loading bonuses and enemies from level map array
	var x = mapSizeX[level];
	var y = mapSizeY[level];
	
	for (var n = 0; n < y; n++) {
		for (var m = 0; m < x; m++) {
			
			// load bonuses
			if (map[level][n][m] == 5) {
				bonusList.push(new bonus(m*50+25,n*50+25, 1));
			}
			else if (map[level][n][m] == 6) {
				bonusList.push(new bonus(m*50+25,n*50+25, 2));
			}
			else if (map[level][n][m] == 7) {
				bonusList.push(new bonus(m*50+25,n*50+25, 3));
			}
			else if (map[level][n][m] == 8) {
				bonusList.push(new bonus(m*50+25,n*50+25, 4));
			}
			else if (map[level][n][m] == 9) {
				bonusList.push(new bonus(m*50+25,n*50+25, 5));
			}
			
			// load enemies
			else if (map[level][n][m] >= 2 && map[level][n][m] < 3) {
				enemyList.push(new enemy(m*50+25,n*50+25, (map[level][n][m] % 2)*1000));
			}

			// load finish line
			else if (map[level][n][m] == 3) {
				finishX = m*50;
				finishY = n*50;
			}
		}
	}
	
	// further loading not needed
	needToLoadData = false;
}


// drawing map
function drawMap(level) {
	//var x = mapSizeX[level];
	//var y = mapSizeY[level];

	var minM = Math.floor(-mapShiftX / 50);
	var minN = Math.floor(-mapShiftY / 50);
	if (minM < 0) minM = 0;
	if (minN < 0) minN = 0;
	var maxM = minM + 17;
	var maxN = minN + 13;
	if (maxM > mapSizeX[level]) maxM = mapSizeX[level];
	if (maxN > mapSizeY[level]) maxN = mapSizeY[level];
	//ctx.textAlign = "left";
	//ctx.fillStyle = "white";
	//ctx.fillText(minM + ", " + minN, 10, 220);
	//ctx.fillText(maxM + ", " + maxN, 10, 240);
	
	
	for (var n = minN; n < maxN; n++) {
		for (var m = minM; m < maxM; m++) {
	//for (var n = 0; n < y; n++) {
		//for (var m = 0; m < x; m++) {
			
			// wall
			if (map[level][n][m] == 1) {
				ctx.drawImage(wallImage, m*50 + mapShiftX, n*50 + mapShiftY);
				ctx.fillStyle = "#444";
				// line above
				if(map[level][n-1][m] != 1) {
					ctx.fillRect(m*50 + mapShiftX, n*50 + mapShiftY, 50, 2);
				}
				// line below
				if(map[level][n+1][m] != 1) {
					ctx.fillRect(m*50 + mapShiftX, n*50+48 + mapShiftY, 50, 2);
				}
				// line left
				if(map[level][n][m-1] != 1) {
					ctx.fillRect(m*50 + mapShiftX, n*50 + mapShiftY, 2, 50);
				}
				// line right
				if(map[level][n][m+1] != 1) {
					ctx.fillRect(m*50+48 + mapShiftX, n*50 + mapShiftY, 2, 50);
				}
			}
			// finish line
			else if (map[level][n][m] == 3) {
				ctx.drawImage(finishImage, m*50 + mapShiftX, n*50 + mapShiftY);
			}
		}
	}
}


// drawing single bar
function drawStatus(x, y, title, currentValue, colour) {
	ctx.save();
	ctx.font = "10px verdana";
	ctx.textAlign = "left";
	ctx.fillStyle = colour;
	ctx.strokeStyle = colour;
	ctx.fillText(title, x, y);
	ctx.strokeRect(x+50, y-9, 102, 12);
	ctx.fillRect(x+51, y-8, currentValue, 10)
	ctx.restore();
}

// drawing bars
function drawBars() {
	var barPosY = 0;
	drawStatus(10, 20, "Fuel", fuel, "#ff0");
	
	if (jumpSettings[level] == 1) {
		drawStatus(10, 40, "FTL Fuel", FTLFuel, "#fa0");
		barPosY += 20;
	}
	
	if (shootingSettings[level] == 1) {
		drawStatus(10, 40 + barPosY, "Ammo", ammo, "#f00");
		drawStatus(10, 60 + barPosY, "Shields", shields, "#0d0");
	}
}


// drawing timer
function drawTimer() {
	if (timeSettings[level] == 1) {
		ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
		ctx.strokeRect(679, 9, 112, 22);
		ctx.fillStyle = "rgba(127, 127, 127, 0.4)";
		ctx.fillRect(680, 10, 110, 20);
		ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
		ctx.font = "12px verdana";
		var minutes = Math.floor(time/60000%60);
		var minutes = Math.floor(time/60000%60);
		minutes = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();
		var seconds = Math.floor(time/1000%60);
		seconds = (seconds < 10) ? '0' + seconds.toString() : seconds.toString();	
		ctx.textAlign = "right";
		ctx.fillText("Time left: " + minutes + ":" + seconds, 784, 25);
		if (levelFailed == false) {
			time -= 40;
		}
	}
}

// drawing number of enemies left on a map
function drawEnemyCount() {
	if (shootingSettings[level] == 1) {
		var verticalChange = 0;
		if (timeSettings[level] == 0) {
			verticalChange = -27;
		}
		ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
		ctx.strokeStyle = "rgba(255, 0, 0, 0.7)";
		ctx.strokeRect(679, 36+verticalChange, 112, 22);
		ctx.fillStyle = "rgba(127, 127, 127, 0.4)";
		ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
		ctx.fillRect(680, 37+verticalChange, 110, 20);
		ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
		ctx.fillStyle = "rgba(255, 20, 20, 1)";
		ctx.font = "12px verdana";
		ctx.textAlign = "right";
		ctx.fillText("Enemies left: "+enemyList.length, 784, 51+verticalChange);
	}
}


function writeMissionObjective() {
	ctx.fillStyle = "rgba(127, 127, 127, 0.1)";
	ctx.fillRect(9, 550, 780, 20);
	ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	ctx.font = "12px verdana";
	ctx.textAlign = "center";
	ctx.fillText(levelDescription[level], 400, 564);
	
	ctx.strokeStyle = "rgba("+frameBrightness+", "+frameBrightness+", "+frameBrightness+", 1)";
	ctx.strokeRect(8, 549, 782, 22);
	if (frameBrightness < 245 && brightnessIncrease == true) { frameBrightness += 8; }
	else { brightnessIncrease = false; }
	if (frameBrightness > 50 && brightnessIncrease == false) { frameBrightness -= 8; }
	else { brightnessIncrease = true; }
	
}


function drawBackToMenuInfo() {
	ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
	ctx.textAlign = "right";
	ctx.font = "12px verdana";
	ctx.fillText("Press ESC to abort mission", 790, 588);
}



function wrapText(context, text, x, y, line_width, line_height)
{
    var line = '';
    var paragraphs = text.split('\n');
    for (var i = 0; i < paragraphs.length; i++)
    {
        var words = paragraphs[i].split(' ');
        for (var n = 0; n < words.length; n++)
        {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > line_width && n > 0)
            {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += line_height;
            }
            else
            {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
        y += line_height;
        line = '';
    }
}


// drawing my ships
function drawShip() {
	ctx.save();
	ctx.translate(800/2, 600/2);
	ctx.rotate(angle * Math.PI / 180);
	ctx.drawImage(shipImage,  - shipImage.width/2,  - shipImage.height/2);
	ctx.restore();
}


// recalculating ship and map position
function recalculateShipPosition() {
	angle += angleChange;
	mapShiftX += speedChangeX;
	mapShiftY += speedChangeY;
	starsShiftX += speedChangeX / 5;
	starsShiftY += speedChangeY / 5;
}


// drawing jump range indicator
function drawJumpIndicator() {
	if (jumpDistance > 0) {
		ctx.save();
		ctx.translate(400-0*Math.cos(angle * Math.PI / 180)+0*Math.sin(angle * Math.PI / 180), 300-0*Math.cos(angle * Math.PI / 180) - 0*Math.sin(angle * Math.PI / 180));
		ctx.rotate(angle * Math.PI / 180);
		
		ctx.fillStyle = "rgba(128,212,240, 0.1)";
		ctx.fillRect(-2, 0, 5, -10*jumpDistance-2);
		ctx.fillStyle = "rgba(128,212,240, 0.2)";
		ctx.fillRect(-1, 0, 3, -10*jumpDistance-1);
		ctx.fillStyle = "rgba(250,250,250, 0.3)";
		ctx.fillRect(0, 0, 1, -10*jumpDistance);
		
		ctx.restore();
	}
}
	

// reacting on pressed keys
function reactOnKeys() {
	if (keys["up"] == true && fuel > 0.5) {
		speedChangeY += Math.cos(angle * Math.PI / 180) * 0.5;
		speedChangeX -= Math.sin(angle * Math.PI / 180) * 0.5;
		fuel -= 0.5;
	}
	if (keys["down"] == true && fuel > 0.2) {
		if (speedChangeX > 0.3) { speedChangeX -= 0.3; fuel -= 0.1; }
		else if (speedChangeX < -0.3) { speedChangeX += 0.3; fuel -= 0.1; } 
		else {speedChangeX = 0; }
		
		if (speedChangeY > 0.3) { speedChangeY -= 0.3; fuel -= 0.1; } 
		else if (speedChangeY < -0.3) { speedChangeY += 0.3; fuel -= 0.1; } 
		else {speedChangeY = 0; }
		
		if (angleChange > 0.1) { angleChange -= 0.1; fuel -= 0.1; } 
		else if (angleChange < -0.1) { angleChange += 0.1; fuel -= 0.1; }
		else {angleChange = 0; }
	}
	if (keys["left"] == true && fuel > 0.1) {
		if (angleChange >= -3) angleChange -= 0.25;
		fuel -= 0.1;
	}
	if (keys["right"] == true && fuel > 0.1) {
		if (angleChange <= 3) angleChange += 0.25;
		fuel -= 0.1;
	}
	if (keys["space"] == true && ammo > 0 && fireAllowed == 0) {
		if (whichGun == 1) {
			myBulletList.push(new bullet(400 + 43 * Math.sin(angle * Math.PI / 180) - 10 * Math.cos(angle * Math.PI / 180), 300 - 43 * Math.cos(angle * Math.PI / 180) - 10 * Math.sin(angle * Math.PI / 180), angle, "#abf"));
			whichGun = 2;
		}
		else {
			myBulletList.push(new bullet(400 + 43 * Math.sin(angle * Math.PI / 180) + 10 * Math.cos(angle * Math.PI / 180), 300 - 43 * Math.cos(angle * Math.PI / 180) + 10 * Math.sin(angle * Math.PI / 180), angle, "#abf"));
			whichGun = 1;
		}
		fireAllowed = 2;
		ammo--;
		
		if (soundSettings == 1) { soundList.push(new sound('sound/myLaser.wav', 30, 1)); }
	}
	if (keys["comma"] == true && fuel > 0.25) {
		speedChangeX += Math.cos(angle * Math.PI / 180) * 0.25;
		speedChangeY += Math.sin(angle * Math.PI / 180) * 0.25;
		fuel -= 0.25;
	}
	if (keys["dot"] == true && fuel > 0.25) {
		speedChangeX -= Math.cos(angle * Math.PI / 180) * 0.25;
		speedChangeY -= Math.sin(angle * Math.PI / 180) * 0.25;
		fuel -= 0.25;
	}
	if (keys["ctrl"] == true && FTLFuel > 0) {
		jumpDistance++;
		FTLFuel--;
	}
	if (keys["ctrl"] == false && jumpDistance > 0) {
		mapShiftY += Math.cos(angle * Math.PI / 180) * 10 * jumpDistance;
		mapShiftX -= Math.sin(angle * Math.PI / 180) * 10 * jumpDistance;
		
		starsShiftY += Math.cos(angle * Math.PI / 180) * 2 * jumpDistance;
		starsShiftX -= Math.sin(angle * Math.PI / 180) * 2 * jumpDistance;
	
		jumpDistance = 0;
		
		explosionList.push(new explosion(400 - mapShiftX, 300 - mapShiftY, 20, 0, 9));
		if (soundSettings == 1) { soundList.push(new sound('sound/warp.wav', 10, 1)); }
	}
	if (keys["esc"]) {
		whatToDisplay = 0;
	}
}


// function for checking rect & circle colliding
function rectCircleColliding(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}


// checking if something is colliding with walls
function checkBulletsAndWallsCollisons() {
	var x = mapSizeX[level];
	var y = mapSizeY[level];
	
	for (var n = 0; n < y; n++) {
		for (var m = 0; m < x; m++) {
			
			if (map[level][n][m] == 1) {
				
				// checking if my bullets colliding
				for(var i = myBulletList.length - 1; i >= 0; i--) {
					if (myBulletList[i].x > m*50 + mapShiftX &&
						myBulletList[i].x < m*50 + mapShiftX + 50 &&
						myBulletList[i].y > n*50 + mapShiftY &&
						myBulletList[i].y < n*50 + mapShiftY + 50) {
						
						
						// finding where bullet collided with wall (to avoid bullets exploding inside walls)
						var collisionPointX = myBulletList[i].x;
						var collisionPointY = myBulletList[i].y;
						var ifOutside = false;
						while (ifOutside == false) {
							collisionPointX -= Math.sin(myBulletList[i].angle * Math.PI / 180) * 1;
							collisionPointY += Math.cos(myBulletList[i].angle * Math.PI / 180) * 1;
							
							if (collisionPointX > m*50 + mapShiftX &&
								collisionPointX < m*50 + mapShiftX + 50 &&
								collisionPointY > n*50 + mapShiftY &&
								collisionPointY < n*50 + mapShiftY + 50) {
								ifOutside = false;
							}
							else {
								ifOutside = true;
							}
						}
						
						// small explosion
						explosionList.push(new explosion(collisionPointX - mapShiftX, collisionPointY - mapShiftY, 10, 0, 3));
						// remove bullet
						myBulletList.splice(i, 1);
					}	
				}
				
				// checking if enemy bullets colliding
				for(var i = enemyBulletList.length - 1; i >= 0; i--) {
					if (enemyBulletList[i].x > m*50 + mapShiftX &&
						enemyBulletList[i].x < m*50 + mapShiftX + 50 &&
						enemyBulletList[i].y > n*50 + mapShiftY &&
						enemyBulletList[i].y < n*50 + mapShiftY + 50) {
						
						// finding where bullet collided with wall (to avoid bullets exploding inside walls)
						var collisionPointX = enemyBulletList[i].x;
						var collisionPointY = enemyBulletList[i].y;
						var ifOutside = false;
						while (ifOutside == false) {
							collisionPointX -= Math.sin(enemyBulletList[i].angle * Math.PI / 180) * 1;
							collisionPointY += Math.cos(enemyBulletList[i].angle * Math.PI / 180) * 1;
							
							if (collisionPointX > m*50 + mapShiftX &&
								collisionPointX < m*50 + mapShiftX + 50 &&
								collisionPointY > n*50 + mapShiftY &&
								collisionPointY < n*50 + mapShiftY + 50) {
								ifOutside = false;
							}
							else {
								ifOutside = true;
							}
						}
						
						// small explosion
						explosionList.push(new explosion(collisionPointX - mapShiftX, collisionPointY - mapShiftY, 10, 0, 3));
						// remove bullet
						enemyBulletList.splice(i, 1);
					}	
				}
				
			}
		}
	}
}


// checking if my ship is colliding with walls
function checkMyShipAndWallsCollisons() {
	
	// calculate map area to check collisions
	var minM = Math.floor((-mapShiftX+400) / 50)-1;
	var minN = Math.floor((-mapShiftY+300) / 50)-1;
	if (minM < 0) minM = 0;
	if (minN < 0) minN = 0;
	var maxM = minM + 3;
	var maxN = minN + 3;
	if (maxM > mapSizeX[level]) maxM = mapSizeX[level];
	if (maxN > mapSizeY[level]) maxN = mapSizeY[level];
	
	for (var n = minN; n < maxN; n++) {
		for (var m = minM; m < maxM; m++) {
			
			if (map[level][n][m] == 1) {
				
				// checking if my ship colliding
				if (shields > 0) {
					for (var i = 0; i < collisionPoints.length; i++) {
						var deg = angle*Math.PI / 180;
						var shiftX = collisionPoints[i][0];
						var shiftY = collisionPoints[i][1];
						var circlePointX = 400 + Math.cos(deg)*shiftX - Math.sin(deg)*shiftY;
						var circlePointY = 300 + Math.sin(deg)*shiftX + Math.cos(deg)*shiftY;

						var circle={x:circlePointX,y:circlePointY,r:10};
						var rect={x:m*50+mapShiftX,y:n*50+mapShiftY,w:50,h:50};
						
						// if collision detected
						if (rectCircleColliding(circle, rect) == true) {
							shields = 0;
							
							explosionList.push(new explosion(circlePointX - 4 - mapShiftX, circlePointY - 5 - mapShiftY, 30, 3, 1));
							explosionList.push(new explosion(circlePointX + 4 - mapShiftX, circlePointY - 4 - mapShiftY, 30, 7, 1));
							explosionList.push(new explosion(circlePointX - mapShiftX, circlePointY - mapShiftY, 30, 0, 2));
							return false;
						}	
					}
				}
			
			}
		}
	}
}


// checking if enemy shot me with its bullet
function checkEnemyBulletsAndMyShipCollision() {
	// if my ship still exists
	if (shields > 0) {
		// for all enemy bullets
		for(var i = enemyBulletList.length - 1; i >= 0; i--) {
			// for all of my ship's collision points
			for (var n = 0; n < collisionPoints.length; n++) {
				var deg = angle*Math.PI / 180;
				var shiftX = collisionPoints[n][0];
				var shiftY = collisionPoints[n][1];
				var circlePointX = 400 + Math.cos(deg)*shiftX - Math.sin(deg)*shiftY;
				var circlePointY = 300 + Math.sin(deg)*shiftX + Math.cos(deg)*shiftY;
				
				var dx = enemyBulletList[i].x - circlePointX;
				var dy = enemyBulletList[i].y - circlePointY;
				var distance = Math.sqrt(dx * dx + dy * dy);
				
				if (distance < 11) {
					explosionList.push(new explosion(enemyBulletList[i].x - mapShiftX, enemyBulletList[i].y - mapShiftY, 10, 0, 3));
					enemyBulletList.splice(i, 1);					
					// add sound of small explosion
					if (soundSettings == 1) { soundList.push(new sound('sound/smallExplosion.wav', 30, 1)); }
					// weaken my shields
					shields -= 5;
					// kill my ship if no shields left
					if (shields <= 0) {
						explosionList.push(new explosion(396 - mapShiftX, 295 - mapShiftY, 30, 3, 1));
						explosionList.push(new explosion(404 - mapShiftX, 296 - mapShiftY, 30, 7, 1));
						explosionList.push(new explosion(400 - mapShiftX, 300 - mapShiftY, 30, 0, 2));
						enemyBulletList.splice(i, 1);
					}
				}
				
			}
		}
	}
}


function checkFinishCollision() {
	for (var i = 0; i < collisionPoints.length; i++) {
		var deg = angle*Math.PI / 180;
		var shiftX = collisionPoints[i][0];
		var shiftY = collisionPoints[i][1];
		var circlePointX = 400 + Math.cos(deg)*shiftX - Math.sin(deg)*shiftY;
		var circlePointY = 300 + Math.sin(deg)*shiftX + Math.cos(deg)*shiftY;
						
		var circle={x:circlePointX,y:circlePointY,r:10};
		var rect={x:finishX + mapShiftX,y:finishY+mapShiftY,w:50,h:50};
						
		// if collision detected
		if (rectCircleColliding(circle, rect) == true) {
			return true;
		}	
	}
}


// checking if level failed
function checkIfLevelFailed() {
	// if level not failed yet
	if (levelFailed == false) {
		// if time counter active
		if (timeSettings[level] == 1) {
			if (shields <= 0) {
				levelFailed = true;
				levelEndTimer = 40;
				if (soundSettings == 1) { soundList.push(new sound('sound/bigExplosion.wav', 30, 1)); }
			}
			if (time <= 0) {
				levelFailed = true;
				levelEndTimer = 0;
			}
		}
		// if there's no time counter
		else if (timeSettings[level] == 0) {
			if (shields <= 0) {
				levelFailed = true;
				levelEndTimer = 40;
				if (soundSettings == 1) { soundList.push(new sound('sound/bigExplosion.wav', 30, 1)); }
			}
		}
	}
	
	// showing LEVEL FAILED box
	if (levelFailed == true) {
		if (levelEndTimer > 0) { levelEndTimer--; }
		if (levelEndTimer == 0) {
			ctx.strokeStyle = "rgba(127, 127, 127, 0.5)";
			ctx.strokeRect(179, 239, 442, 102);
			ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
			ctx.fillRect(180, 240, 440, 100);
			ctx.fillStyle = "#F10";
			ctx.textAlign = "center";
			ctx.font = "44px verdana";
			ctx.fillText("LEVEL FAILED", 400, 295);
			ctx.font = "22px verdana";
			ctx.fillText("Press ENTER to restart", 400, 320);
			
			window.addEventListener("keyup", keyUpLevelFailed);
		}
	}
}


// checking if level completed
function checkIfLevelCompleted() {

	// if level not completed and not failed yet
	if (levelCompleted == false && levelFailed == false) {
	
		// finish line present and no enemies
		if (finishX != -1000 && shootingSettings[level] == 0) {
			if (checkFinishCollision() == true) {
				levelCompleted = true;
				if (soundSettings == 1) { soundList.push(new sound('sound/levelCompleted.wav', 30, 1)); }
				levelEndTimer = 5;
			}
		}
		// finish line present and enemies present
		else if (finishX != -1000 && shootingSettings[level] == 1) {
			if (checkFinishCollision() == true && enemyList.length == 0) {
				levelCompleted = true;
				if (soundSettings == 1) { soundList.push(new sound('sound/levelCompleted.wav', 30, 1)); }
				levelEndTimer = 5;
			}
		}
		// no finish line and enemies present
		else if (finishX == -1000 && shootingSettings[level] == 1) {
			if (enemyList.length == 0) {
				levelCompleted = true;
				if (soundSettings == 1) { soundList.push(new sound('sound/levelCompleted.wav', 30, 1)); }
				levelEndTimer = 20;
			}
		}		
	}
	
	// showing LEVEL COMPLETED box
	if (levelCompleted == true) {
		if (levelEndTimer > 0) { levelEndTimer--; }
		if (levelEndTimer == 0) {
			// it wasn't the last level
			if (level != map.length-1) {
				ctx.strokeStyle = "rgba(127, 127, 127, 0.5)";
				ctx.strokeRect(179, 239, 442, 102);
				ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
				ctx.fillRect(180, 240, 440, 100);
				ctx.fillStyle = "#0A0";
				ctx.textAlign = "center";
				ctx.font = "44px verdana";
				ctx.fillText("LEVEL COMPLETED", 400, 295);
				ctx.font = "22px verdana";
				ctx.fillText("Press ENTER to continue", 400, 320);
			}
			// it was the last level
			else {
				ctx.strokeStyle = "rgba(127, 127, 127, 0.5)";
				ctx.strokeRect(109, 189, 582, 202);
				ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
				ctx.fillRect(110, 190, 580, 200);
				ctx.fillStyle = "#0A0";
				ctx.textAlign = "center";
				ctx.font = "44px verdana";
				ctx.fillText("ALL LEVELS COMPLETED!", 400, 237);
				ctx.font = "18px verdana";
				ctx.fillStyle = "#070";
				wrapText(ctx, "Congratulations! You've been doing pretty amazing things with that ship. We're truly impressed! With your skills... well, maybe you'd like to learn few caddets about how to operate a starship?", 400, 270, 560, 23);
				ctx.font = "22px verdana";
				ctx.fillStyle = "#0A0";
				ctx.fillText("Press Enter to exit", 400, 375);
			}
			
			window.addEventListener("keyup", keyUpLevelCompleted);
		}
	}
}


// checking if I'm not too far away from the map
function checkIfImNotTooFarAway() {
	if (mapShiftX-300 > 400 || mapShiftX+mapSizeX[level]*50+300 < 400 || mapShiftY-300 > 300 || mapShiftY+mapSizeY[level]*50+300 < 300) { 
		levelFailed = true;
		levelEndTimer = 0;
	}
}


// removing sounds that are already not played
function removeUnusedSounds() {
	for (var i = soundList.length - 1; i >= 0; i--) {
		// if sound is too old, I remove it
		if (soundList[i].lifeSpan == 0) {
			soundList.splice(i, 1);
		}
		// else I decrease it's life span
		else {
			soundList[i].lifeSpan--;
		}
	}
}


// play thruster sound when ship is using its engines
function playEngineSound() {
	if (levelCompleted == false && levelFailed == false) {
		if ( (keys["up"] == true && fuel > 0.5) || 
			 (keys["left"] == true && fuel > 0.1) || 
			 (keys["right"] == true && fuel > 0.1) || 
			 (keys["dot"] == true && fuel > 0.25) || 
			 (keys["comma"] == true && fuel > 0.25) || 
			 ( (keys["down"] == true && fuel > 0.2) && (speedChangeX != 0 || speedChangeY != 0 || angleChange != 0)) ) {
			engineSound.play();
		}
		else {
			engineSound.pause();
		}
	}
	else {
		engineSound.pause();
	}
}


// EVENT LISTENERS

function mouseClick(e) {
	mouseX = e.pageX - canvas.offsetLeft;
	mouseY = e.pageY - canvas.offsetTop;
	
	// mouse clicks for menu
	if (whatToDisplay == 0) {
		// click on NEW GAME
		if (mouseX >= 310 && mouseX <= 490 && mouseY >= 350 && mouseY <= 374) {
			whatToDisplay = 1;
			level = 0;
			needToLoadData = true;
			if (soundSettings == 1) { soundList.push(new sound('sound/click.wav', 30, 1)); }
		}
		// click on SELECT LEVEL
		else if (mouseX >= 310 && mouseX <= 490 && mouseY >= 385 && mouseY <= 409) {
			whatToDisplay = 2;
			if (soundSettings == 1) { soundList.push(new sound('sound/click.wav', 30, 1)); }
		}
		// click on ABOUT
		else if (mouseX >= 310 && mouseX <= 490 && mouseY >= 420 && mouseY <= 444) {
			whatToDisplay = 3;
			if (soundSettings == 1) { soundList.push(new sound('sound/click.wav', 30, 1)); }
		}
		// click on MUSIC: ON / OFF
		else if (mouseX >= 310 && mouseX <= 490 && mouseY >= 455 && mouseY <= 479) {
			if (soundSettings == 1) {
				soundSettings = 0;
				backgroundLoop.pause();
			}
			else {
				soundSettings = 1;
				if (soundSettings == 1) { soundList.push(new sound('sound/click.wav', 30, 1)); }
				backgroundLoop.play();
			}
		}
	}
	
	// SELECT LEVEL box
	else if (whatToDisplay == 2) {
		// checking if click was outside the level selection box
		if (mouseX > 651 || mouseX < 149 || mouseY > 501 || mouseY < 99) {
			whatToDisplay = 0;
			if (soundSettings == 1) { soundList.push(new sound('sound/click.wav', 30, 1)); }
		}
		
		// checking if any level was clicked
		else {
			// get actual top level from cookie file
			var levelsAvailable = 0;
			if (!getCookie("StarshipOperatorLevel")) {
				levelsAvailable = 0;
			}
			else {
				var levelsAvailable = Math.floor(getCookie("StarshipOperatorLevel"));
			}
			var levelPosX = 0;
			var levelPosY = 0;
			
			for(var i = 0; i <= levelsAvailable; i++) {
				levelPosX = 250 + 150*Math.floor(i/10);
				levelPosY = 190 + i%10*31;
				if (mouseX > levelPosX-45 &&  mouseX < levelPosX+45 && mouseY > levelPosY-18 && mouseY < levelPosY + 4) {
					whatToDisplay = 1;
					level = i;
					needToLoadData = true;
					if (soundSettings == 1) { soundList.push(new sound('sound/click.wav', 30, 1)); }
				}
			}				
		}
	}
	
	// ABOUT box
	else if (whatToDisplay == 3) {
		// cheking if click was outside the level selection box
		if (mouseX > 651 || mouseX < 149 || mouseY > 501 || mouseY < 99) {
			whatToDisplay = 0;
			if (soundSettings == 1) { soundList.push(new sound('sound/click.wav', 30, 1)); }
		}
	}
}


function mouseMove(e) {
	mouseX = e.pageX - canvas.offsetLeft;
	mouseY = e.pageY - canvas.offsetTop;
}


function keyDown(e) {
	if (e.keyCode == 37) {
		keys["left"] = true;
	}
	else if (e.keyCode == 39) {
		keys["right"] = true;
	}
	else if (e.keyCode == 38) {
		e.preventDefault();
		keys["up"] = true;
	}
	else if (e.keyCode == 40) {
		e.preventDefault();
		keys["down"] = true;
	}
	else if (e.keyCode == 32) {
		e.preventDefault();
		keys["space"] = true;
	}
	else if (e.keyCode == 188) {
		keys["comma"] = true;
	}
	else if (e.keyCode == 190) {
		keys["dot"] = true;
	}
	else if (e.keyCode == 17) {
		keys["ctrl"] = true;
	}
	else if (e.keyCode == 27) {
		keys["esc"] = true;
	}
}


function keyUp(e) {
	if (e.keyCode == 37) {
		keys["left"] = false;
	}
	else if (e.keyCode == 39) {
		keys["right"] = false;
	}
	else if (e.keyCode == 38) {
		keys["up"] = false;
	}
	else if (e.keyCode == 40) {
		keys["down"] = false;
	}
	else if (e.keyCode == 32) {
		keys["space"] = false;
	}
	else if (e.keyCode == 188) {
		keys["comma"] = false;
	}
	else if (e.keyCode == 190) {
		keys["dot"] = false;
	}
	else if (e.keyCode == 17) {
		keys["ctrl"] = false;
	}
	else if (e.keyCode == 27) {
		keys["esc"] = false;
	}
}


function keyUpLevelFailed(e) {
	if (e.keyCode == 13) {
		levelFailed = false;
		levelCompleted = false;
		loadLevelData(level);
		window.removeEventListener("keyup", keyUpLevelFailed);
	}
}


function keyUpLevelCompleted(e) {
	if (e.keyCode == 13) {
		levelCompleted = false;
		levelFailed = false;
		// if it's not the last level, go to next level
		if (level != map.length-1) {
			level++;
			loadLevelData(level);
		}
		// if it was the last level, go back to main menu
		else {
			whatToDisplay = 0;
			levelEndTimer = -1;
		}
		
		window.removeEventListener("keyup", keyUpLevelCompleted);
	}
}


// ---------------

// COOKIES

// set cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// get level number from cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}