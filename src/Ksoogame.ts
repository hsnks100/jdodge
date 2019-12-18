/// <reference path="../node_modules/phaser/types/phaser.d.ts"/>

// const Phaser = require('phaser');
// import Phaser from 'phaser';
import {Player} from './player.ts'; 
import * as global from './consts.ts';
// import Phaser from 'phaser';




// var playerSprite = null;

var frameNumber = 0;
var bulletGenInterval = 15;

// const wall = require('./assets/wall.png');
// const tail = require('./assets/tail_bullet.png');
// const player = require('./assets/player.png');
// import wall from './assets/wall.png'
// import tail from '.assets/tail_bullet.png'
// import player from './assets/player.png'



// export const haha:number = 3;

function DIST(x:number, y:number, x2:number, y2:number): number {
    return Math.sqrt( (x2 - x) * (x2 - x) + (y2 - y) * (y2 - y) );
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

class Bullet extends Phaser.GameObjects.Image {
    target!: Player;
    dir!: Phaser.GameObjects.Image;
    deltaAngle: number = 0.0;
    public custom: any;
    public constructor(scene:Phaser.Scene) {
        super(scene, 0, 0, '');
        var newSpeed = 2 + Math.random() * 4;
        if(Math.random() >= 0.9) {
            newSpeed = 4 + Math.random() * 2;
            this.setTexture('bullet_red');
            // super(scene, 0, 0, 'bullet_red');
        } else {
            newSpeed = 2 + Math.random() * 1;
            this.setTexture('wall');
            // super(scene, 0, 0, 'wall');
        }
        

        this.deltaAngle = getRandomArbitrary(0.01, 0.025);
        this.custom = {};
        this.custom.speed = newSpeed;

        scene.add.existing(this);
        this.dir = scene.add.image(0, 0, 'wall');
        this.dir.scale = 0.1;

        var randomAngle = Math.random() * Math.PI * 2;
        var centerY = global.HEIGHT / 2;
        var centerX = global.WIDTH / 2;
        var randomY = Math.sin(randomAngle) * global.HEIGHT / 2;
        var randomX = Math.cos(randomAngle) * global.HEIGHT / 2;
        this.y = centerY + randomY;
        this.x = centerX + randomX;
        this.custom.aim = true;
        // super(scene, 0,);
        console.log(3);
    }
    public setTarget(player: Player) {
        this.target = player;
        var dx = this.target.x - this.x;
        var dy = this.target.y - this.y;
        this.custom.angle = Math.atan2(dy, dx);
    }
    public update() {
        var b = this;
        var yDiff = (b.y - this.target.y);
        yDiff *= yDiff;

        var xDiff = (b.x - this.target.x);
        xDiff *= xDiff; 
        var distance = yDiff + xDiff; 
        var dx = this.target.x - b.x;
        var dy = this.target.y - b.y; 
        if(b.custom.aim) {
            if(distance < 30000) {
                console.log("near!");
                b.custom.aim = false;
                // b.custom.angle = Math.atan2(dy, dx); 
            }
        }
        // console.log(b.custom.angle, " -> ", (b.custom.angle + Math.atan2(dy, dx)) / 5.0);
        // b.custom.angle = (b.custom.angle + Math.atan2(dy, dx)) / 5.0; // (b.custom.angle) * 180 / Math.PI + 90;
        // console.log(b.custom.angle, " -> ", Math.atan2(dy, dx));
        var dstAngle = Math.atan2(dy, dx); 
        var diff = Math.atan2(Math.sin(dstAngle - b.custom.angle), Math.cos(dstAngle - b.custom.angle));
        // console.log("diff: ", diff * 180 / Math.PI);
        var deltaAngle = this.deltaAngle;
        if(Math.abs(diff) > Math.PI / 2) {
        } else {
            if(diff >= 0) {
                b.custom.angle += deltaAngle;
            } else {
                b.custom.angle -= deltaAngle;
            }
        }
        // if(Math.atan2(dy, dx) < b.custom.angle) {
        //     b.custom.angle -= deltaAngle;
        // } else {
        //     b.custom.angle += deltaAngle;
        // } 
        // b.custom.angle = Math.atan2(dy, dx);
        // console.log(b.custom.angle);
        // if(DIST(b.x, b.y, global.WIDTH / 2, global.HEIGHT / 2) > 500) {
        if(DIST(b.x, b.y, global.WIDTH / 2, global.HEIGHT / 2) > global.WIDTH / 2 + 100) {
            this.destroy(); 
            this.dir.destroy();
        } else {
            // b.custom.angle = 90 * Math.PI / 180.0;
            b.setRotation(b.custom.angle);
            b.x += b.custom.speed * Math.cos(b.custom.angle);
            b.y += b.custom.speed * Math.sin(b.custom.angle);
        }
        this.dir.setRotation(dstAngle);
        this.dir.x = b.x;
        this.dir.y = b.y; 
    }

}

export  class GameScene extends Phaser.Scene {
    
    playerSprite!: Player;
    bulletSprites : Bullet[] = [];
    public constructor(some:string) { 
        
        
        super(some); // game, 0, 0, arrow);
        console.log("phaser: ctr2");
        var config = {
            type: Phaser.AUTO,
            width: global.WIDTH,
            height: global.HEIGHT,
            scene: this
        };

        var game = new Phaser.Game(config);
    }
    public preload = () => {
        // this.load.image('wall', wall);
        this.load.image('tail', 'assets/tail_bullet.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('bullet_red', 'assets/bullet_red.png');
        this.load.image('circle', 'assets/circle.png');
        
    }
    public create = ()=>{       
        console.log("phaser: create()");
        var back = this.add.image(0, 0, 'circle');
        back.x = global.WIDTH / 2;
        back.y = global.HEIGHT / 2;
        let s : Player = new Player(this, 'player'); // this.add.image(0, 0, 'tail');
        s.scaleX = 0.2;
        s.scaleY = 0.2;
        s.x = global.WIDTH / 2;
        s.y = global.HEIGHT / 2;
        this.playerSprite = s;
        this.createBullet();
        // this.playerSprite = this.add.image(0, 0, 'player');
        // this.playerSprite!.scaleX = 0.2;
        // this.playerSprite.scaleY = 0.2;
        // this.playerSprite.y = 200;
        // this.playerSprite.x = 200;
    }
    public update = () => {
        this.playerSprite.update();
        var i = this.bulletSprites.length;
        while (i--) {
            this.bulletSprites[i].update();
            if(this.bulletSprites[i].active == false) {
                this.bulletSprites.splice(i, 1); 
            } 
        }
        // collisionDetect(); 
        this.generator();
    }
    public createBullet = () => {
        // let s : Bullet = this.add.image(0, 0, 'tail');
        let s : Bullet = new Bullet(this);
        // s.anchorX = 0.5;
        // s.anchorY = 0.5;
        s.setTarget(this.playerSprite);
        this.bulletSprites.push(s);

        // var ksoo = this.add.image(0, 0, 'wall');
        // ksoo.x = s.x;
        // ksoo.y = s.y;
    }

    public generator = ()=> {
        frameNumber++;
        if(frameNumber % bulletGenInterval == 5) {
            this.createBullet();
        }
    }


}

