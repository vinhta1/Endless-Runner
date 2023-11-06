class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed = 100){
        super(scene, x, y, texture, frame);
        this.setOrigin(0.5, 0);
        scene.add.existing(this); //add to scene
        scene.physics.add.existing(this); //add body to scene
        this.speedMult = 1;
        this.BASE_SPEED = speed;
        this.PLAYER_SPEED = this.BASE_SPEED * this.speedMult;
        this.direction = "right";
        this.dashReady = true;
        this.playerVector = new Phaser.Math.Vector2(0,0);

        // these two lines were weird. didn't work how I expected at all.
        this.body.setSize(this.width/2, this.height/2);
        this.body.setOffset(this.width/4, this.height/2);

        //this.body.onWorldBounds = true; this isn't necessary... for now
        this.body.setCollideWorldBounds(true); //yay walls
        // this.body.setBounce(0.5); // bounce
        // this.body.setDamping(true).setDrag(0.5);
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

class MoveState extends State { //player is moving
    enter(){
        console.log("Move");
    }
    execute(scene, player, snail){
        player.setDepth(player.y + 64);
        let snailFactor = snail.SNAIL_SPEED/100;
        let leftMove = 1;

        if(!(cursors.right.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown)){
            this.stateMachine.transition("idle");
        }

        player.playerVector = new Phaser.Math.Vector2(0,0);
        player.playerVector.x = - snailFactor;

        if (cursors.up.isDown){
            player.playerVector.y = -(1 - snailFactor);
            player.direction = "up";
        } else if (cursors.down.isDown){
            player.playerVector.y = (1 - snailFactor);
            player.direction = "down";
        }

        if(cursors.right.isDown){
            //console.log("Right");
            player.playerVector.x = 1 - snailFactor;
            player.direction = "right";
        } else if(cursors.left.isDown){
            //console.log("Left");
            player.playerVector.x = -1;
            player.direction = "left";
            leftMove = 2;
        }
        
        player.playerVector.normalize();
        player.body.setVelocity(player.PLAYER_SPEED * leftMove * player.playerVector.x - (snail.SNAIL_SPEED), player.PLAYER_SPEED * player.playerVector.y);
        // player.body.setVelocity(-snail.SNAIL_SPEED, player.PLAYER_SPEED * player.playerVector.y);
        player.anims.play(`walk-${player.direction}`,true);
    }
    exit(){

    }
}

class IdleState extends State { //player has no input, thus moves towards left wall
    enter(scene, player){
        player.anims.play(`walk-right`, true)
        console.log("Idle");
    }
    execute(scene, player, snail){
        let snailFactor = snail.SNAIL_SPEED/100;
        player.body.setAccelerationX(-snailFactor);
        player.body.setVelocity(-snail.SNAIL_SPEED * 10, 0);
        if (cursors.right.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown){
            this.stateMachine.transition("move");
        }
        player.anims.play(`walk-right`, true);
    }
    exit(){
        
    }
}

class DashState extends State { //player is dashing and thus is faster, dash is no longer ready
    enter(scene, player){
        let index = Math.floor(Math.random() * scene.wooshGroup.length);
        let wooshSound = scene.wooshGroup[index];
        wooshSound.play();
        player.setTint();
        console.log("Dashing");
        scene.time.delayedCall(250, () => {
            this.stateMachine.transition("off");
        })
    }
    execute(scene, player){
        // if in idle state, dash forward
        if (!(cursors.left.isDown || cursors.up.isDown || cursors.down.isDown)) { player.playerVector.x = 1};
        player.body.setVelocity(player.PLAYER_SPEED * player.playerVector.x * 10, player.PLAYER_SPEED * player.playerVector.y * 10);
        
        // if ((cursors.right.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown)){
        //     this.stateMachine.transition("move");
        
    }
    exit(){
        
    }
}

class DashReady extends State { //dash is ready
    enter(scene, player){
        console.log("Dash Ready");
        player.setTint(0xffffa8);
        cursors.shift.once("down", () => { //event listeners in create
            this.stateMachine.transition("dash");
        });
    }
    execute(scene, player){
        
    }
    exit(){
        
    }
}

class DashOff extends State { //dash is on cooldown
    enter(scene, player){
        console.log("Dash Off");
        scene.time.delayedCall(1000, () => {
            this.stateMachine.transition("ready");
        })
    }
    execute(scene, player){

    }
    exit(){
        
    }
}