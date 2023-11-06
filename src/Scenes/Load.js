class Load extends Phaser.Scene{
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.path = "./assets/audio/";
        this.load.audio("speedUp","powerUpwah01.wav");
        this.load.audio("dead","sfx_gameOver.wav");
        this.load.audio("cars", "highwayAmbienec.wav");
        this.load.audio("bgmMusic","music/TheSnailWantsToKillYou.wav");
        this.load.path = "./assets/audio/woosh/woosh0";
        this.load.audio("woosh1", "1.wav");
        this.load.audio("woosh2", "2.wav");
        this.load.audio("woosh3", "3.wav");
        this.load.audio("woosh4", "4.wav");
        this.load.audio("woosh6", "6.wav");

        this.load.path = "./assets/images/";
        this.load.image("road","road.png");
        this.load.image("speedUp","speedUP.png");
        this.load.path = "./assets/images/Snail/";
        this.load.spritesheet("snail","snail01.png", { //load snail spritesheet
            frameWidth: 32
        });

        this.load.path = "./assets/images/Player/";
        this.load.atlas("player_atlas","Player.png","PlayerSprites.json"); //load player texture atlas

        this.load.path = "./assets/images/Cars/";
        this.load.spritesheet("car-1","car-1.png", {
            frameWidth: 60,
            frameHeight: 23
        }) //blue sedan
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
            key:"car-1-move",
            frames: this.anims.generateFrameNumbers("car-1",{
                start: 0,
                end: 1
            }),
            frameRate: 10,
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

        this.scene.start("menuScene");
    }

}