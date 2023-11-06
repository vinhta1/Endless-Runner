class Menu extends Phaser.Scene {
    constructor (){
        super("menuScene");
    }

    create () {
        this.titleScreen = this.add.image(0, 0, "title").setOrigin(0);
        this.titleScreen.setDisplaySize(game.config.width, game.config.height);
        console.log("Menu"); //quick debug console log
        this.input.keyboard.on("keydown", () => { //on any key, switch to play
            this.scene.start("playScene");
        });
    }

    update() {

    }
}