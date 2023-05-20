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
       
       this.load.image("tileset", "tilemaps/tileset.png");
       this.load.tilemapTiledJSON('tilemap1', 'tilemaps/level1.json');
    }

    create() {
        this.input.on('pointerdown', () => {this.scene.start('splash')});
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

class Splash extends Phaser.Scene {
    constructor() {
       super('splash');
    }
    create() {
       let sfx = this.sound.add("cheeryintrosong", {loop: false});

       const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
       const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
       this.add.image(screenCenterX, screenCenterY+.5, "rosiesunnybackground");
       this.graphics = this.add.graphics();
       //funny textbox backgrounds!!
       //hex to color conversion https://rexrainbow.github.io/phaser3-rex-notes/docs/site/color/
       this.graphics.fillStyle(Phaser.Display.Color.HexStringToColor("#150019").color);
       let darkrectangle = this.graphics.fillRect(200, -50, 490, 140); //topleft x, topleft y, width, height
       darkrectangle.setAlpha(0); 
       this.tweens.add({
          targets: darkrectangle,
          y: 175,
          duration: 800,
          delay: 4300-700,
          ease: "Quad.out",
          alpha: 0.79,
       });
       this.graphics = this.add.graphics();
       this.graphics.fillStyle((Phaser.Display.Color.HexStringToColor("#FFFFFF").color));
       let lightrectangle = this.graphics.fillRect(200, 70, 490, 20);
       lightrectangle.setAlpha(0); 
       this.tweens.add({
          targets: lightrectangle,
          y: 175,
          duration: 800,
          delay: 4300-700,
          ease: "Quad.out",
          alpha: 0.79,
       });
       let rosiesunnygamestitletext = this.add.image(500, -526, "rosiesunnygames");
       rosiesunnygamestitletext.setAlpha(0);//start off transp
       rosiesunnygamestitletext.setScale(.25);
       this.tweens.add({
          targets: rosiesunnygamestitletext,
          y: 185,
          duration: 800,
          delay: 4300-700,
          ease: "Quad.out",
          alpha: 0.79,
       });
 
       //logo that bounces with the text boxes appearing!
       let rosiesunnylogoimg = this.add.image(164, -526, "rosiesunnylogo");
       rosiesunnylogoimg.setAlpha(0);//start off transp
       //setscale https://stackoverflow.com/questions/56220214/how-to-correctly-resize-images-to-retain-quality-in-phaser-3
       rosiesunnylogoimg.setScale(.55);
       this.tweens.add({
          targets: rosiesunnylogoimg,
          y: 236,
          alpha: 1,
          duration: 800,
          delay: 4300-700,
          ease: "Quad.out"
       });
       this.tweens.add({
          targets: rosiesunnylogoimg,
          y: 210,
          duration: 500,
          delay: 5000-700,
          ease: "Back.out"
       });
 
       let cloudimg = this.add.image(screenCenterX+120, 950, "cloud");
       cloudimg.setAlpha(0);//start off transp
       cloudimg.setScale(.75);
       this.tweens.add({
          targets: cloudimg,
          y: 390,
          alpha: .7,
          duration: 800,
          delay: 6000-700,
          ease: "Quad.out"
       });
       this.tweens.add({
          targets: cloudimg,
          y: 400,
          duration: 500,
          delay: 6500-700,
          ease: "Back.out"
       });
 
       let rosiensunnypixels = this.add.image(screenCenterX+120, 950, "rosieandsunnypixels");
       rosiensunnypixels.setAlpha(0);//start off transp
       rosiensunnypixels.setScale(.75);
       this.tweens.add({
          targets: rosiensunnypixels,
          y: 390,
          alpha: 1,
          duration: 800,
          delay: 6000-700,
          ease: "Quad.out"
       });
       this.tweens.add({
          targets: rosiensunnypixels,
          y: 400,
          duration: 500,
          delay: 6500-700,
          ease: "Back.out"
       });
       this.tweens.add({
          targets: rosiensunnypixels,
          y: 360,
          duration: 800,
          delay: 7300-700,
          ease: "Bounce.in"
       });
       this.tweens.add({
          targets: rosiensunnypixels,
          y: 400,
          duration: 800,
          delay: 7900-700,
          ease: "Bounce.out"
       });
       this.graphics = this.add.graphics();
       this.graphics.fillStyle(Phaser.Display.Color.HexStringToColor("#150019").color);
       let exitscreen = this.graphics.fillRect(-500, -500, 1500, 1500); //topleft x, topleft y, width, height
       exitscreen.setAlpha(0); 
       this.tweens.add({
          targets: exitscreen,
          duration: 1000,
          delay: 9500-700,
          ease: "linear",
          alpha: 1,
       });
 
       this.tweens.add({
          targets: 'titlescreen',
          alpha: 1,
       })
 
       
 
 
       //https://labs.phaser.io/edit.html?src=src/scenes/launch%20parallel%20scene.js
       this.time.delayedCall(700-700, () => {sfx.play()});
       this.time.delayedCall(11000-700, () => {this.scene.start('titlescreen')});
       this.input.on('pointerdown', () => {
          sfx.stop();
          let sfxonclick = this.sound.add("menuclicksound", {loop: false});
          sfxonclick.play();
          this.graphics = this.add.graphics();
          this.graphics.fillStyle(Phaser.Display.Color.HexStringToColor("#150019").color);
          let exitscreen = this.graphics.fillRect(-500, -500, 1500, 1500); //topleft x, topleft y, width, height
          exitscreen.setAlpha(0); 
          this.tweens.add({
             targets: exitscreen,
             duration: 1000,
             ease: "linear",
             alpha: 1,});
          //https://phaser.discourse.group/t/delay-creation/1254
          this.time.delayedCall(800, () => {this.scene.start('titlescreen')});
       });
    }
    update() {   
    }
 }


 class TitleScreen extends Phaser.Scene {
    constructor() {
       super('titlescreen');
    }
    
    create() {
        //fullscreenbutton
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });
            
        //endfullscreenbutton
       let option1text = this.add.text(130-200, 280,
          "Continue",
          {
             font: "30px Finger Paint",
             color: "#fcfcfc",
             backgroundColor: "#380143",
          }
       );
       option1text.setWordWrapWidth(700);
       option1text.setOrigin(0, 0.5);
       option1text.setAlpha(0);//start off transp
       this.tweens.add({
          targets: option1text,
          x: 130,
          alpha: 1,
          duration: 500,
          delay: 2100+700,
          ease: "Back.out"
       });

    
       let option2text = this.add.text(130-200, 280+80,
          "New Game",
          {
             font: "30px Finger Paint",
             color: "#fcfcfc",
             backgroundColor: "#380143",
          }
       );
       option2text.setOrigin(0, 0.5);
       option2text.setWordWrapWidth(700+700*2);
       option2text.setAlpha(0);//start off transp
       this.tweens.add({
          targets: option2text,
          x: 130,
          alpha: 1,
          duration: 500,
          delay: 2100+700*2,
          ease: "Back.out"
       });

       let option3text = this.add.text(130-200, 280+160,
          "Options",
          {
             font: "30px Finger Paint",
             color: "#fcfcfc",
             backgroundColor: "#380143",
          }
       );
       option3text.setOrigin(0, 0.5);
       option3text.setWordWrapWidth(700);
       option3text.setAlpha(0);//start off transp
       this.tweens.add({
          targets: option3text,
          x: 130,
          alpha: 1,
          duration: 500,
          delay: 2100+700*3,
          ease: "Back.out"
       });

       this.input.on('pointerdown', () => {
          let sfxonclick = this.sound.add("menuclicksound", {loop: false});
          sfxonclick.play();
          this.time.delayedCall(800, () => {this.scene.start('level1')});
       })
    }
 }

 class LevelOne extends Phaser.Scene {
    constructor() {
        super('level1');
     }

     create() {
        const map = this.make.tilemap({ key: 'tilemap1' });
        const tileset = map.addTilesetImage('FroobCatchTileset', 'tileset');
        const platforms = map.createLayer('Platforms', tileset, 0, 200).setScale(3).setOrigin(0.5);
     }



  }