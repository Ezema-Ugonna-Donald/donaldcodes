import { Input, Physics, Scene } from "phaser"

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

    update (pointer: Input.Pointer)
    {
        if (pointer.isDown) this.setVelocityX ( 357.5 )
        else this.setVelocityX ( -357.5 )
        // this.setVelocityY(0);
    }

    gamePhysics ()
    {
        // Cauldron Physics
        this.setImmovable(true);
        // this.setGravity(false);
        this.scene.physics.world.setBoundsCollision(true, true, true, true);
        this.setCollideWorldBounds (true)        
    }
}