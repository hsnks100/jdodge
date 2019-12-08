/// <reference path="../node_modules/phaser/types/phaser.d.ts"/>

const Phaser = require('phaser');
// import Phaser from 'phaser';



var centerY = 32 * 20 / 2.0;
var centerX = 32 * 10 / 2.0;


// var playerSprite = null;

var frameNumber = 0;
var bulletGenInterval = 15;

const wall = require('./assets/wall.png');
const tail = require('./assets/tail_bullet.png');
const player = require('./assets/player.png');
// import wall from './assets/wall.png'
// import tail from '.assets/tail_bullet.png'
// import player from './assets/player.png'


// export const haha:number = 3;

export  class GameScene extends Phaser.Scene {
    playerSpeed = 3; 
    
    playerSprite!: Phaser.GameObjects.Image;
    upKey : any = null;
    downKey : any = null;
    leftKey : any = null;
    rightKey : any = null;
    public constructor(some:string) { 
        
        super(some); // game, 0, 0, arrow);
        console.log("phaser: ctr");
        // bulletSprites = Phaser.GameObjects.Image[];
    }
    bulletSprites : any = [];
    public create = ()=>{       
        console.log("phaser: create()");
        this.playerSprite = this.add.image(0, 0, 'player');
        this.playerSprite!.scaleX = 0.2;
        this.playerSprite.scaleY = 0.2;
        this.playerSprite.y = 200;
        this.playerSprite.x = 200;
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    public preload = () => {
        this.load.image('wall', wall);
        this.load.image('tail', tail);
        this.load.image('player', player);
        
    }
    public update = () => {
        console.log("phaser: update()");
        this.inputProcess();
        this.moveBullets();
        // collisionDetect(); 
        this.generator();
    }
    public inputProcess = () => {
        if(this.upKey.isDown) {
            this.playerSprite.y -= this.playerSpeed;
        }
        if(this.downKey.isDown) {
            this.playerSprite.y += this.playerSpeed;
        }
        if(this.leftKey.isDown) {
            this.playerSprite.x -= this.playerSpeed;
        }
        if(this.rightKey.isDown) {
            this.playerSprite.x += this.playerSpeed;
        } 
    }
    public createBullet = () => {
        var s = this.add.image(0, 0, 'tail');
        s.anchorX = 0.5;
        s.anchorY = 0.5;
        s.custom = {};
        s.custom.radius = 10;
        var sign1 = Math.random() > 0.5 ? 1 : -1;
        var sign2 = Math.random() > 0.5 ? 1 : -1;

        var randomAngle = Math.random() * Math.PI * 2;
        var randomY = Math.cos(randomAngle) * centerY;
        var randomX = Math.sin(randomAngle) * centerX;
        s.y = centerY + randomY;
        s.x = centerX + randomX;
        var dx = this.playerSprite.x - s.x;
        var dy = this.playerSprite.y - s.y;
        s.custom.angle = Math.atan2(dy, dx);
        s.custom.speed = 1 + Math.random() * 2;
        s.custom.aim = true;
        this.bulletSprites.push(s);
    }
    public moveBullets = ()=> {
        for(var bi in this.bulletSprites) {
            var b = this.bulletSprites[bi];
            var yDiff = (b.y - this.playerSprite.y);
            yDiff *= yDiff;
    
            var xDiff = (b.x - this.playerSprite.x);
            xDiff *= xDiff; 
            var distance = yDiff + xDiff; 
            var dx = this.playerSprite.x - b.x;
            var dy = this.playerSprite.y - b.y; 
            if(b.custom.aim) {
                if(distance < 30000) {
                    console.log("near!");
                    b.custom.aim = false;
                    b.custom.angle = Math.atan2(dy, dx); 
                }
            }
            b.angle = (b.custom.angle) * 180 / Math.PI + 90;
            b.x += b.custom.speed * Math.cos(b.custom.angle);
            b.y += b.custom.speed * Math.sin(b.custom.angle);
        }
    } 

    public generator = ()=> {
    frameNumber++;
    if(frameNumber % bulletGenInterval == 5) {
        this.createBullet();
    }
}


}



// gameScene.create = function() { 
//     console.log("phaser: create()");
//     playerSprite = this.add.image(0, 0, 'player');
//     playerSprite.scaleX = 0.2; 
//     playerSprite.scaleY = 0.2; 
//     playerSprite.y = 200;
//     playerSprite.x = 200;
//     playerSprite.anchorX = 0.5; 
//     playerSprite.anchorY = 0.5; 

//     upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
//     downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
//     leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
//     rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
//     // downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
//     // leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
//     // rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
//     this.add.image(30, 45, 'mushroom');
//     this.add.image(60, 45, 'mushroom').setAngle(20);
    
//     for(var i=0; i<1; i++) {
//         //createBullet();
//     }
// } 

// import blueButton1 from './assets/logo.png';
// gameScene.preload = function() { 
//     this.load.image('wall', wall);
//     this.load.image('tail', tail);
//     this.load.image('player', player);
//     this.load.image('mushroom', blueButton1); // 'assets/pics/akira.jpg');
// }

// gameScene.update = function() {
//     console.log("phaser: update()");
//     inputProcess(); 
//     moveBullets(); 
//     // collisionDetect(); 
//     generator(); 
// }
// function createBullet() { 
//     var s = gameScene.add.image(0, 0, 'tail'); 
//     s.anchorX = 0.5;
//     s.anchorY = 0.5;
//     s.custom = {};
//     s.custom.radius = 10;
//     var sign1 = Math.random() > 0.5 ? 1 : -1;
//     var sign2 = Math.random() > 0.5 ? 1 : -1;

//     var randomAngle = Math.random() * Math.PI * 2;
//     var randomY = Math.cos(randomAngle) * centerY;
//     var randomX = Math.sin(randomAngle) * centerX;
//     s.y = centerY + randomY;
//     s.x = centerX + randomX;
//     var dx = playerSprite.x - s.x;
//     var dy = playerSprite.y - s.y; 
//     s.custom.angle = Math.atan2(dy, dx); 
//     s.custom.speed = 1 + Math.random() * 2;
//     s.custom.aim = true;
//     bulletSprites.push(s); 
// }

// function collisionDetect() {
//     for(var bi in bulletSprites) {
//         var b = bulletSprites[bi]; 
//         var yDiff = (b.y - playerSprite.y);
//         yDiff *= yDiff;

//         var xDiff = (b.x - playerSprite.x);
//         xDiff *= xDiff; 
//         var distance = yDiff + xDiff; 
//         if(distance <= 15) {
//             //window.alert("puuuuung");
//         }
//     }
// }

// function moveBullets() {
//     for(var bi in bulletSprites) {
//         var b = bulletSprites[bi];
//         var yDiff = (b.y - playerSprite.y);
//         yDiff *= yDiff;

//         var xDiff = (b.x - playerSprite.x);
//         xDiff *= xDiff; 
//         var distance = yDiff + xDiff; 
//         var dx = playerSprite.x - b.x;
//         var dy = playerSprite.y - b.y; 
//         if(b.custom.aim) {
//             if(distance < 30000) {
//                 console.log("near!");
//                 b.custom.aim = false;
//                 b.custom.angle = Math.atan2(dy, dx); 
//             }
//         }
//         b.angle = (b.custom.angle) * 180 / Math.PI + 90;
//         b.x += b.custom.speed * Math.cos(b.custom.angle);
//         b.y += b.custom.speed * Math.sin(b.custom.angle);
//     }
// } 

// function inputProcess() {
//     if(upKey.isDown) {
//         playerSprite.y -= playerSpeed;
//     }
//     if(downKey.isDown) {
//         playerSprite.y += playerSpeed;
//     }
//     if(leftKey.isDown) {
//         playerSprite.x -= playerSpeed;
//     }
//     if(rightKey.isDown) {
//         playerSprite.x += playerSpeed;
//     } 
// }

// function generator() {
//     frameNumber++;
//     if(frameNumber % bulletGenInterval == 5) {
//         createBullet();
//     }
// }



