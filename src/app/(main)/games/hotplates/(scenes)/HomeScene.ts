import { Scene } from "phaser"

export default class HomeScene extends Scene
{
    public title: any

    public menuContainer: any

    public menuHR000: any
    public menuHR001: any

    public menuSelect000: any
    public menuSelect001: any
    public menuSelect002: any
    public menuSelect003: any

    private activeRoute: any

    constructor ()
    {
        super ("Home")

        // this.activeRoute = location.pathname.split ("/") [ 1 ]

        // // https://stackoverflow.com/questions/3528324/how-to-get-the-previous-url-in-javascript
        // window.history.pushState ({ prvUrl: window.location.href }, null, this.activeRoute)

    }

    preload ()
    {
        this.cameras.main.setBackgroundColor ("#000000")
    }

    create ()
    {
        // this.game.events.on ("postupdate", (time, el) => {
            // console.log (window.history.state.prvUrl, "is undefined?")
        // })

        // D.E.U.S.
        this.input.setDefaultCursor ("url(/assets/hotplates/cursor/plateORice.cur), pointer")

        this.title = this.add.text ((window.innerWidth / 2) * 0.347, (window.innerHeight / 2) * 0.227, "Hot Plates").setStyle ({
            fontSize: "6em",
            fill: "#fff",
            fontFamily: "Calibri",
            strokeThickness: "3"
        })
        this.title.setOrigin ( 0, 0 )

        this.menuContainer = this.add.graphics ()
        this.menuContainer.fillStyle (0x000000, 0.7)
        this.menuContainer.fillRect ((window.innerWidth / 2) * 0.357, (window.innerHeight / 2) * 0.527, (window.innerWidth / 2) * 1.261, (window.innerHeight / 2) * 1.101)

        this.menuSelect000 = this.add.text ((window.innerWidth / 2) * 0.467, (window.innerHeight / 2) * 0.597, "Single Player").setStyle ({
            fontSize: "5em",
            fill: "#ffff0f",
            fontFamily: "Calibri",
            padding: {
                top: "1.5rem",
                right: "1.5rem",
                bottom: "1.5rem",
                left: "1.5rem"
            }
        }).setInteractive ({ cursor: "url(/assets/hotplates/cursor/goldenPlate.cur), pointer" })
        this.menuSelect000.setOrigin ( 0, 0 )
        this.menuSelect000.depth = 1

        this.menuSelect000.on ("pointerdown", (e: any) => {
            // this.sys.game.destroy (true)
            // console.log("homesceneclicker")
            // document.getElementById("single-select").click ()
            this.scene.start ("SinglePlayer")
        })

        this.menuHR000 = this.add.graphics ()
        this.menuHR000.fillStyle (0xFF0FF8, 1)
        this.menuHR000.fillRect ((window.innerWidth / 2) * 0.417, (window.innerHeight / 2) * 0.792, (window.innerWidth / 2) * 1.134, (window.innerHeight / 2) * 0.015)

        // this.menuSelect001 = this.add.text ((window.innerWidth / 2) * 0.467, (window.innerHeight / 2) * 0.867, "Multi Player").setStyle ({
        //     fontSize: "5em",
        //     fill: "#ffff0f",
        //     fontFamily: "Calibri",
        //     padding: {
        //         top: "1.5rem",
        //         right: "1.5rem",
        //         bottom: "1.5rem",
        //         left: "1.5rem"
        //     }
        // }).setInteractive ({ cursor: 'url(/assets/hotplates/cursor/goldenPlate.cur), pointer' })
        // this.menuSelect001.setOrigin ( 0, 0 )
        // this.menuSelect001.depth = 1

        // this.menuSelect001.on ("pointerdown", (e) => {
        //     this.scene.start ("MultiPSelect")
        // })

        this.menuHR001 = this.add.graphics ()
        this.menuHR001.fillStyle (0xFF0FF8, 1)
        this.menuHR001.fillRect ((window.innerWidth / 2) * 0.417, (window.innerHeight / 2) * 1.062, (window.innerWidth / 2) * 1.134, (window.innerHeight / 2) * 0.015)

        this.menuSelect002 = this.add.text ((window.innerWidth / 2) * 0.467, (window.innerHeight / 2) * 1.137, "Instructions").setStyle ({
            fontSize: "5em",
            fill: "#ffff0f",
            fontFamily: "Calibri",
            padding: {
                top: "1.5rem",
                right: "1.5rem",
                bottom: "1.5rem",
                left: "1.5rem"
            }
        }).setInteractive ({ cursor: 'url(/assets/hotplates/cursor/goldenPlate.cur), pointer' })
        this.menuSelect002.setOrigin ( 0, 0 )
        this.menuSelect002.depth = 1

        this.menuHR001 = this.add.graphics ()
        this.menuHR001.fillStyle (0xFF0FF8, 1)
        this.menuHR001.fillRect ((window.innerWidth / 2) * 0.417, (window.innerHeight / 2) * 1.342, (window.innerWidth / 2) * 1.134, (window.innerHeight / 2) * 0.015)

        // this.menuSelect003 = this.add.text ((window.innerWidth / 2) * 0.467, (window.innerHeight / 2) * 1.407, "<= Go Back").setStyle ({
        //     fontSize: "5em",
        //     fill: "#ffff0f",
        //     fontFamily: "Calibri",
        //     padding: {
        //         top: "1.5rem",
        //         right: "1.5rem",
        //         bottom: "1.5rem",
        //         left: "1.5rem"
        //     }
        // }).setInteractive ({ cursor: 'url(/assets/hotplates/cursor/goldenPlate.cur), pointer' })
        // this.menuSelect003.setOrigin ( 0, 0 )
        // this.menuSelect003.depth = 1
    }

    update ()
    {
        // console.log (window.history.state.prvUrl, "is undefined?")
        // this.events.once ("postupdate", () => {
            // const historyUrl = history.state.prvUrl
            // setTimeout (() => {
            //     // console.log (historyUrl, "is undefined??")
            //     if ((historyUrl.search (this.activeRoute)) === -1 || this.activeRoute !== "games-section")
            //     {
            //         console.log ("is unkkkkkkkkkkkkdefined??")
            //         this.sys.game.destroy (true)

            //     }
            // }, 1000)
        // })
    }

    // postupdate ()
    // {
    //     console.log (window.history.state.prvUrl, "is undefined?")
    //     // if ((window.history.state.prvUrl !== undefined && window.history.state.prvUrl.search (this.activeRoute)) === -1 || this.activeRoute !== "games-section")
    //     // {
    //     //     this.sys.game.destroy (true)
    //     // }
    // }
}
