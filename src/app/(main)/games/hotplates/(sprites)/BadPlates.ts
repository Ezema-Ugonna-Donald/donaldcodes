import { Physics, Scene } from "phaser"
// import AIPlayer from "../scenes/AIPlayerScene"

export default class BadPlate extends Physics.Arcade.Sprite
{
    public scene: Scene
    public ui: Scene
    public isDestroyed: boolean

    public score: any

    constructor (scene: Scene, x: any, y: any)
    {
        super (scene, x, y, "badFood")

        this.scene = scene
        this.scene.physics.world.enable (this)
        this.scene.add.existing (this)

        this.isDestroyed = false

        this.ui = this.scene.scene.get ("UI")

        this.score = 0

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
            console.log ()
        }

        if (Math.floor (this.x) === Math.floor(window.innerWidth - this.displayWidth))
        {
            this.setVelocity ( -205.5 , 205.5 )

            console.log("xpos", this.x)
        }
        // this.move()
        // console.log("xpo2s", this.x)
        // console.log ("scene?", this.scene)
    }



    gamePhysics ()
    {
        // Cauldron Physics
        this.scene.physics.world.setBoundsCollision(true, true, false, false);
        this.setCollideWorldBounds (true)
        this.setBounce ( 1 , 1 )
        this.setOrigin ( 0 , 0 )
        this.setScale ( 1.7 )

        this.move()
    }

    move ()
    {
        // this.setGravityY (1)

        
        if (Math.floor (this.x) === 0)
        {
            this.setVelocity ( 205.5 )
        }
        else 
            this.setVelocity ( 205.5 )
            
        // this.setVelocity ( 205.5 )  
    }

    disappear (plate: any)
    {
        plate.active = false
        plate.destroy (true)

        this.isDestroyed = true
    }

    served (plate: any)
    {
        // console.log ("kai")
        this.disappear (plate)
    }
}