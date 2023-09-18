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
       this.load.tilemapTiledJSON('tilemap2', 'tilemaps/level2.json');
       this.load.tilemapTiledJSON('tilemap3', 'tilemaps/level3.json');
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
        
        // the bounding box that actually works but is too simple to use in future levels
        this.matter.world.setBounds(96, 0, 1350, 768, 160, true, true, true, true);
        const map = this.make.tilemap({ key: 'tilemap1' });
        const tileset = map.addTilesetImage('FroobCatchTileset', 'tileset');
        const background = map.createLayer('Background', tileset).setScale(3).setOrigin(0.5).setAlpha(.55)//setDepth brings in front, default is 0 anything bigger goes in front
        const platforms = map.createLayer('Platforms', tileset).setScale(3).setOrigin(0.5)
        platforms.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(platforms)
        this.basket = this.matter.add.image(400, 300, 'basket');
        this.basket.setScale(5).setFixedRotation(270).setAngle(270).setFrictionAir(0.01).setMass(40)
        //start throwin balls in there
        this.time.addEvent({ delay: 850, callback: this.releaseBall, callbackScope: this, repeat: 256 });
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let textA = this.add.text(screenCenterX, screenCenterY-200,
         "Catch 10 Froobs!",
         {
            font: "72px Finger Paint",
            color: "#fcfcfc"
         }
      ).setOrigin(0.5).setWordWrapWidth(700);

        this.cursors = this.input.keyboard.createCursorKeys();
        let counterThing = 0
        this.matter.world.on('sleepstart', (event, body) =>
            {
                event.source.gameObject.destroy()
            });
        this.matter.world.on('collisionstart', event =>
        {
            let { bodyA, bodyB } = event.pairs[0];
            if (bodyA == this.basket.body && bodyB.gameObject && bodyB.label == "Circle Body") {
                bodyB.gameObject.destroy();
                counterThing = this.onCollideFunction(counterThing, textA)
            }
            if (bodyB == this.basket.body && bodyA.gameObject && bodyA.label == "Circle Body") {
                bodyA.gameObject.destroy();
                counterThing = this.onCollideFunction(counterThing, textA)
            }
        });
      }


     // releasing balls function that gets called
     releaseBall () {
        const ball = this.matter.add.image(Phaser.Math.Between((32*3+10), 32*16*3-(32*3+10)), 120, 'froobs', Phaser.Math.Between(0, 4)).setScale(6);
        //const ball = this.matter.add.image(Phaser.Math.Between((32*3+10), 32*16*3-(32*3+10)), -200, 'froobs', Phaser.Math.Between(0, 4)).setScale(6).setInteractive(true);
        ball.setCircle(20).setBounce(0.10).setDensity(80).setMass(1).setCollisionGroup("test")
        ball.setSleepEvents(true, true)
        ball.body.sleepThreshold = 5
    }
    

    onCollideFunction (counterThing, textA) {
        counterThing++
        textA.setText(counterThing)
        if (counterThing >= 10) {
            this.scene.start('victoryscreen')
        }
        return counterThing
    }
    update () {
      if (this.cursors.left.isDown)
      {
          this.basket.thrustLeft(0.08);
      }
      else if (this.cursors.right.isDown)
      {
          this.basket.thrustRight(0.08);
      }

      if (this.cursors.up.isDown)
      {
          this.basket.thrust(0.08);
      }
      else if (this.cursors.down.isDown)
      {
          this.basket.thrustBack(0.08);
      }
    }
  }

  class VictoryScreenOne extends Phaser.Scene {
    constructor() {
       super('victoryscreen');
    }
 
    preload() {}

    create() {
        this.input.on('pointerdown', () => {this.scene.start('level2')});
        //this.input.on('pointerdown', () => {this.scene.start('splash')});
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let textA = this.add.text(screenCenterX, screenCenterY,
         "You beat Level 1! Click to continue to Level 2",
         {
            font: "36px Finger Paint",
            color: "#fcfcfc"
         }
      ).setOrigin(0.5).setWordWrapWidth(700);
    }
}

