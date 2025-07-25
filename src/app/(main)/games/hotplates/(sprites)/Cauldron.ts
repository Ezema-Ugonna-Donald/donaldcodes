import { Physics, Scene } from "phaser"

export default class Cauldron extends Physics.Arcade.Sprite
{
    public scene: Scene
    public ui: Scene

    constructor (scene: Scene, x: any, y: any)
    {
        super (scene, x, y, "cauldron")

        this.scene = scene
        this.scene.physics.world.enable (this)
        this.scene.add.existing (this)

        this.ui = this.scene.scene.get ("UI")

        this.gamePhysics ()
    }

    update (cursors: any)
    {
        if (cursors) this.setVelocityX ( 357.5 )
        else this.setVelocityX ( -357.5 )
    }

    gamePhysics ()
    {
        // Cauldron Physics
        this.scene.physics.world.setBoundsCollision(true, true, true, true);
        this.setCollideWorldBounds (true)        
    }
}