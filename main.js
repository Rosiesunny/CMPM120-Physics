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
            enableSleeping: true
        }
    },
    scene: [Setup, LevelOne],
    title: "Physics Game"
})