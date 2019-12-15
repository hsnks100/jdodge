// import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Image {
    upKey! : Phaser.Input.Keyboard.Key;
    downKey! : Phaser.Input.Keyboard.Key;
    leftKey! : Phaser.Input.Keyboard.Key;
    rightKey! : Phaser.Input.Keyboard.Key;
    playerSpeed : number = 3; 
    public constructor(scene:Phaser.Scene, texture:string) {
        super(scene, 0, 0, texture);
        scene.add.existing(this);
        this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // super(scene, 0,);
    }
    public update() {
        if(this.upKey.isDown) {
            this.y -= this.playerSpeed;
        }
        if(this.downKey.isDown) {
            this.y += this.playerSpeed;
        }
        if(this.leftKey.isDown) {
            this.x -= this.playerSpeed;
        }
        if(this.rightKey.isDown) {
            this.x += this.playerSpeed;
        } 
    }

    public custom: any;
}
