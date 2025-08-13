import { Scene } from "phaser"
import { gameConfig } from "../game"

// import Config from "../config"

export default class LoadingScene extends Scene
{
    // public config: Phaser.Types.Core.GameConfig

    public loadImg: any

    public barW: any
    public barH: any

    // progress bar background
    public bgBar: any

    public screenW: any
    public screenH: any

    public progressBar: any
    public progressTxt: any

    public valueText: string = ""

    constructor ()
    {
        super ("Load")

        // this.config = new Config ().getConfig ()
    }

    preload ()
    {
        this.loadImg = this.add.image((window.innerWidth / 2) * 0.847, (window.innerHeight / 2) * 0.527, 'load-img')
        this.loadImg.setOrigin ( 0 , 0 )
        this.loadImg.displayWidth = window.innerWidth * 0.15
        this.loadImg.displayHeight = window.innerWidth * 0.15

        this.cameras.main.setBackgroundColor ("#000000")

        this.barW = Number (window.innerWidth) - (Number (window.innerWidth) * 0.43)
        this.barH = window.innerWidth < 768 ? Number (window.innerHeight) - (Number (window.innerHeight) * 0.95) : Number (window.innerHeight) - (Number (window.innerHeight) * 0.92)

        this.bgBar = this.add.graphics ()
        this.bgBar.setPosition (window.innerWidth < 768 ? (window.innerWidth / 5) * 0.847 : (window.innerWidth / 2) * 0.847, window.innerWidth < 768 ? (window.innerHeight / 2.3) * 0.847 : (window.innerHeight / 2) * 1.227)
        this.bgBar.fillStyle (0xF5F5F5, 1)
        this.bgBar.fillRect (0, 0, this.barW, this.barH)

        this.screenW = Number (window.innerWidth)
        this.screenH = Number (window.innerHeight / 2)
        this.cameras.main.setBounds(0, 0, this.screenW, this.screenH);
        this.cameras.main.setZoom(1);

        this.progressBar = this.add.graphics()
        this.progressBar.setPosition (window.innerWidth < 768 ? (window.innerWidth / 5) * 0.847 : (window.innerWidth / 2) * 0.847,  window.innerWidth < 768 ? (window.innerHeight / 2.3) * 0.847 : (window.innerHeight / 2) * 1.227)

        // listen to the "progress" event
        this.load.on('progress', (value: any) =>
        {
            
            this.valueText = String (parseInt ( value ) * 100)

            this.progressBar.clear();
            this.progressBar.fillStyle (0x008700, 1);
            this.progressBar.fillRect (0, 0, value * this.barW, this.barH);

            if (this.valueText == "100")
            {
                this.loadImg.destroy ()
                this.loadImg = this.add.image ((window.innerWidth / 2) * 0.847, (window.innerHeight / 2) * 0.527, "goldPlate")
                this.loadImg.displayWidth = window.innerWidth * 0.15
                this.loadImg.displayHeight = window.innerWidth * 0.15
            }


        }, this)
        
        this.load.image ("bg", "./../assets/hotplates/bg.png")
        this.load.image('cauldron', './../assets/hotplates/JellofPot.png')
        this.load.image('goodFood', './../assets/hotplates/plateORice.png')
        this.load.image('badFood', './../assets/hotplates/badRice.png')
    }

    create ()
    {
        this.scene.start ("Home")
        // this.scene.start ("SinglePlayer")
    }

    update ()
    {
        this.loadImg.displayWidth = window.innerWidth * 0.15
        this.loadImg.displayHeight = window.innerWidth * 0.15

        this.bgBar.setPosition ((window.innerHeight / 2) * 0.847, (window.innerHeight / 2) * 1.227)
        this.progressBar.setPosition ((window.innerHeight / 2) * 0.847, (window.innerHeight / 2) * 1.227)

        this.cameras.resize(window.innerWidth, window.innerHeight);
    }
}