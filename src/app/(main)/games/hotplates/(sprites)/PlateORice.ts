import { Physics, Scene } from "phaser"

export default class PlateORice extends Physics.Arcade.Sprite
{
    public scene: Scene  
    public ui: Scene

    public isDestroyed: boolean

    constructor (scene: Scene, x: any, y: any)
    {
        super (scene, x, y, "goodFood")

        this.scene = scene
        this.scene.physics.world.enable (this)
        this.scene.add.existing (this)

        this.isDestroyed = false

        this.ui = this.scene.scene.get ("UI")

        this.gamePhysics ()
    }

    update ()
    {  
        if (Math.floor (this.y) === Math.floor (window.innerHeight - this.displayHeight))
        {
            this.disappear (this)
            // this.gameObjectOutOfBound(this)
            // console.log("bottom")
        }

        // this.move ()
    }

    gamePhysics ()
    {
        // Cauldron Physics
        // this.setCollideWorldBounds (true)
        this.setBounce ( 1 , 1 )
        this.setOrigin ( 0 , 0 )
        this.setScale ( 1.7 )

        this.move ()
    }

    move ()
    {
        // this.setGravityY (1)

        if (Math.floor (this.x) === Math.floor(window.innerWidth - this.displayWidth))
        {
            this.setVelocityY ( 205.5 )
        }
        else if (Math.floor (this.x) === 0)
        {
            this.setVelocityY ( 205.5 )
        }
        else 
            this.setVelocityY ( 205.5 )  

        // this.setVelocityY ( 205.5 )
    }

    disappear (plate: any)
    {
        plate.active = false
        plate.destroy (true)

        this.isDestroyed = true
    }

    served (plate: any)
    {
        this.disappear (plate)

        // console.log ("123")
    }

    gameObjectOutOfBound(plate: any)
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