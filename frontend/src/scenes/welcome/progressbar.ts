import "phaser";

export class ProgressBar extends Phaser.GameObjects.Group {
    private __progressBox!: Phaser.GameObjects.Graphics;
    private __progressBar!: Phaser.GameObjects.Graphics;
    private __loadingText!: Phaser.GameObjects.Text;
    private __percentText!: Phaser.GameObjects.Text;
  
    constructor(scene: Phaser.Scene) {
        super(scene);

        this.initProgressBar();
    }

    initProgressBar() {
        // progress bar
        this.__progressBox = this.scene.add.graphics();
        this.__progressBox.fillStyle(0x222222, 0.8);
        this.__progressBox.fillRect(100, 100, 320, 50);

        this.__progressBar = this.scene.add.graphics();
        this.__progressBar.fillStyle(0xffffff, 0.5);
        this.__progressBar.fillRect(105, 105, 320, 50);

        // loading text
        let width = this.scene.cameras.main.width;
        let height = this.scene.cameras.main.height;
        this.__loadingText = this.scene.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
        });
        this.__loadingText.setOrigin(0.5, 0.5);

        // percentage text
        this.__percentText = this.scene.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
        });
        this.__percentText.setOrigin(0.5, 0.5);

        // enable group behavior
        this.addMultiple(
            [    
                this.__progressBox,
                this.__progressBar,
                this.__loadingText,
                this.__percentText
            ]
        );
    }

    public setProgress(value: number) {
        this.__progressBar.clear();
        this.__progressBar.fillStyle(0xffffff, 0.5);
        this.__progressBar.fillRect(105, 105, 300 * value, 30);
    
        this.__percentText.setText(value * 100 + '%');
      }
}