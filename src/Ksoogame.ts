/// <reference path="../node_modules/phaser/types/phaser.d.ts"/>

// const Phaser = require('phaser');
// import Phaser from 'phaser';
import {Player} from './player.ts'; 
import {ReadyGoText, ReadyState} from './readygo.ts'; 
import * as global from './consts.ts';

// import Phaser from 'phaser';


import {XorShift32} from './XorShift32.js';


let rng1 : XorShift32 = new XorShift32();
rng1.seed(333); // , 2);
//

for(var i=0; i<100; i++) {
    console.log(rng1.randint());
}
//
//


// var playerSprite = null;

let frameNumber:number = 0;
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
    currentFrame : number = 0;
    delayFrame : number = 160;
    scene: GameScene;
    public custom: any;
    startAngle : number = 0.0;

    public constructor(scene:GameScene, radius: number, randomObject : any) {
        super(scene, 0, 0, '');
        this.scene = scene;
        var newSpeed = 2 + Math.random() * 4;

        if(Math.random() >= 0.95) {
            // fast
            newSpeed = 4 + Math.random() * 2;
            this.setTexture('bullet_red');
        } else {
            // slow 
            newSpeed = 2 + Math.random() * 1;
            this.setTexture('wall');
        }
        

        this.deltaAngle = getRandomArbitrary(0.005, 0.020);
        this.custom = {};
        this.custom.speed = newSpeed;

        scene.add.existing(this);
        this.dir = scene.add.image(0, 0, 'wall');
        this.dir.scale = 0.1;

        this.startAngle = Math.random() * Math.PI * 2;
        var centerY = global.HEIGHT / 2;
        var centerX = global.WIDTH / 2;
        var randomY = Math.sin(this.startAngle) * radius;
        var randomX = Math.cos(this.startAngle) * radius;
        this.y = centerY + randomY;
        this.x = centerX + randomX;
        this.custom.aim = true;
        // super(scene, 0,);
    }
    public setTarget(player: Player) {
        this.target = player;
        var dx = this.target.x - this.x;
        var dy = this.target.y - this.y;
        this.custom.angle = Math.atan2(dy, dx);
    }
    public update() {
        this.currentFrame++;
        if(this.delayFrame <= this.currentFrame) {
            var b = this;
            var yDiff = (b.y - this.target.y);
            yDiff *= yDiff;

            var xDiff = (b.x - this.target.x);
            xDiff *= xDiff; 
            var distance = yDiff + xDiff; 
            var dx = this.target.x - b.x;
            var dy = this.target.y - b.y; 
            if(distance < 70) {
                console.log("near!");
                this.target.live = false;
            }
            var dstAngle = Math.atan2(dy, dx); 
            var diff = Math.atan2(Math.sin(dstAngle - b.custom.angle), Math.cos(dstAngle - b.custom.angle));
            var deltaAngle = this.deltaAngle;
            if(Math.abs(diff) > Math.PI / 2) {
            } else {
                if(diff >= 0) {
                    b.custom.angle += deltaAngle;
                } else {
                    b.custom.angle -= deltaAngle;
                }
            }
            if(DIST(b.x, b.y, global.WIDTH / 2, global.HEIGHT / 2) > global.WIDTH / 2 + 100) {
                this.destroy(); 
                this.dir.destroy();
            } else {
                b.setRotation(b.custom.angle);
                b.x += b.custom.speed * Math.cos(b.custom.angle);
                b.y += b.custom.speed * Math.sin(b.custom.angle);
            }
            this.dir.setRotation(dstAngle);
            this.dir.x = b.x;
            this.dir.y = b.y; 
        } else {
            var centerY = global.HEIGHT / 2;
            var centerX = global.WIDTH / 2;
            var randomY = Math.sin(this.startAngle) * this.scene.boundaryRadius;
            var randomX = Math.cos(this.startAngle) * this.scene.boundaryRadius;
            this.y = centerY + randomY;
            this.x = centerX + randomX;
        }

    }

}

export class EmptyScene extends Phaser.Scene {
    public constructor(some:string) { 
        super(some); // game, 0, 0, arrow);
        console.log("phaser: ctr2");
        var config = {
            type: Phaser.AUTO,
            width: global.WIDTH,
            height: global.HEIGHT,
            fps: {
                target: 60
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            parent: 'phaser-example',
            scene: this
        };
        var game = new Phaser.Game(config);

    }
    public create() {
        console.log("phaser: create()");
        var gs = new GameScene('tt');
        var config = {
            key: 'intro',
            type: Phaser.AUTO,
            width: global.WIDTH,
            height: global.HEIGHT,
            scene: gs
        };
        // this.scene.add('ksoo', new GameScene('tt'), true);
        this.scene.add('ksoo1', new GameScene('tt'), true);
        // this.scene.add('ksoo', config, true);
    }
}

enum GameStep {
    before,
    playing,
    die 
}

export  class GameScene extends Phaser.Scene {
    step: GameStep = GameStep.playing; 
    readyText!: ReadyGoText;
    playerSprite!: Player;
    bulletSprites : Bullet[] = [];
    timeDisplay!: Phaser.GameObjects.BitmapText;
    boundary! : Phaser.GameObjects.Graphics;
    boundaryRadius : number = global.HEIGHT / 2 - 50;
    boundaryTween! : Phaser.Tweens.Tween;
    circleImage! : Phaser.GameObjects.Image;
    gameRecords : any = {};
    randomObject : any = new XorShift32();


