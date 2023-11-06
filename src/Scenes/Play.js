class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    create() {
        // debug key listener (assigned to D key) https://github.com/nathanaltice/FSM/blob/6a831e4e8623aafe7851bd3550ecf9617d478299/src/scenes/Play.js#L17
        this.input.keyboard.on('keydown-D', function() { //can skip the key creation process if not super important
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

         // update instruction text https://github.com/nathanaltice/FSM/blob/6a831e4e8623aafe7851bd3550ecf9617d478299/src/scenes/Play.js#L23
         document.getElementById('info').innerHTML = '<strong>CharacterFSM.js:</strong> Arrows: move | SHIFT: dash| D: debug (toggle)'
        

        cursors = this.input.keyboard.createCursorKeys(); //create up, down, etc
        console.log("Play"); // quick debug console log

        this.snail = new Snail(this, 0, 0, "snail").setOrigin(0.5, 1);

        this.player = new Player(this, 600, game.config.height/2, "player_atlas", "right00").setScale(10).setOrigin(.5, 1);
        

        //snail init
        this.snail.create();
        //this.physics.moveTo(this.snail, 100, this.player.y, this.snail.SNAIL_SPEED);

        //this.player.create();
        this.playerFSM = new StateMachine("idle", { //movement fsm
            idle: new IdleState(),
            move: new MoveState(),
        }, [this, this.player, this.snail]); //scene, player, snail

        this.dashFSM = new StateMachine("ready", { //dash fsm
            dash: new DashState(),
            ready: new DashReady(),
            off: new DashOff()
        }, [this, this.player, this.snail]);

        this.cameras.main.setBounds(0, 0, game.config.width, game.config.height).setZoom(10)
        this.cameras.main.startFollow(this.snail);
        this.cameras.main.zoomTo(1, 0); //10000

        //this.snailCam = this.cameras.add(0, 0, game.config.width, game.config.height).setBounds(0, 0, game.config.width, game.config.height).setZoom(10)
        //this.snailCam.startFollow(this.snail,false);

        this.physics.add.overlap(this.snail, this.player, () => { //if the snail and player touch, game over
            this.scene.restart();
            this.scene.switch("overScene");
        });

    }

    update() {

        // updates for the FSMs and the snail
        this.snail.update();
        this.playerFSM.step();
        this.dashFSM.step();

        // some camera bullshit, will update if I have time
        // if (!this.cameras.main.worldView.contains(this.player.x,this.player.y)){
        //     this.cameras.main.zoomTo(this.cameras.main.zoom - 1, 10000);
        // }
        //this.cameras.main.setBounds(0, 0, this.player.x, game.config.height)
        // if (this.snail.x > 100) {
        //     this.snail.body.reset(this.snail.x, this.snail.y);
        // }

        // snail threshold, moves right unless certain conditions are met
        let snailToX = this.player.x;
        if (this.snail.x >= game.config.width/10 && this.player.x > this.snail.x){
            snailToX = game.config.width/10;
        }
        this.physics.moveTo(this.snail, snailToX, this.player.y, this.snail.SNAIL_SPEED);
    }
    
    
}