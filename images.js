var gameBackgroundImage = new Image();
gameBackgroundImage.ready = false;
gameBackgroundImage.onload = setAssetReady;
gameBackgroundImage.src = 'img/stars.jpg';

var gameTitleImage = new Image();
gameTitleImage.ready = false;
gameTitleImage.onload = setAssetReady;
gameTitleImage.src = 'img/title.png';

var shipImage = new Image();
shipImage.ready = false;
shipImage.onload = setAssetReady;
shipImage.src = 'img/ship.png';

var wallImage = new Image();
wallImage.ready = false;
wallImage.onload = setAssetReady;
wallImage.src = 'img/wall.png';

var finishImage = new Image();
finishImage.ready = false;
finishImage.onload = setAssetReady;
finishImage.src = 'img/finish.png';

var flameImage = new Image();
flameImage.ready = false;
flameImage.onload = setAssetReady;
flameImage.src = "img/flames.png";

var bonus1Image = new Image();
bonus1Image.ready = false;
bonus1Image.onload = setAssetReady;
bonus1Image.src = "img/bonus1.png";

var bonus2Image = new Image();
bonus2Image.ready = false;
bonus2Image.onload = setAssetReady;
bonus2Image.src = "img/bonus2.png";

var bonus3Image = new Image();
bonus3Image.ready = false;
bonus3Image.onload = setAssetReady;
bonus3Image.src = "img/bonus3.png";

var bonus4Image = new Image();
bonus4Image.ready = false;
bonus4Image.onload = setAssetReady;
bonus4Image.src = "img/bonus4.png";

var bonus5Image = new Image();
bonus5Image.ready = false;
bonus5Image.onload = setAssetReady;
bonus5Image.src = "img/bonus5.png";

var enemyImage = new Image();
enemyImage.ready = false;
enemyImage.onload = setAssetReady;
enemyImage.src = "img/enemy.png";

var menu1aImage = new Image();
menu1aImage.ready = false;
menu1aImage.onload = setAssetReady;
menu1aImage.src = "img/menu1a.png";

var menu2aImage = new Image();
menu2aImage.ready = false;
menu2aImage.onload = setAssetReady;
menu2aImage.src = "img/menu2a.png";

var menu3aImage = new Image();
menu3aImage.ready = false;
menu3aImage.onload = setAssetReady;
menu3aImage.src = "img/menu3a.png";

var menu4aImage = new Image();
menu4aImage.ready = false;
menu4aImage.onload = setAssetReady;
menu4aImage.src = "img/menu4a.png";

var menu5aImage = new Image();
menu5aImage.ready = false;
menu5aImage.onload = setAssetReady;
menu5aImage.src = "img/menu5a.png";

var menu1bImage = new Image();
menu1bImage.ready = false;
menu1bImage.onload = setAssetReady;
menu1bImage.src = "img/menu1b.png";

var menu2bImage = new Image();
menu2bImage.ready = false;
menu2bImage.onload = setAssetReady;
menu2bImage.src = "img/menu2b.png";

var menu3bImage = new Image();
menu3bImage.ready = false;
menu3bImage.onload = setAssetReady;
menu3bImage.src = "img/menu3b.png";

var menu4bImage = new Image();
menu4bImage.ready = false;
menu4bImage.onload = setAssetReady;
menu4bImage.src = "img/menu4b.png";

var menu5bImage = new Image();
menu5bImage.ready = false;
menu5bImage.onload = setAssetReady;
menu5bImage.src = "img/menu5b.png";

function setAssetReady() {
	this.ready = true;
}