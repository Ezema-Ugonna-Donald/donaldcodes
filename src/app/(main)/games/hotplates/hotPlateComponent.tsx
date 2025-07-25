import { Game, Scale, AUTO } from "phaser";

import CustomPhaserManager from "./customPhaserManager"
import BootScene from "./(scenes)/BootScene"
import LoadingScene from "./(scenes)/LoadingScene"
import HomeScene from "./(scenes)/HomeScene"
import SinglePlayerScene from "./(scenes)/SinglePlayerScene"
import { useEffect, useRef, useState } from "react"
// import { gameConfig } from "./game";

export default function HotPlateComponent() {

    const parentEl = useRef<HTMLDivElement>(null);
    const width: any = "80%"
    const height: any = "80%"

    const gameConfig = {
        type: AUTO,
        scale: {
            // parent: "hot-plates",
            // mode: Scale.RESIZE,
            // autoCenter: Phaser.Scale.CENTER_BOTH,
            // max: {
            // width: this.width,
            // height: this.height,
            // }
            width: width,
            height: height,
        },
        // scene: [
        //     BootScene,
        //     LoadingScene,
        //     HomeScene,
        //     SinglePlayerScene
        // ],
        physics: {
            default: 'arcade',
            arcade: {
            gravity: { y: 0, x: 0 },
            debug: true
            }
        }
    }

    let [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        if (!parentEl.current) return;
    
        // const newGame = new Game({ ...gameConfig, parent: parentEl.current, width: parentEl.current.offsetWidth, height: parentEl.current.offsetHeight });
        const newGame = new CustomPhaserManager({ ...gameConfig, parent: parentEl.current, width: parentEl.current.offsetWidth, height: parentEl.current.offsetHeight });
        
        setGame(newGame);
  
        return () => {
        //   newGame?.destroy(true, true);
          console.log("🐲 DESTROY 🐲");
        };
      }, []);

    

    // const gameSce = new CustomPhaserManager()

    return (
        // <div id="hot-plates"></div>
        <div ref={parentEl} />
    )
}