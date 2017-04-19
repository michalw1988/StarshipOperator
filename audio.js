// preloading sounds
var backgroundLoop = new Audio();
backgroundLoop.ready = false;
backgroundLoop.addEventListener('canplaythrough', isAudioLoaded, false);
backgroundLoop.src = 'sound/loop.ogg';

var engineSound = new Audio();
engineSound.ready = false;
engineSound.addEventListener('canplaythrough', isAudioLoaded, false);
engineSound.src = 'sound/engine.wav';

var bigExplosionSound = new Audio();
bigExplosionSound.ready = false;
bigExplosionSound.addEventListener('canplaythrough', isAudioLoaded, false);
bigExplosionSound.src = 'sound/bigExplosion.wav';

var bonusSound = new Audio();
bonusSound.ready = false;
bonusSound.addEventListener('canplaythrough', isAudioLoaded, false);
bonusSound.src = 'sound/bonus.wav';

var clickSound = new Audio();
clickSound.ready = false;
clickSound.addEventListener('canplaythrough', isAudioLoaded, false);
clickSound.src = 'sound/click.wav';

var enemyLaserSound = new Audio();
enemyLaserSound.ready = false;
enemyLaserSound.addEventListener('canplaythrough', isAudioLoaded, false);
enemyLaserSound.src = 'sound/enemyLaser.wav';

var levelCompletedSound = new Audio();
levelCompletedSound.ready = false;
levelCompletedSound.addEventListener('canplaythrough', isAudioLoaded, false);
levelCompletedSound.src = 'sound/levelCompleted.wav';

var myLaserSound = new Audio();
myLaserSound.ready = false;
myLaserSound.addEventListener('canplaythrough', isAudioLoaded, false);
myLaserSound.src = 'sound/myLaser.wav';

var smallExplosionSound = new Audio();
smallExplosionSound.ready = false;
smallExplosionSound.addEventListener('canplaythrough', isAudioLoaded, false);
smallExplosionSound.src = 'sound/smallExplosion.wav';

var warpSound = new Audio();
warpSound.ready = false;
warpSound.addEventListener('canplaythrough', isAudioLoaded, false);
warpSound.src = 'sound/warp.wav';


function isAudioLoaded() {
	this.ready = true;
}


class sound {
	constructor(type, lifeSpan, volume) {
		
		this.lifeSpan = lifeSpan;
		
		var newSound = new Audio(type);
		/*
		var newSound;
		if (type == "bigExplosion") { newSound = bigExplosionSound; }
		else if (type == "bonus") { newSound = bonusSound; }
		else if (type == "click") { newSound = clickSound; }
		else if (type == "enemyLaser") { newSound = enemyLaserSound; }
		else if (type == "levelCompleted") { newSound = levelCompletedSound; }
		else if (type == "myLaser") { newSound = myLaserSound; }
		else if (type == "smallExplosion") { newSound = smallExplosionSound; }
		else if (type == "warp") { newSound = warpSound; }
		else { newSound = new Audio(type); }
		*/
		
		// checking if value (based on distance between me and enemy ship) is correctly define
		if (volume >= 0 && volume <= 1) { newSound.volume = volume; }
		else { newSound.volume = 1 };
		newSound.play();
	}
}