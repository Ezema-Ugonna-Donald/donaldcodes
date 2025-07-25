// import { Router } from "@angular/router"

// import { HotplatesMultiplayerService } from "../modes/hotplates-multiplayer/hotplates-multiplayer.service"
// import * as hplatesService from "../modes/hotplates-multiplayer/hotplates-multiplayer.service"

import { Scene } from "phaser"

import Cauldron from "../(sprites)/Cauldron"
import PlateORice from "../(sprites)/PlateORice"
import PlatesORice from "../(sprites)/PlatesORice"
import BadPlates from "../(sprites)/BadPlates"
import GoldenPlate from "../(sprites)/GoldenPlate"

export default class SinglePlayerScene extends Scene
{
    public bg: any

    public cauldron: any
    public goodFood: any
    public badFood: any
    public goldPlate: any

    public nextBadPlateTimer: any
    public nextGoldenPlateTimer: any

    public isGPlateCreate: boolean

    public cursors: any

    // public activeRoute: string

    public scoreboard: any
    public scoreboardHR: any
    public scoreboardText: any
    public score: any

    constructor ()
    {
        super ("SinglePlayer")

        // this.activeRoute = location.pathname.split ("/") [ 1 ]

        // // https://stackoverflow.com/questions/3528324/how-to-get-the-previous-url-in-javascript
        // window.history.pushState ({ prvUrl: window.location.href }, null, this.activeRoute)

        // console.log (this.activeRoute, "sthisssz")

        this.isGPlateCreate = false

        this.score = 0
    }

    create ()
    {

        // D.E.U.S.
        this.input.setDefaultCursor ("default")

        // console.log ("single?")

        // this.cursors = this.input.keyboard.createCursorKeys()
        // this.game.scene.game.physics.setBoundsToWorld()

        this.bg = this.add.image (0, 0, "bg")
        this.bg.setOrigin ( 0, 0 )
        
        this.bg.displayWidth = window.innerWidth
        this.bg.displayHeight = window.innerHeight

        this.cauldron = new Cauldron (this, 0, window.innerHeight - 27)
        this.cauldron.setOrigin ( 0 , 0 )
        this.cauldron.setScale ( 2.5 )

        this.prepGoodFood ()
        this.prepBadFood ()

        this.nextBadPlateTimer = this.time.addEvent ({ delay: 7425, callback: this.prepBadFood, callbackScope: this, loop: true })
        this.nextGoldenPlateTimer = this.time.addEvent ({ delay: 14125, callback: this.prepGoldenFood, callbackScope: this, loop: true })

        this.scoreboard = this.add.graphics ()
        this.scoreboard.fillStyle (0xFF0FF8, 1)
        this.scoreboard.fillRect (0, 0, 240, 88)
    
        this.scoreboardText = this.add.text (30, 20, "Score: " + this.score).setStyle ({ 
            fontSize: "4em", 
            fill: "#000000",
            fontFamily: "Calibri",
            fillWidth: "135px",
            padding: {
                top: "1.5rem",
                right: "1.5rem",
                bottom: "1.5rem",
                left: "1.5rem"
            } 
        })
        this.scoreboardText.setOrigin ( 0, 0 )
        this.scoreboardText.depth = 1

        this.scoreboardHR = this.add.graphics ()
        this.scoreboardHR.fillStyle (0xFFFF0F, 0.7)
        this.scoreboardHR.fillRect (30, 50, 180, 5.3)
    }

    update ()
    {
        this.collisions ()

        this.cauldron.update (this.input.activePointer.isDown)
        this.goodFood.update ()
        this.badFood.update ()

        if (this.isGPlateCreate)
            this.goldPlate.update ()

        if (this.goodFood.isDestroyed)
        {
            this.prepGoodFood ()

            this.goodFood.isDestroyed = false
        }
    }

    prepGoodFood ()
    {
        this.goodFood = new PlateORice (this, Number (Math.random () * (window.innerWidth - 119)) + 70, Number (Math.random () * (-70)) - 170)
    }

    prepBadFood ()
    {
        this.badFood = new BadPlates (this, Number (Math.random () * (window.innerWidth - 119)) + 5, Number (Math.random () * (-170)) - 300)
    }

    prepGoldenFood ()
    {
        this.goldPlate = new GoldenPlate (this, Number (Math.random () * ( window.innerWidth - 219)) + 5, Number (Math.random () * (-170)) - 300)
       
        this.physics.add.collider (this.goldPlate, this.cauldron, () => {

            this.goldPlate.served (this.goldPlate)

            this.score += 170

            this.scoreboardText.setText ("Score: " + this.score)
        })
        this.isGPlateCreate = true
    }

    collisions ()
    {
        this.physics.add.collider (this.goodFood, this.cauldron, () => {
            
            this.goodFood.disappear (this.goodFood)
            
            this.score += 150

            this.scoreboardText.setText ("Score: " + this.score)
        })

        this.physics.add.collider (this.badFood, this.cauldron, () => {

            this.badFood.disappear (this.badFood)

            this.score -= 100

            if (this.score < 0)
            {
                this.score = 0
            }

            this.scoreboardText.setText ("Score: " + this.score)
        })

        
    }
}