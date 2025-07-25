import Phaser from "phaser"
import BootScene from "./(scenes)/BootScene"
import LoadingScene from "./(scenes)/LoadingScene"
import HomeScene from "./(scenes)/HomeScene"
import SinglePlayerScene from "./(scenes)/SinglePlayerScene"

const width: any = "100%"
const height: any = "100%"

export const gameConfig = {
    type: Phaser.AUTO,
    scale: {
        // parent: "hot-plates",
        mode: Phaser.Scale.RESIZE,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        // max: {
        // width: this.width,
        // height: this.height,
        // }
        width: width,
        height: height,
    },
    scene: [
        BootScene,
        LoadingScene,
        HomeScene,
        SinglePlayerScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 0, x: 0 },
        debug: true
        }
    }
}