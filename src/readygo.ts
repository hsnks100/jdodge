/// <reference path="../node_modules/phaser/types/phaser.d.ts"/>

import { GameScene } from "./Ksoogame.ts";
// import * as GameScene from './Ksoogame';
// import * as Factory from 'factory.ts';
// let games:GameScene = new GameScene('asdasd');
// GameScene

import * as global from './consts.ts';
export enum ReadyState {
    _1, _2, _3, _4
}



export class ReadyGoText extends Phaser.GameObjects.Container {

    // readyText: Phaser.GameObjects.BitmapText;

    state: ReadyState = ReadyState._1;
    readyText: any;
    public constructor(scene: Phaser.Scene) {
        super(scene); 
        // this.readyText = scene.add.text(global.WIDTH/2, global.HEIGHT/2, 'READY', {align:'center', fontSize: 100}); 
        // this.readyText.setAlign('center');
        // this.readyText.setOrigin(0.5);
        let bmpText:Phaser.GameObjects.BitmapText = scene.add.bitmapText(global.WIDTH/2, global.HEIGHT/2, 'carrier_command','READY');
        this.readyText = bmpText;
        bmpText.setOrigin(0.5);
        // bmpText.setDisplayOrigin(0.5);
        bmpText.setCenterAlign();
        // bmpText.setFontSize(100);
        // bmpText.setCenterAlign();
        this.add([this.readyText]);
        // this.add([bmpText, bmpText2]);

        var thiz = this;
        var tween = scene.tweens.add({
            targets: bmpText,
            loop: 0,
            onUpdateScope: this,
            onUpdate: function() {
            },
            onCompleteScope: this,
            onComplete: function() { 
                console.log(this);
                thiz.state = ReadyState._2;
            },
            onLoopParams: [],
            loopDelay: 0,
            fontSize: {value: 60, duration:1000, ease: 'Quad.easeInOut' },
            repeat: 0
        });

        var thiz = this;
        scene.input.keyboard.on('keydown', function (event) {
            console.log('key dddown');
            if(thiz.state == ReadyState._2) {
                thiz.state = ReadyState._3;
                thiz.scene.tweens.add({
                    targets: thiz.readyText,
                    loop: 0,
                    onUpdateScope: thiz,
                    onUpdate: function() {
                    },
                    onCompleteScope: thiz,
                    onComplete: function() { 
                        console.log(thiz);
                        // global.topScene.scene.remove('ksoo');
                        // thiz.scene.scene.remove('ksoo');
                        thiz.state = ReadyState._4;
                        // thiz.destroy(true);
                    },
                    onLoopParams: [],
                    loopDelay: 0,
                    fontSize: {value: 1, yoyo: false, duration:300, ease: 'Quad.easeInOut' },
                    repeat: 0
                });
            } 
        });
    }
    public isFinish() {
        return this.state == ReadyState._4;
    }

}
