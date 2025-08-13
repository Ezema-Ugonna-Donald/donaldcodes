import { Game, Types } from "phaser";

import BootScene from "./(scenes)/BootScene"
import LoadingScene from "./(scenes)/LoadingScene"
import HomeScene from "./(scenes)/HomeScene"
import SinglePlayerScene from "./(scenes)/SinglePlayerScene"
// import MultiPSelectScene from "./scenes/MultiPSelectScene"
import UIScene from "./(scenes)/UIScene"

export default class CustomPhaserManager extends Game {

  constructor(config: Types.Core.GameConfig) {
    super (config)

    if (!config.scene) {
      this.scene.add ("Boot", BootScene)
      this.scene.add ("Load", LoadingScene)
      this.scene.add ("Home", HomeScene)
      this.scene.add ("SinglePlayer", SinglePlayerScene)
      // this.scene.add ("MultiPSelect", MultiPSelectScene)
      this.scene.add ("UI", UIScene);

      this.scene.start ("Boot")
    }

  }



}