    public constructor(some:string) { 
        
        
        super(some); // game, 0, 0, arrow);
        // console.log("phaser: ctr2");
        // var config = {
        //     type: Phaser.AUTO,
        //     width: global.WIDTH,
        //     height: global.HEIGHT,
        //     scene: this
        // };
        // this.scene.scene.add('ksoo', config, true);
        // var game = new Phaser.Game(config);
    }
    public preload = () => {
        // this.load.image('wall', wall);
        this.load.image('tail', 'assets/tail_bullet.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('bullet_red', 'assets/bullet_red.png');
        this.load.image('circle', 'assets/frame.png');
        this.load.bitmapFont('carrier_command', 'assets/carrier_command.png', 'assets/carrier_command.xml');
        this.load.bitmapFont('gothic', 'assets/fonts/bitmap/gothic.png', 'assets/fonts/bitmap/gothic.xml');
        
    }
    public initGame() {
        // this.scale.setZoom(0.8); // (0.8);

        this.randomObject.seed(Math.floor(Math.random() % 10000));
        this.boundary = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }});


        this.circleImage = this.add.image(0, 0, 'circle');
        this.circleImage.x = global.WIDTH / 2;
        this.circleImage.y = global.HEIGHT / 2;
        this.timeDisplay = this.add.bitmapText(global.WIDTH/2, 30, 'carrier_command', '00:00');
        this.timeDisplay.setCenterAlign();
        this.timeDisplay.setOrigin(0.5);
        let s : Player = new Player(this, 'player'); // this.add.image(0, 0, 'tail');
        s.scaleX = 0.2;
        s.scaleY = 0.2;
        s.x = global.WIDTH / 2;
        s.y = global.HEIGHT / 2;
        this.playerSprite = s;
        this.createBullet();

        this.readyText = new ReadyGoText(this); 
        this.add.existing(this.readyText);
        // bmpText.input.enabled = true;

        for(let i=0; i<10; i++) {
            this.createBullet();
        }

        this.boundaryTween = this.tweens.add({
            targets: this,
            loop: 0,
            onUpdateScope: this,
            onUpdate: function() {
            },
            onCompleteScope: this,
            onComplete: function() { 
                // console.log(this);
                // thiz.state = ReadyState._2;
            },
            onLoopParams: [],
            loopDelay: 0,
            boundaryRadius: {value: global.HEIGHT / 3, yoyo: true, duration:5000, ease: 'Quad.easeInOut' },
            repeat: -1
        });
        this.boundaryTween.pause();

        this.gameRecords["SEED"] = 99;
        this.gameRecords["inputs"] = [];
    }
    public create() {
        console.log("phaser: create()");
        this.initGame(); 
        // bmpText.inputEnabled = true; 
        // this.playerSprite = this.add.image(0, 0, 'player');
        // this.playerSprite!.scaleX = 0.2;
        // this.playerSprite.scaleY = 0.2;
        // this.playerSprite.y = 200;
        // this.playerSprite.x = 200;
    }
    // circle : any;
    public update() {
        var circle = new Phaser.Geom.Circle(global.WIDTH / 2, global.HEIGHT / 2, this.boundaryRadius);
        this.boundary.clear();
        this.boundary.lineStyle(4, 0xff0000);
        this.boundary.strokeCircleShape(circle);
        // this.circleImage.setScale(this.boundaryRadius / 1000.0);
        // console.log(this.boundaryRadius);
        this.circleImage.setScale(1000 / 1500.0);
        // this.circleImage.setScale(this.boundaryRadius / 1000); 
        if(this.readyText.isFinish()) {
            if(this.step == GameStep.playing) {
                if(this.boundaryTween.isPaused()) {
                    this.boundaryTween.play();
                }

                var i = this.bulletSprites.length;
                while (i--) {
                    this.bulletSprites[i].update();
                    if(this.bulletSprites[i].active == false) {
                        this.bulletSprites.splice(i, 1); 
                    } 
                }
                this.playerSprite.update(this.gameRecords);
                if(DIST(this.playerSprite.x, this.playerSprite.y, circle.x, circle.y) > this.boundaryRadius) {
                    this.playerSprite.live = false;
                }

                if(this.playerSprite.live == false) {
                    console.log(JSON.stringify(this.gameRecords));
                    this.step = GameStep.die;
                    var thiz = this;
                    var xhr = new XMLHttpRequest();
                    if(!xhr) {
                        alert("can not create XHR instance");
                        return false;
                    } 
                    var base_url = "https://jdodge-1203598482.ap-northeast-2.elb.amazonaws.com/jdodge/service?cmd=addRank&name=kso&score=" + frameNumber; 
                    xhr.open('get', base_url);
                    xhr.send(); 
                }
                // collisionDetect(); 
                this.generator();
            } else if(this.step == GameStep.die) {
                this.boundaryTween.pause();
            }
        }
    }
    public createBullet = () => {
        // let s : Bullet = this.add.image(0, 0, 'tail');
        let s : Bullet = new Bullet(this, this.boundaryRadius, this.randomObject);
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
        let remain = Math.floor((frameNumber % 60) / 60.0 * 100.0);
        let seconds = Math.floor(frameNumber/60.0);
        let remainStr = '';
        let secondsStr = '';
        if(remain < 10) {
            remainStr = '0' + remain;
        } else {
            remainStr = '' + remain;
        }
        if(seconds < 10) {
            secondsStr = '0' + seconds;
        } else {
            secondsStr = '' + seconds;
        }

        this.timeDisplay.setText(secondsStr + ':' + remainStr);
        if(frameNumber == 500) {
            // this.scene.restart();
        }
        if(frameNumber % bulletGenInterval == 5) {
            this.createBullet();
        }
    }


}

