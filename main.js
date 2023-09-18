const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1536,
        height: 860,
        zoom: 5,
        pixelArt: true,
    },
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: true
        }
    },
    scene: [Setup, LevelOne, VictoryScreenOne, LevelTwo, VictoryScreenTwo, LevelThree, VictoryScreenThree],
    title: "Physics Game"
})