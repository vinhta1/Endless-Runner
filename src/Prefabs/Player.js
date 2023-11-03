class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed = 100){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.PLAYER_SPEED = speed;
        this.direction = "right";
    }

    // create() {
        
    // }

    // update() {

    //     let playerVector = new Phaser.Math.Vector2(0,0);
    //     if(cursors.right.isDown){
    //         //console.log("Right");
    //         playerVector.x = 1;
    //     }

    //     playerVector.normalize();
    //     if (cursors.right.isUp){
    //         this.body.setAcceleration(-10, 0);
    //     }
    //     this.body.setVelocity(this.PLAYER_SPEED * playerVector.x, this.PLAYER_SPEED * playerVector.y);

    // }


}

class MoveState extends State {
    execute(scene, player, snail){
        let snailFactor = snail.SNAIL_SPEED/100;

        if(!(cursors.right.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown)){
            this.stateMachine.transition("idle");
        }


        let playerVector = new Phaser.Math.Vector2(0,0);
        playerVector.x = - snailFactor;

        if (cursors.up.isDown){
            playerVector.y = -(1 - snailFactor);
            player.direction = "up";
        } else if (cursors.down.isDown){
            playerVector.y = (1 - snailFactor);
            player.direction = "down";
        }

        if(cursors.right.isDown){
            //console.log("Right");
            playerVector.x = 1 - snailFactor;
            player.direction = "right";
        } else if(cursors.left.isDown){
            //console.log("Left");
            playerVector.x = -1;
            player.direction = "left";
        }
        
        playerVector.normalize();
        player.body.setVelocity(player.PLAYER_SPEED * playerVector.x, player.PLAYER_SPEED * playerVector.y);
        player.anims.play(`walk-${player.direction}`, true)
    }
}

class IdleState extends State {
    enter(scene, player){
        player.anims.play(`walk-right`, true)
    }
    execute(scene, player, snail){
        let snailFactor = snail.SNAIL_SPEED/100;
        player.body.setAccelerationX(-snailFactor);
        player.body.setVelocity(-snail.SNAIL_SPEED, 0);
        if (cursors.right.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown){
            this.stateMachine.transition("move");
        }
        player.anims.play(`walk-right`, true)
    }
}