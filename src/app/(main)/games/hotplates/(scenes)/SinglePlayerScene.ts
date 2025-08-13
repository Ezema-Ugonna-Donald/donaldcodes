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

    public nextGoodPlateTimer: any
    public nextBadPlateTimer: any
    public nextGoldenPlateTimer: any

    public isGPlateCreate: boolean

    public cursors: any

    // public activeRoute: string

    constructor ()
    {
        super ("SinglePlayer")

        // this.activeRoute = location.pathname.split ("/") [ 1 ]

        // // https://stackoverflow.com/questions/3528324/how-to-get-the-previous-url-in-javascript
        // window.history.pushState ({ prvUrl: window.location.href }, null, this.activeRoute)

        // console.log (this.activeRoute, "sthisssz")

        this.isGPlateCreate = false;
    }

    create ()
    {

        // D.E.U.S.
        this.input.setDefaultCursor("default");
        this.input.mouse?.disableContextMenu();

        // console.log ("single?")

        // this.cursors = this.input.keyboard.createCursorKeys()
        // this.game.scene.game.physics.setBoundsToWorld()

        this.bg = this.add.image (0, 0, "bg")
        this.bg.setOrigin ( 0, 0 )
        
        this.bg.displayWidth = window.innerWidth
        this.bg.displayHeight = window.innerHeight - 27

        this.cauldron = new Cauldron(this, 0, window.innerHeight - 187)
        this.cauldron.setOrigin(0, 0);
        this.cauldron.setScale(2.5);

        if (this.bg.displayWidth < 768) {
            this.cauldron.y = window.innerHeight - 167;
            this.cauldron.setScale(1.5);
        }

        this.prepGoodFood ()
        this.prepBadFood ()

        this.nextBadPlateTimer = this.time.addEvent ({ delay: 7425, callback: this.prepBadFood, callbackScope: this, loop: true })
        this.nextGoldenPlateTimer = this.time.addEvent ({ delay: 14125, callback: this.prepGoldenFood, callbackScope: this, loop: true });
        
        this.events.emit('SinglePlayerScene');
    }

    update ()
    {
        this.collisions();

        this.cauldron.update(this.input.activePointer);
        this.goodFood.update();
        this.badFood.update();

        if (this.isGPlateCreate)
            this.goldPlate.update();

        if (this.goodFood.isDestroyed || this.goodFood.y >= this.bg.displayHeight)
        {
            this.prepGoodFood();

            this.goodFood.isDestroyed = false
        }

        this.time.addEvent({
            delay: 32500,
            callback:  this.gameOver,
            loop: false,
            callbackScope: this
        });
    }

    prepGoodFood ()
    {
        this.goodFood = new PlateORice (this, Number (Math.random () * (window.innerWidth - 119)) + 70, Number (Math.random () * (-70)) - 170);

        if (this.bg.displayWidth < 768) {
            this.goodFood.setScale(1);
        }
    }

    prepBadFood ()
    {
        this.badFood = new BadPlates (this, Number (Math.random () * (window.innerWidth - 119)) + 5, Number (Math.random () * (-170)) - 300);
    
        if (this.bg.displayWidth < 768) {
            this.badFood.setScale(1);
        }
    }

    prepGoldenFood ()
    {
        this.goldPlate = new GoldenPlate (this, Number (Math.random () * ( window.innerWidth - 219)) + 5, Number (Math.random () * (-170)) - 300);
       
        if (this.bg.displayWidth < 768) {
            this.goldPlate.setScale(1);
        }

        this.physics.add.collider (this.goldPlate, this.cauldron, () => {

            this.goldPlate.served (this.goldPlate)

            this.events.emit('goldPlateCollision');
        });

        this.isGPlateCreate = true
    }

    collisions ()
    {
        this.physics.add.collider (this.goodFood, this.cauldron, () => {
            
            this.goodFood.disappear (this.goodFood);
            
            this.events.emit('goodFoodCollision');
        });

        this.physics.add.collider (this.badFood, this.cauldron, () => {

            this.badFood.disappear (this.badFood);

            this.events.emit('badFoodCollision');
        });
    }

    gameOver() {
        this.events.emit('GameOver');
    }
}