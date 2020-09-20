/**
 * Progress indicator implemented as a group of game objects.
 */

import Phaser from 'phaser';

export class PercentageBar {

    private readonly MARGIN: integer = 2;

    private __group: Phaser.GameObjects.Group;
    private __rect: Phaser.Geom.Rectangle;

    private __value: number;

    private __progressBox!: Phaser.GameObjects.Graphics;
    private __progressBar!: Phaser.GameObjects.Graphics;
    private __percentText!: Phaser.GameObjects.Text;
  
    constructor(scene: Phaser.Scene) {
        this.__group = new Phaser.GameObjects.Group(scene);
        this.__rect = new Phaser.Geom.Rectangle(0, 0, 0, 0);
        this.__value = 0.0;
    }

    public create(x: number, y: number, w: number, h: number) {
        this.__rect.setTo(x, y, w, h);
        this.__progressBox = this.__group.scene.add.graphics();
        this.__progressBar = this.__group.scene.add.graphics();

        // percentage text
        let textConfig = {
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        };
        this.__percentText = this.__group.scene.make.text(textConfig);
        this.__percentText.setOrigin(0.5, 0.5);

        // enable group behavior
        this.__group.addMultiple(
            [    
                this.__progressBox,
                this.__progressBar,
                this.__percentText
            ]
        );
    }

    public destroy() {
        this.__group.destroy(true);
    }

    public setValue(value: number) {
        this.__value = value;
        this.update();
    }

    public setPosition(x: number, y: number) {
        this.__rect.setPosition(x, y);
        this.update();
    }

    public setDisplaySize(w: number, h: number) {
        this.__rect.setSize(w, h);
        this.update();
    }

    update() {
        let rect = this.__rect;
        let value = this.__value;

        this.__progressBox
            .clear()
            .fillStyle(0x222222, 0.8)
            .fillRect(rect.x, rect.y, rect.width, rect.height);
        this.__progressBar
            .clear()
            .fillStyle(0xffffff, 0.5)
            .fillRect(rect.x + this.MARGIN, rect.y + this.MARGIN, (rect.width - (2 * this.MARGIN)) * value, rect.height - (2 * this.MARGIN));

        this.__percentText
            .setPosition(rect.centerX, rect.centerY);
        this.__percentText
            .setText(this.valueToText(value));
    }

    valueToText(value: number): string {
        return (value * 100).toLocaleString('en-us', {minimumFractionDigits: 0}) + '%';
    }
}