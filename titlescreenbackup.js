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
          this.time.delayedCall(2800, () => {this.scene.start('level1')});
       })
    }
 }


















//fullscreen backup just in case too but too lazy to give it its own file

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













