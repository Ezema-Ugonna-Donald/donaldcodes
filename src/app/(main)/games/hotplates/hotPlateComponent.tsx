import { Game, Scale, AUTO, Types } from "phaser";

import CustomPhaserManager from "./customPhaserManager"
import BootScene from "./(scenes)/BootScene"
import LoadingScene from "./(scenes)/LoadingScene"
import HomeScene from "./(scenes)/HomeScene"
import SinglePlayerScene from "./(scenes)/SinglePlayerScene"
import { useEffect, useRef, useState } from "react"
import UIScene from "./(scenes)/UIScene";
// import { gameConfig } from "./game";

let gameInstance: Game | null = null;

export default function HotPlateComponent() {

    const parentEl = useRef<HTMLDivElement>(null);
    const gameRef = useRef<Game | null>(null);

    // let [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        
        if (!parentEl.current) return;
        
        if (!gameInstance) {
            const width: any = parentEl.current.offsetWidth;
            const height: any = parentEl.current.offsetHeight;

            const gameConfig: Types.Core.GameConfig  = {
                type: AUTO,
                parent: parentEl.current,
                width,
                height,
                scale: {
                //     // parent: "hot-plates",
                    
                //     // mode: Scale.RESIZE,
                    mode: Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                //     // max: {
                //     // width: this.width,
                //     // height: this.height,
                //     // }
                },
                scene: [
                    BootScene,
                    LoadingScene,
                    HomeScene,
                    SinglePlayerScene,
                    UIScene,
                ],
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 0, x: 0 },
                        debug: false,
                    }
                }
            };

            gameInstance = new CustomPhaserManager(gameConfig);
        }

        const handleResize = () => {
            if (gameRef.current && parentEl.current) {
                gameRef.current.scale.resize(parentEl.current.offsetWidth, parentEl.current.offsetHeight);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            // window.removeEventListener("resize", handleResize);
            console.log("🐲 DESTROYING GAME INSTANCE 🐲");
            window.removeEventListener("resize", handleResize);
            // gameRef.current?.destroy(true, true);
            // gameRef.current = null;
            // window.myGame = undefined;
        };
      }, []);

    return (
        // <div id="hot-plates"></div>
        <div className="overflow-y-hidden w-screen h-[85vh] min-h-[70vh] touch-none select-none" ref={parentEl} />
    )
}