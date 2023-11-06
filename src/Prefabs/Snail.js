class Snail extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed = 10){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.SNAIL_SPEED = speed;

        this.setRandomPosition(32, 0, 68, game.config.height);
        this.snailVector = new Phaser.Math.Vector2(0,0);
        this.play("snailMove", true);
    }

    // create() {
    //     this.setRandomPosition(32, 0, 68, game.config.height);
    //     this.snailVector = new Phaser.Math.Vector2(0,0);
    //     this.play("snailMove", true);
    // }

    update() {
        this.snailVector.normalize();

    }
}