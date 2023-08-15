class Setup extends Phaser.Scene {
    constructor() {
       super('setup');
    }
 
    preload() {
       this.load.path = "./assets/";
       this.load.image("rosiesunnybackground", "images/rosiesunnybackground.png");
       this.load.image("cloud", "images/cloud.png");
       this.load.image("rosiesunnylogo", "images/febbienrosbutsmallermaybe.png"); 
       this.load.image("rosieandsunnypixels", "images/rosiesunnyebigger.png");
       this.load.audio("cheeryintrosong", "sounds/cheery.wav");
       this.load.image("rosiesunnygames", "images/rosiesunnygamestitle.png");
       this.load.audio("menuclicksound", "sounds/mainmenuclicks2.wav");
       this.load.image("basket", "tilemaps/basket.png")
       this.load.image("tileset", "tilemaps/tileset.png");
       this.load.tilemapTiledJSON('tilemap1', 'tilemaps/level1.json');
       this.load.spritesheet('froobs', 'tilemaps/froobsheet.png', {frameWidth: 7, frameHeight: 8});
    }

    create() {
        this.input.on('pointerdown', () => {this.scene.start('level1')});
        //this.input.on('pointerdown', () => {this.scene.start('splash')});
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let textA = this.add.text(screenCenterX, screenCenterY,
         "Press anywhere to start",
         {
            font: "36px Finger Paint",
            color: "#fcfcfc"
         }
      ).setOrigin(0.5).setWordWrapWidth(700);
    }
}

 class LevelOne extends Phaser.Scene {
    constructor() {
        super('level1');
     }

     create() {
        this.matter.world.setBounds(32*3, 0, (32*16*3-(32*6)), (32*8*3), 32*5, true, true, false, true);
        const map = this.make.tilemap({ key: 'tilemap1' });
        const tileset = map.addTilesetImage('FroobCatchTileset', 'tileset');
        const platforms = map.createLayer('Platforms', tileset).setScale(3).setOrigin(0.5).setDepth(3);//setDepth brings in front, default is 0 anything bigger goes in front
        
        //start throwin balls in there
        this.time.addEvent({ delay: 150, callback: this.releaseBall, callbackScope: this, repeat: 256 });


        this.basket = this.matter.add.image(400, 300, 'basket');
        this.basket.setScale(4).setFixedRotation(270).setAngle(270).setFrictionAir(0.01).setMass(40)

        this.cursors = this.input.keyboard.createCursorKeys();
        this.matter.world.on('collisionstart', event =>
        {
            if (event.parts[0].bodyA == this.basket) {
                console.log("EEEEE")
                debugger;
            }
            event.pairs[0].bodyA.gameObject.setTint(0xff0000);
            event.pairs[0].bodyB.gameObject.setTint(0x00ff00);

        });
      }

     // releasing balls function that gets called
     releaseBall () {
        const ball = this.matter.add.image(Phaser.Math.Between((32*5+10), 32*6*3-(32*3+10)), -200, 'froobs', Phaser.Math.Between(0, 4)).setScale(6).setInteractive(true);
        //const ball = this.matter.add.image(Phaser.Math.Between((32*3+10), 32*16*3-(32*3+10)), -200, 'froobs', Phaser.Math.Between(0, 4)).setScale(6).setInteractive(true);
        ball.setCircle(20).setBounce(0.70).setDensity(80).setMass(1).setCollisionGroup(5);
    }

    onCollideFunction () {
        this.message = this.add.text(500, 32, 'Awaiting physics world events...').setOrigin(0.5);
    }

    

    update () {
      if (this.cursors.left.isDown)
      {
          this.basket.thrustLeft(0.1);
      }
      else if (this.cursors.right.isDown)
      {
          this.basket.thrustRight(0.1);
      }

      if (this.cursors.up.isDown)
      {
          this.basket.thrust(0.1);
      }
      else if (this.cursors.down.isDown)
      {
          this.basket.thrustBack(0.1);
      }
    }
  }