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

class Bullet extends Phaser.GameObjects.Image {
    target!: Player;
    public constructor(scene:Phaser.Scene, texture:string) {
        super(scene, 0, 0, texture);
        scene.add.existing(this);
        // super(scene, 0,);
        console.log(3);
    }
    public setTarget(player: Player) {
        this.target = player;
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
        var deltaAngle = 0.08;
        var dstAngle = Math.atan2(dy, dx);

        var diff = Math.atan2(Math.sin(dstAngle - b.custom.angle), Math.cos(dstAngle - b.custom.angle));
        console.log("diff: ", diff);
        if(diff < deltaAngle) {
        } else {
        }
        if(Math.atan2(dy, dx) < b.custom.angle) {
            b.custom.angle -= deltaAngle;
        } else {
            b.custom.angle += deltaAngle;
        } 
        // b.custom.angle = Math.atan2(dy, dx);
        // console.log(b.custom.angle);
        // if(DIST(b.x, b.y, global.WIDTH / 2, global.HEIGHT / 2) > 500) {
        if(DIST(b.x, b.y, global.WIDTH / 2, global.HEIGHT / 2) > global.WIDTH / 2 + 100) {
            this.destroy(); 
        } else {
            b.x += b.custom.speed * Math.cos(b.custom.angle);
            b.y += b.custom.speed * Math.sin(b.custom.angle);
        }
    }

    public custom: any;
}

export  class GameScene extends Phaser.Scene {
    
    playerSprite!: Player;
    bulletSprites : Bullet[] = [];
    public constructor(some:string) { 
        
        
        super(some); // game, 0, 0, arrow);
        console.log("phaser: ctr2");
        var config = {
            type: Phaser.AUTO,
            width: global.WIDTH *2,
            height: global.HEIGHT *2,
            scene: this
        };

        var game = new Phaser.Game(config);
    }
    public preload = () => {
        // this.load.image('wall', wall);
        this.load.image('tail', 'assets/tail_bullet.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('wall', 'assets/wall.png');
        
    }
    public create = ()=>{       
        console.log("phaser: create()");
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
        // this.generator();
    }
    public createBullet = () => {
        // let s : Bullet = this.add.image(0, 0, 'tail');
        let s : Bullet = new Bullet(this, 'wall'); // this.add.image(0, 0, 'tail');
        // s.anchorX = 0.5;
        // s.anchorY = 0.5;
        s.custom = {};

        var randomAngle = Math.random() * Math.PI * 2;
        var centerY = global.HEIGHT / 2;
        var centerX = global.WIDTH / 2;
        var randomY = Math.sin(randomAngle) * global.WIDTH / 2;
        var randomX = Math.cos(randomAngle) * global.WIDTH / 2;
        s.y = centerY + randomY;
        s.x = centerX + randomX;
        var dx = this.playerSprite.x - s.x;
        var dy = this.playerSprite.y - s.y;
        s.custom.angle = Math.atan2(dy, dx);
        s.custom.speed = 1 + Math.random() * 2;
        s.custom.aim = true;
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

