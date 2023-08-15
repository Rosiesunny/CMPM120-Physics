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
 
       let rosiesunnylogoimg = this.add.image(164, -526, "rosiesunnylogo");
       rosiesunnylogoimg.setAlpha(0);//start off transp
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
          this.time.delayedCall(800, () => {this.scene.start('titlescreen')});
       });
    }
    update() {   
    }
 }