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

        this.blackBar = this.add.graphics();
        this.blackBar.fillStyle(0x222222,0.9);
        this.blackBar.fillRect(0, game.config.height * 7/10, game.config.width, game.config.height* 2/10)

        this.menuText = this.add.text(game.config.width/2, game.config.height * 15/20, '', { fill: '#ffffff',
    }).setScale(4).setOrigin(0.5, 0).setAlign("center");
        this.menuText.setText([
            "Use arrow keys to move. Use shift to dash.",
            "Drink coffee or die. Press any key to begin."
        ]);
    }

    update() {

    }
}