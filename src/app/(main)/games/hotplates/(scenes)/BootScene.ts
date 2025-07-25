import { Scene } from "phaser"
import loadImg from "assets/logo/donaldcodesLogo.jpg"

export default class BootScene extends Scene
{
    constructor ()
    {
        super ("Boot")
    }

    // Declare Variables
    init ()
    {

    }

    // Load assets
    preload ()
    {
        this.load.image ("load-img", "./../assets/logo/donaldcodesLogo.jpg")
        this.load.image ("goldPlate", "./../assets/hotplates/goldenPlate.png")
    }

    // Called right after the "preload" function
    create ()
    {
        this.scene.start ("Load")
    }

    update()
    {

    }
}