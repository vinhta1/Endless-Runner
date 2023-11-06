class Load extends Phaser.Scene{
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.path = "./assets/Snail/";
        this.load.spritesheet("snail","snail01.png", { //load snail spritesheet
            frameWidth: 32
        });

        this.load.path = "./assets/Player/";
        this.load.atlas("player_atlas","Player.png","PlayerSprites.json"); //load player texture atlas

    }


    create() {
        this.anims.create({
            key:"snailMove",
            frames: this.anims.generateFrameNumbers("snail",{
                start: 0,
                end: 1
            }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: "walk-right",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames("player_atlas", {
                prefix: "right",
                start: "00",
                end: "03",
                zeroPad: 2
            })
        })

        this.anims.create({
            key: "walk-left",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames("player_atlas", {
                prefix: "left",
                start: "00",
                end: "03",
                zeroPad: 2
            })
        })

        this.anims.create({
            key: "walk-up",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames("player_atlas", {
                prefix: "up",
                start: "00",
                end: "03",
                zeroPad: 2
            })
        })

        this.anims.create({
            key: "walk-down",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames("player_atlas", {
                prefix: "down",
                start: "00",
                end: "03",
                zeroPad: 2
            })
        })

        console.log("Load"); //debug
        cursors = this.input.keyboard.createCursorKeys();

        this.scale.displaySize.setAspectRatio(game.config.width/this.game.config.height);
        this.scale.refresh();

        this.scene.switch("menuScene");
    }

}