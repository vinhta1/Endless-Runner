class Over extends Phaser.Scene {
    constructor (){
        super("overScene");
    }


    create () {
        console.log("Game Over"); //quick debug console log

        this.time.delayedCall(1000, ()=> { //a timer to prevent accidental resets after dying
            this.input.keyboard.on("keydown", () => {
                this.scene.start("playScene");
            });
        }, null, this); //don't forget the "null, this"
    }

    update() {

    }
}