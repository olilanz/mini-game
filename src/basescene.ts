import "phaser"

export class BaseScene extends Phaser.Scene {
    protected addButton(name: string, image: string, callback: (pointer: Phaser.Input.Pointer) => void, context?: any): Phaser.GameObjects.Sprite {
        let button = this.add.sprite(0, 0, image)
            .setName(name)
            .setInteractive();
        button.on('pointerdown', callback, context);
        return button;
    }
}