class LevelTwo extends Phaser.Scene {
    constructor() {
        super('level2');
     }

     create() {
        
        // the bounding box that actually works but is too simple to use in future levels
        this.matter.world.setBounds(96, 0, 1350, 768, 160, true, true, true, true);
        const map = this.make.tilemap({ key: 'tilemap2' });
        const tileset = map.addTilesetImage('FroobCatchTileset', 'tileset');
        const background = map.createLayer('Background', tileset).setScale(3).setOrigin(0.5).setAlpha(.55)//setDepth brings in front, default is 0 anything bigger goes in front
        const platforms = map.createLayer('Platforms', tileset).setScale(3).setOrigin(0.5)
        platforms.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(platforms)
        this.basket = this.matter.add.image(400, 300, 'basket');
        this.basket.setScale(5).setFixedRotation(270).setAngle(270).setFrictionAir(0.01).setMass(40)
        //start throwin balls in there
        this.time.addEvent({ delay: 850, callback: this.releaseBall, callbackScope: this, repeat: 256 });
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let textA = this.add.text(screenCenterX, screenCenterY-200,
         "Catch 10 Froobs!",
         {
            font: "72px Finger Paint",
            color: "#fcfcfc"
         }
      ).setOrigin(0.5).setWordWrapWidth(700);

        this.cursors = this.input.keyboard.createCursorKeys();
        let counterThing = 0
        this.matter.world.on('sleepstart', (event, body) =>
            {
                event.source.gameObject.destroy()
            });
        this.matter.world.on('collisionstart', event =>
        {
            let { bodyA, bodyB } = event.pairs[0];
            if (bodyA == this.basket.body && bodyB.gameObject && bodyB.label == "Circle Body") {
                bodyB.gameObject.destroy();
                counterThing = this.onCollideFunction(counterThing, textA)
            }
            if (bodyB == this.basket.body && bodyA.gameObject && bodyA.label == "Circle Body") {
                bodyA.gameObject.destroy();
                counterThing = this.onCollideFunction(counterThing, textA)
            }
        });
      }


     // releasing balls function that gets called
     releaseBall () {  
        let randomPosition = Phaser.Math.Between((32*3+10), 32*16*3-(32*3+10))
        while (!(randomPosition < 662 || randomPosition > 874)) {
            randomPosition = Phaser.Math.Between((32*3+10), 32*16*3-(32*3+10))
        }
        const ball = this.matter.add.image(randomPosition, 120, 'froobs', Phaser.Math.Between(0, 4)).setScale(6);
        ball.setCircle(20).setBounce(0.10).setDensity(80).setMass(1).setCollisionGroup("test")
        ball.setSleepEvents(true, true)
        ball.body.sleepThreshold = 5
    }
    
    onCollideFunction (counterThing, textA) {
        counterThing++
        textA.setText(counterThing)
        if (counterThing >= 10) {
            this.scene.start('victoryscreen2')
        }
        return counterThing
    }
    update () {
      if (this.cursors.left.isDown)
      {
          this.basket.thrustLeft(0.08);
      }
      else if (this.cursors.right.isDown)
      {
          this.basket.thrustRight(0.08);
      }

      if (this.cursors.up.isDown)
      {
          this.basket.thrust(0.08);
      }
      else if (this.cursors.down.isDown)
      {
          this.basket.thrustBack(0.08);
      }
    }
  }

  class VictoryScreenTwo extends Phaser.Scene {
    constructor() {
       super('victoryscreen2');
    }
 
    preload() {}

    create() {
        this.input.on('pointerdown', () => {this.scene.start('level3')});
        //this.input.on('pointerdown', () => {this.scene.start('splash')});
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let textA = this.add.text(screenCenterX, screenCenterY,
         "You beat Level 2! Click to continue to Level 3",
         {
            font: "36px Finger Paint",
            color: "#fcfcfc"
         }
      ).setOrigin(0.5).setWordWrapWidth(700);
    }
}

