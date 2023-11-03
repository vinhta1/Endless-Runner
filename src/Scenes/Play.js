class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        console.log("Play");

        this.snail = new Snail(this, 0, 0, "snail");

        this.player = new Player(this, 600, game.config.height/2, "player_atlas", "right00").setScale(10);


        //snail init
        this.snail.create();
        //this.physics.moveTo(this.snail, 100, this.player.y, this.snail.SNAIL_SPEED);

        //this.player.create();
        this.playerFSM = new StateMachine("idle", {
            idle: new IdleState(),
            move: new MoveState()
        }, [this, this.player, this.snail]);

        this.cameras.main.setBounds(0, 0, game.config.width, game.config.height).setZoom(10)
        this.cameras.main.startFollow(this.snail);

        //this.snailCam = this.cameras.add(0, 0, game.config.width, game.config.height).setBounds(0, 0, game.config.width, game.config.height).setZoom(10)
        //this.snailCam.startFollow(this.snail,false);

    }

    update() {
        this.snail.update();
        this.playerFSM.step();
        // if (!this.cameras.main.worldView.contains(this.player.x,this.player.y)){
        //     this.cameras.main.zoomTo(this.cameras.main.zoom - 1, 10000);
        // }
        //this.cameras.main.setBounds(0, 0, this.player.x, game.config.height)
        // if (this.snail.x > 100) {
        //     this.snail.body.reset(this.snail.x, this.snail.y);
        // }

        this.cameras.main.zoomTo(1, 10000);
        this.physics.moveTo(this.snail, 100, this.player.y, this.snail.SNAIL_SPEED);
        
    }
    
    
}