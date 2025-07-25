import { Game } from "phaser";

// Import scenes for the front end of the software, Bizwax
import BootScene from "./(scenes)/BootScene"
import LoadingScene from "./(scenes)/LoadingScene"
import HomeScene from "./(scenes)/HomeScene"
import SinglePlayerScene from "./(scenes)/SinglePlayerScene"
// import MultiPSelectScene from "./scenes/MultiPSelectScene"
// import UIScene from "./scene/UIScene"

export default class CustomPhaserManager extends Game {

  constructor(bizwaxConfig: Object) {
    super (bizwaxConfig)

    this.scene.add ("Boot", BootScene)
    this.scene.add ("Load", LoadingScene)
    this.scene.add ("Home", HomeScene)
    this.scene.add ("SinglePlayer", SinglePlayerScene)
    // this.scene.add ("MultiPSelect", MultiPSelectScene)
    // this.scene.add ("UI", UIScene)

    this.scene.start ("Boot")

  }



}