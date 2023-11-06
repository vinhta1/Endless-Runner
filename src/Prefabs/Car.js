class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player, speed = 1000){
        super(scene, x, y, texture, frame);
        this.setOrigin(0, 0);
        scene.add.existing(this); //add to scene
        scene.physics.add.existing(this); //add body to scene
        
        this.CAR_SPEED = speed;
        this.carVector = new Phaser.Math.Vector2(-1,0);
        this.isDriving = false;

        this.body.setSize(this.width - 3, this.height/3);
        this.body.setOffset(0, this.height * 1 / 2);
        this.setRandomPosition(game.config.width + this.width, 0 + this.height, game.config.width * 2, game.config.height - this.height);
        this.anims.play(`${texture}-move`,true);
    }
    update() {
        if (this.isDriving = true) {
            this.carVector.normalize();
            this.body.setVelocity(this.CAR_SPEED * this.carVector.x, this.CAR_SPEED * this.carVector.y);
            this.setDepth(this.body.y + 64);
        }
        if (this.x + this.body.width < 0) {
            this.reset();
            console.log("reset");
        }
    }
    
    reset() {
        this.isDriving = false;
        this.setRandomPosition(game.config.width + this.width, 0 + this.height, game.config.width * 2, game.config.height - this.height);
        this.scene.time.delayedCall(Phaser.Math.FloatBetween(0, 15) * 1000, ()=> {
            this.isDriving = true;
        }, null, this.scene);
    }
}