class LevelThree extends Phaser.Scene {
    constructor() {
        super('level3');
     }

     create() {
        
        // the bounding box that actually works but is too simple to use in future levels
        this.matter.world.setBounds(96, 0, 1350, 768, 160, true, true, true, true);
        const map = this.make.tilemap({ key: 'tilemap3' });
        const tileset = map.addTilesetImage('FroobCatchTileset', 'tileset');
        const background = map.createLayer('Background', tileset).setScale(3).setOrigin(0.5).setAlpha(.55)//setDepth brings in front, default is 0 anything bigger goes in front
        const platforms = map.createLayer('Platforms', tileset).setScale(3).setOrigin(0.5)
        platforms.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(platforms)
        this.basket = this.matter.add.image(400, 300, 'basket');
        this.basket.setScale(5).setFixedRotation(270).setAngle(270).setFrictionAir(0.01).setMass(40)
        //start throwin balls in there
        this.time.addEvent({ delay: 850, callback: this.releaseBall, callbackScope: this, repeat: 256 });
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let textA = this.add.text(screenCenterX, screenCenterY-200,
         "Catch 10 Froobs!",
         {
            font: "72px Finger Paint",
            color: "#fcfcfc"
         }
      ).setOrigin(0.5).setWordWrapWidth(700);

        this.cursors = this.input.keyboard.createCursorKeys();
        let counterThing = 0
        this.matter.world.on('sleepstart', (event, body) =>
            {
                event.source.gameObject.destroy()
            });
        this.matter.world.on('collisionstart', event =>
        {
            let { bodyA, bodyB } = event.pairs[0];
            if (bodyA == this.basket.body && bodyB.gameObject && bodyB.label == "Circle Body") {
                bodyB.gameObject.destroy();
                counterThing = this.onCollideFunction(counterThing, textA)
            }
            if (bodyB == this.basket.body && bodyA.gameObject && bodyA.label == "Circle Body") {
                bodyA.gameObject.destroy();
                counterThing = this.onCollideFunction(counterThing, textA)
            }
        });
      }


     // releasing balls function that gets called
     releaseBall () {  
        let randomPosition = Phaser.Math.Between((32*3+10), 32*16*3-(32*3+10))
        while (!(randomPosition < 470 || (randomPosition > 586 && randomPosition < 950) || randomPosition > 1066)) {
            randomPosition = Phaser.Math.Between((32*3+10), 32*16*3-(32*3+10))
        }
        const ball = this.matter.add.image(randomPosition, 120, 'froobs', Phaser.Math.Between(0, 4)).setScale(6);
        ball.setCircle(20).setBounce(0.10).setDensity(80).setMass(1).setCollisionGroup("test")
        ball.setSleepEvents(true, true)
        ball.body.sleepThreshold = 5
    }
    
    onCollideFunction (counterThing, textA) {
        counterThing++
        textA.setText(counterThing)
        if (counterThing >= 10) {
            this.scene.start('victoryscreen3')
        }
        return counterThing
    }
    update () {
      if (this.cursors.left.isDown)
      {
          this.basket.thrustLeft(0.08);
      }
      else if (this.cursors.right.isDown)
      {
          this.basket.thrustRight(0.08);
      }

      if (this.cursors.up.isDown)
      {
          this.basket.thrust(0.08);
      }
      else if (this.cursors.down.isDown)
      {
          this.basket.thrustBack(0.08);
      }
    }
  }

  class VictoryScreenThree extends Phaser.Scene {
    constructor() {
       super('victoryscreen3');
    }
 
    preload() {}

    create() {
        //this.input.on('pointerdown', () => {this.scene.start('level3')});
        //this.input.on('pointerdown', () => {this.scene.start('splash')});
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let textA = this.add.text(screenCenterX, screenCenterY,
         "You beat Level 3! Congratulations, you've beaten the game!",
         {
            font: "36px Finger Paint",
            color: "#fcfcfc"
         }
      ).setOrigin(0.5).setWordWrapWidth(700);
    }
}