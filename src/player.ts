// import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Image {
    upKey! : Phaser.Input.Keyboard.Key;
    downKey! : Phaser.Input.Keyboard.Key;
    leftKey! : Phaser.Input.Keyboard.Key;
    rightKey! : Phaser.Input.Keyboard.Key;
    playerSpeed : number = 3; 
    live : boolean = true;
    public constructor(scene:Phaser.Scene, texture:string) {
        super(scene, 0, 0, texture);
        scene.add.existing(this);
        this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // super(scene, 0,);
    }
    public update(gameRecords:any) {
        let inputObj : any = {};
        if(this.upKey.isDown) {
            inputObj.up = 1;
            this.y -= this.playerSpeed;
        }
        if(this.downKey.isDown) {
            inputObj.down = 1;
            this.y += this.playerSpeed;
        }
        if(this.leftKey.isDown) {
            inputObj.left = 1;
            this.x -= this.playerSpeed;
        }
        if(this.rightKey.isDown) {
            inputObj.right = 1;
            this.x += this.playerSpeed;
        } 
        gameRecords["inputs"].push(inputObj);

        if(this.live == false) {
        }
    }

    public custom: any;
}
