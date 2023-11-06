class Over extends Phaser.Scene {
    constructor (){
        super("overScene");
    }

    init (data) {
        this.score = data.score;
    }

    create () {
        //console.log("Game Over"); //quick debug console log
        this.overScreen = this.add.image(0, 0, "overScreen").setOrigin(0);
        this.overScreen.setDisplaySize(game.config.width, game.config.height);


        this.cameras.main.fadeIn(4500);
        this.time.delayedCall(1000, ()=> { //a timer to prevent accidental resets after dying
            this.input.keyboard.on("keydown", () => {
                this.scene.start("playScene");
            });
        }, null, this); //don't forget the "null, this"

        this.creditText = this.add.text(game.config.width/2, game.config.height * 1/10, '', { fill: '#ffffff',
    }).setScale(3).setOrigin(0.5, 0).setAlign("center");
        this.creditText.setText([
            "Game and assets made by Vinh Ta,",
            "except for the chomp, that was KeshaEuw Shorts"
        ]);

        this.overText = this.add.text(game.config.width/2, game.config.height * 15/20, '', { fill: '#ffffff',
    }).setScale(4).setOrigin(0.5, 0).setAlign("center");
        this.overText.setText([
            `You drank ${this.score} coffees.`,
            "Press any key to die again."
        ]);
    }

    update() {

    }
}