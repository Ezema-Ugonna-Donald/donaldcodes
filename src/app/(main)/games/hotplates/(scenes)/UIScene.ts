import { Scene } from "phaser";

export default class UIScene extends Scene {

    gameScene: Scene;
    public scoreboard: any;
    public scoreboardHR: any;
    public scoreboardHR2: any;
    public scoreboardText: any;
    public score: number;

    public levelText: any;
    public level: number;

    public textMsg: string;
    public textBtnMsg: string;
    public text: any;
    public textBtn: any;

    public btn: any;

    public scoreToWin: number;
    public graphicFill: number;
    public graphicFillBtn: number;
    
    public gameUI: any;
    
    constructor() {
        super({ key: 'UI', active: true});
        this.gameScene = new Scene();

        this.score = 0;
        this.scoreToWin = 5500;
        this.textMsg = '';
        this.textBtnMsg = '';
        this.graphicFill = 0;
        this.graphicFillBtn = 0;
        this.level = 1;
    }

    init() {
        this.scoreToWin = 5500;
        this.level = 1;
    }

    create() {
        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;

        this.gameScene = this.scene.get('SinglePlayer');

        this.gameScene.events.on('SinglePlayerScene', () => {
            this.scoreboard = this.add.graphics();
            this.scoreboard.fillStyle (0xFF0FF8, 1)
            this.scoreboard.fillRect (0, 0, 260, 126)
        
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
            });
            this.scoreboardText.setOrigin( 0, 0 );
            this.scoreboardText.depth = 1;

            this.levelText = this.add.text(30, 64, `Level: ${this.level}`).setStyle ({ 
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
            });
            this.levelText.setOrigin( 0, 0 );
            this.levelText.depth = 1;

            this.scoreboardHR = this.add.graphics();
            this.scoreboardHR.fillStyle(0xFFFF0F, 0.7);
            this.scoreboardHR.fillRect(30, 50, 180, 5.3);

            this.scoreboardHR = this.add.graphics();
            this.scoreboardHR.fillStyle(0xFFFF0F, 0.7);
            this.scoreboardHR.fillRect(30, 94, 180, 5.3);

            this.gameUI = this.add.graphics();

            this.text = this.add.text(Number(gameW)/2, Number(gameH)/2, this.textMsg).setStyle({
                font: '5em Calibri',
                fill: '#ffffff'
            });
            this.text.setOrigin(0.5, 0.5);
            this.text.depth = 1;

            this.textBtn = this.add.text(Number(gameW)/2, Number(gameH)/1.5, this.textBtnMsg).setStyle({
                font: '3em Calibri',
                fill: '#ffffff'
            }).setInteractive();

            this.textBtn.setOrigin(0.5, 0.5);
            this.textBtn.depth = 1;

            this.btn = this.add.graphics();
        });

        this.gameScene.events.on('goldPlateCollision', () => {
            this.score += 750;

            this.scoreboardText.setText("Score: " + this.score);
        });

        this.gameScene.events.on('goodFoodCollision', () => {
            this.score += 500

            this.scoreboardText.setText("Score: " + this.score);
        });

        this.gameScene.events.on('badFoodCollision', () => {
            this.score -= 450;

            if (this.score <= 0)
            {
                this.score = 0;
            }

            this.scoreboardText.setText("Score: " + this.score);
        });

        this.gameScene.events.on('GameOver', () => {
            if (this.score >= this.scoreToWin && this.score % this.scoreToWin >= 0) {
                this.gameScene.scene.pause();

                this.textMsg = 'Great Job, You Win!!';
                this.text.setText(this.textMsg);

                this.textBtnMsg = 'Next Level';
                this.textBtn.setText(this.textBtnMsg);

                this.graphicFill = 0.7;
                this.graphicFillBtn = 1;

                this.gameUI.fillStyle(0x000000, this.graphicFill);
                this.gameUI.fillRect(Number(gameW)/2 - this.text.width/2 - 10, Number(gameH)/2 - this.text.height/2 - 10, this.text.width + 20, this.text.height + 140);

                this.btn.fillStyle(0x4FC162, this.graphicFillBtn);
                this.btn.fillRect(Number(gameW)/2 - this.textBtn.width/2 - 10, Number(gameH)/1.5 - this.textBtn.height/2 - 10, this.textBtn.width + 20, this.textBtn.height + 20);

                this.textBtn.on('pointerdown', () => {
                this.textMsg = '';
                this.textBtnMsg = '';
                this.text.destroy();
                this.textBtn.destroy();
                this.gameUI.destroy();
                this.btn.destroy();
                this.scoreboardText.destroy();
                this.levelText.destroy();
                this.level++;
                this.scoreToWin += this.scoreToWin;
                this.gameScene.scene.restart();
                });
            }
            else if (this.score < this.scoreToWin) {
                this.gameScene.scene.pause();

                this.textMsg = 'No vex, you lose!!';
                this.text.setText(this.textMsg);
                // text.setVisible(true);

                this.textBtnMsg = 'Restart';
                this.textBtn.setText(this.textBtnMsg);
                // textBtn.setVisible(true);

                this.graphicFill = 0.7;
                this.graphicFillBtn = 1;

                this.gameUI.fillStyle(0x000000, this.graphicFill);
                this.gameUI.fillRect(Number(gameW)/2 - this.text.width/2 - 10, Number(gameH)/2 - this.text.height/2 - 10, this.text.width + 20, this.text.height + 140);
                // gameUI.setVisible(true);

                this.btn.fillStyle(0xFCBD4A, this.graphicFillBtn);
                this.btn.fillRect(Number(gameW)/2 - this.textBtn.width/2 - 10, Number(gameH)/1.5 - this.textBtn.height/2 - 10, this.textBtn.width + 20, this.textBtn.height + 20);
                // btn.setVisible(true);

                // Restart Game
                this.textBtn.on('pointerdown', () => {
                this.score = 0;
                this.textMsg = '';
                this.textBtnMsg = '';
                this.text.destroy();
                this.textBtn.destroy();
                this.gameUI.destroy();
                this.btn.destroy();
                this.scoreboardText.destroy();
                this.levelText.destroy();
                this.gameScene.scene.restart();
                });
            }
        });
    }
}