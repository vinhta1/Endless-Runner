class Menu extends Phaser.Scene {
    constructor (){
        super("menuScene");
    }

    create () {
        console.log("Menu"); //quick debug console log
        this.input.keyboard.on("keydown", () => { //on any key, switch to play
            this.scene.start("playScene");
        });
    }

    update() {

    }
}