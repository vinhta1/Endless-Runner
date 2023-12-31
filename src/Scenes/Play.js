class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    create() {
        this.coffeeDrank = 0;
        this.sfx_speedUp = this.sound.add("speedUp",{volume: 0.4});
        this.sfx_gameOver = this.sound.add("dead");

        this.wooshGroup = [];

        this.wooshGroup.push(this.sound.add("woosh1"));
        this.wooshGroup.push(this.sound.add("woosh2"));
        this.wooshGroup.push(this.sound.add("woosh3"));
        this.wooshGroup.push(this.sound.add("woosh4"));
        this.wooshGroup.push(this.sound.add("woosh6"));

        this.bgm = this.sound.add("bgmMusic", {
            volume:0.4,
            loop: true,
            rate: 1
        });
        this.ambience = this.sound.add("cars", {
            volume:0.4,
            loop: true,
            rate: 1
        });
        this.bgm.play();
        this.ambience.play();
        //debug text
        //this.text1 = this.add.text(10, 10, '', { fill: '#00ff00' }).setScale(10);
        
        //add tilesprite https://github.com/nathanaltice/MovementStudies/blob/e18d0cf81efd236b078ed1bf053016524f25e0da/scenes/Runner.js#L14
        this.road = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'road').setOrigin(0)

        // debug key listener (assigned to D key) https://github.com/nathanaltice/FSM/blob/6a831e4e8623aafe7851bd3550ecf9617d478299/src/scenes/Play.js#L17
        // this.input.keyboard.on('keydown-D', function() { //can skip the key creation process if not super important
        //     this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
        //     this.physics.world.debugGraphic.clear()
        // }, this)

         // update instruction text https://github.com/nathanaltice/FSM/blob/6a831e4e8623aafe7851bd3550ecf9617d478299/src/scenes/Play.js#L23
         // document.getElementById('info').innerHTML = '<strong>CharacterFSM.js:</strong> Arrows: move | SHIFT: dash| D: debug (toggle)'
        

        cursors = this.input.keyboard.createCursorKeys(); //create up, down, etc
        //console.log("Play"); // quick debug console log

        this.snail = new Snail(this, 0, 0, "snail").setOrigin(0.5, 1);

        this.player = new Player(this, 600, game.config.height/2, "player_atlas", "right00").setScale(10).setOrigin(.5, 1);
        
        this.carsGroup = this.add.group({
            runChildUpdate: true,
            classType: Car
        });
        // this.car1 = new Car(this, game.config.width, game.config.height/2, "car-1", 0, this.player).setScale(10);
        // this.car1.body.pushable = false;
        // this.time.delayedCall(10000, () =>{
        //     this.car1.isDriving = true;
        // })
        // this.car2 = new Car(this, game.config.width, game.config.height/2, "car-1", 0, this.player).setScale(10);
        // this.car2.body.pushable = false;
        // this.time.delayedCall(30000, () =>{
        //     this.car2.isDriving = true;
        // })
        // this.car3 = new Car(this, game.config.width, game.config.height/2, "car-1", 0, this.player).setScale(10);
        // this.car3.body.pushable = false;
        // this.time.delayedCall(60000, () =>{
        //     this.car3.isDriving = true;
        // })
        for (let i = 0; i < 15; i++){
            this.time.delayedCall(i * 10000, () => {
                let car = this.carsGroup.create(0, 0, "car-1", 0).setScale(10);
            
                car.body.pushable = false;
                car.isDriving = true;
                //console.log(`vroom ${i}`);
               this.physics.collide(car,this.carsGroup, () => {});
            });
        }
        this.physics.add.collider(this.player, this.carsGroup, () => {
            this.player.body.setAccelerationX(-1 * this.carsGroup.CAR_SPEED);
            
        }, null, this);

        this.speedGroup = this.add.group();
        for (let i = 0; i < 100; i++){
            let randY = Math.random() * game.config.height;
            this.time.delayedCall(i * 10000, () => {
                let speedUp = this.speedGroup.create(game.config.width + 100, randY, "speedUp").setScale(5);
                this.physics.add.existing(speedUp);
                speedUp.body.setVelocityX(Phaser.Math.Between(-1000,-200));
                speedUp.anims.play("coffeeJiggle",true);
            });
        }

        this.physics.add.collider(this.player, this.speedGroup, (a, b) => {
            this.sfx_speedUp.play();
            this.bgm.rate += 0.01;
            a.speedMult += 0.2;
            a.PLAYER_SPEED = a.BASE_SPEED * (a.speedMult);
            this.coffeeDrank++;
            b.destroy();
        }, null, this);
        

        //snail init
        //this.snail.create();
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
        this.cameras.main.zoomTo(1, 10000); //10000

        //this.snailCam = this.cameras.add(0, 0, game.config.width, game.config.height).setBounds(0, 0, game.config.width, game.config.height).setZoom(10)
        //this.snailCam.startFollow(this.snail,false);

        this.physics.add.overlap(this.snail, this.player, () => { //if the snail and player touch, game over
            this.bgm.stop();
            this.ambience.stop();
            //this.scene.restart();
            this.sfx_gameOver.play();
            this.scene.start("overScene", {score: this.coffeeDrank}); // https://phaser.io/examples/v3/view/scenes/passing-data-to-a-scene
        });

        this.catcher = this.add.rectangle(game.config.width / 10 * -1, game.config.height/10 * -1, game.config.width / 10, game.config.height * 12 / 10);
        this.physics.add.existing(this.catcher);
        this.physics.add.collider(this.speedGroup, this.catcher, (a) => {
            a.destroy();
            //console.log("test");
        }, null, this);

        // making the coffee counter
        this.UIBar = this.add.graphics();
        this.UIBar.fillStyle(0x222222,0.9);
        this.UIBar.fillRect(game.config.width*8/10, game.config.height * 7/10, game.config.width *1.5/10, game.config.height* 1.5/10)

        this.UICoffee = this.add.sprite(game.config.width*8/10 +game.config.width *0.75/20, game.config.height * 7/10 + game.config.height* 1.5/20,"speedUp").setScale(6).setAlpha(.9).setDepth(1);
        this.UICoffee.anims.play("coffeeJiggle", true);

        this.UIText = this.add.text(game.config.width*8/10 + game.config.width * 2/20, game.config.height * 7/10 + game.config.height* 1.75/20, '', { fill: '#ffffff',
    }).setScale(6).setOrigin(0.5).setAlign("center");
        
    }

    update() {
        // this.text1.setText([
        //     `x: ${this.player.depth}`,
        //     `y: ${this.car1.depth}`,
        // ]);

        // updates for the FSMs and the snail
        this.snail.update();
        this.playerFSM.step();
        this.dashFSM.step();

        this.road.tilePositionX += 1;

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
    
        this.UIText.setText([
            `${this.coffeeDrank}`
        ]);
    }
    
    
}