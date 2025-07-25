import { Physics, Scene } from "phaser"

export default class GoldenPlate extends Physics.Arcade.Sprite
{
    public scene: Scene
    public ui: Scene

    public isCreated: boolean
    public isDestroyed: boolean

    constructor (scene: Scene, x: any, y: any)
    {
        super (scene, x, y, "goldPlate")

        this.scene = scene
        this.scene.physics.world.enable (this)
        this.scene.add.existing (this)

        this.isCreated = true
        this.isDestroyed = false

        this.ui = this.scene.scene.get ("UI")

        this.gamePhysics ()
    }

    create()
    {
        this.scene.physics.world.setBoundsCollision(true, true, false, false);
        this.setCollideWorldBounds (true)
    }

    update ()
    {  
        if (Math.floor (this.y) === Math.floor (window.innerHeight - this.displayHeight))
        {
            this.disappear (this)
        }

        if (Math.floor (this.x) === Math.floor(window.innerWidth - this.displayWidth))
        {
            this.setVelocity ( -205.5 , 205.5 )
        }
            
        // this.move ()
    }

    gamePhysics ()
    {
        // Cauldron Physics
        this.scene.physics.world.setBoundsCollision(true, true, false, false);
        this.setCollideWorldBounds (true)
        this.setBounce ( 1 , 1 )
        this.setOrigin ( 0 , 0 )
        this.setScale ( 1.7 )

        this.move ()
    }

    move ()
    {
        // this.setGravityY (1)

        if (Math.floor (this.x) === 0)
        {
            this.setVelocity ( 205.5 )
        }
        else this.setVelocity ( 205.5 , 205.5 )  
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
    }
}