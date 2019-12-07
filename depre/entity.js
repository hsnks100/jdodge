var game = new Phaser.Game(32*10, 32 * 20, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update }); 


var centerY = 32 * 20 / 2.0;
var centerX = 32 * 10 / 2.0;

var bulletSprites = [];
var playerSprite = null;

var upKey = null;
var downKey = null;
var leftKey = null;
var rightKey = null;
var playerSpeed = 3; 
var frameNumber = 0;
var bulletGenInterval = 15;

function preload() { 
    game.load.image('wall', 'wall.png'); 
    game.load.image('tail', 'tail_bullet.png'); 
    game.load.image('player', 'player.png'); 
}

function createBullet() { 
    var s = game.add.sprite(0, 0, 'tail'); 
    s.anchor.x = 0.5;
    s.anchor.y = 0.5;
    s.custom = {};
    s.custom.radius = 10;
    var sign1 = Math.random() > 0.5 ? 1 : -1;
    var sign2 = Math.random() > 0.5 ? 1 : -1;

    var randomAngle = Math.random() * Math.PI * 2;
    var randomY = Math.cos(randomAngle) * centerY;
    var randomX = Math.sin(randomAngle) * centerX;
    s.position.y = centerY + randomY;
    s.position.x = centerX + randomX;
    var dx = playerSprite.position.x - s.position.x;
    var dy = playerSprite.position.y - s.position.y; 
    s.custom.angle = Math.atan2(dy, dx); 
    s.custom.speed = 1 + Math.random() * 2;
    s.custom.aim = true;
    bulletSprites.push(s); 
}

function collisionDetect() {
    for(var bi in bulletSprites) {
        var b = bulletSprites[bi]; 
        var yDiff = (b.position.y - playerSprite.position.y);
        yDiff *= yDiff;

        var xDiff = (b.position.x - playerSprite.position.x);
        xDiff *= xDiff; 
        var distance = yDiff + xDiff; 
        if(distance <= 15) {
            //window.alert("puuuuung");
        }
    }
}

function moveBullets() {
    for(var bi in bulletSprites) {
        var b = bulletSprites[bi];
        var yDiff = (b.position.y - playerSprite.position.y);
        yDiff *= yDiff;

        var xDiff = (b.position.x - playerSprite.position.x);
        xDiff *= xDiff; 
        var distance = yDiff + xDiff; 
        var dx = playerSprite.position.x - b.position.x;
        var dy = playerSprite.position.y - b.position.y; 
        if(b.custom.aim) {
            if(distance < 30000) {
                console.log("near!");
                b.custom.aim = false;
                b.custom.angle = Math.atan2(dy, dx); 
            }
        }
        b.angle = (b.custom.angle) * 180 / Math.PI + 90;
        b.position.x += b.custom.speed * Math.cos(b.custom.angle);
        b.position.y += b.custom.speed * Math.sin(b.custom.angle);
    }
} 

function inputProcess() {
    if(upKey.isDown) {
        playerSprite.position.y -= playerSpeed;
    }
    if(downKey.isDown) {
        playerSprite.position.y += playerSpeed;
    }
    if(leftKey.isDown) {
        playerSprite.position.x -= playerSpeed;
    }
    if(rightKey.isDown) {
        playerSprite.position.x += playerSpeed;
    } 
}

function generator() {
    frameNumber++;
    if(frameNumber % bulletGenInterval == 5) {
        createBullet();
    }
}

function update() {
    inputProcess(); 
    moveBullets(); 
    collisionDetect(); 
    generator(); 
    //console.log(frameNumber); 

}

function create() { 
    playerSprite = game.add.sprite(0, 0, 'player'); 
    playerSprite.scale.x = 0.2; 
    playerSprite.scale.y = 0.2; 
    playerSprite.position.y = 32 * 19; 
    playerSprite.position.x = 32; 
    playerSprite.anchor.x = 0.5; 
    playerSprite.anchor.y = 0.5; 
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    
    for(var i=0; i<1; i++) {
        //createBullet();
    }
} 

