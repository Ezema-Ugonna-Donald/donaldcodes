import { Physics, Scene } from "phaser"

import PlateORice from "./PlateORice"

export default class PlatesORice extends Physics.Arcade.Group 
{
    public scene: Scene

    public goodPlates: any

    constructor (world: any, scene: Scene, children: any)
    {
        super (world, scene, children);
        this.scene = scene;

        // this.createPlates (scene)

        let i = 70
        let j = -100

        while ( i < -10 && j < 570 )
        {
            this.goodPlates = new PlateORice (scene, i * 100, j * 50)

            i++
            j++

            this.add (this.goodPlates)

            console.log ("good food")
        }
    }

    update ()
    {
        this.getPlatePosition (this.goodPlates)
    }

    createPlates (scene: Scene)
    {
        // for (let i = -100; i < -10; i ++)
        // {
            
        // }

        
    }

    getPlatePosition (plate: any)
    {
        if (plate.body.y === this.scene.sys.game.scale.height)
        {
            plate.active = false
            plate.visible = false
            plate.disableBody ()

            // this.scene.events.emit ("Good Food")

            console.log ("vanish")
        }
    }
}