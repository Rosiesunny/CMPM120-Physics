const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
        zoom: 5,
        pixelArt: true,
    },
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            enableSleeping: true
        }
    },
    scene: [Setup, Splash, TitleScreen, LevelOne],
    title: "Physics Game"
})